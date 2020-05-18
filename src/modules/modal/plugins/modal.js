// создаем в прототипах дополнительный метод - это будет функция которая будет принимать в себя какой то элемент
// (т.е. у определенной "ноды" мы будет вызывать этот метод и говорить после какого элемента нам надо это вставить
Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
};
// пустая функция
function noop() {}

// ======== ФУНКЦИЯ СОЗДАНИЯ ФУТТЕР В МОДАЛЬНОЕ ОКНО ======== \\
// поумолчанию передем пустой массив
function _createModalFooter(buttons = []) {
    // если массив пустой то возвращаем пустой div
    if (buttons.length === 0) {
        return document.createElement('div');
    }
    // создаем корневой div с классом modal-footer
    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');
    // пробегаем по переданному массиву кнопок
    buttons.forEach(btn => {
        // создаем элемент button
        const $btn = document.createElement('button');
        // у этой кнопки textContent берется из переданного значения
        $btn.textContent = btn.text;
        // добавление классов
        $btn.classList.add('btn');
        // добавление определенного класса из bootstrap
        $btn.classList.add(`btn-${btn.type || 'secondary'}`);
        // добавление обработчика событий (если не передал handler то пустая функция
        $btn.onclick = btn.handler || noop;
        // помещаем кнопку в футтер
        wrap.appendChild($btn)
    });
    return wrap
}

// ======= ФУНКЦИЯ СОЗДАНИЯ СТРУКТУРЫ МОДАЛЬНОГО ОКНА ======= \\
function _createModal(options) {
    // создаем обертку
    const modal = document.createElement('div');
    // присваиваем класс обертке
    modal.classList.add('modal');
    // помещаем вовнутрь обертки (afterbegin - сразу после открытия обертки) html верстку
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay hide animate__animated" data-close="true">
<!--    берем значение из options (если в options значение width не опрделено то вставляем значение DEFAULT_WIDTH   -->
        <div class="modal-window hide animate__animated">
            <div class="modal-header">
<!--    берем значение из options (если в options значение title не опрделено то вставляем значение "Окно"          -->
                <span class="modal-title">${options.title || ''}</span>
<!--    если значение closable true то добавляем крестик для закрытия окна, если false - пусто            -->
                ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="modal-body" data-content>
                ${options.content || ''}
            </div>
        </div>
    </div>
`);
    // создаем футтер и передаем в функцию массив из кнопок
    const footer = _createModalFooter(options.footerButtons);
    // помещаем футтер после modal-body( [data-content] )
    footer.appendAfter(modal.querySelector('[data-content]'));
    // добавляем модальное окно в body
    document.body.appendChild(modal);
    // возвращаем модальное окно
    return modal
}



$.modal = function (options) {
    // скорость анимации при закрытии модального окна
    const ANIMATION_SPEED = 500;
    // создаем модальное окно и помещаем в переменную
    const $modal = _createModal(options);
    // переменная - когда модальное окно открыто - closing = true (для того чтобы нельзя было открыть окно заново пока онимация закрытия не завершилась)
    let closing = false;
    // перменная = если мы уничтожаем окно то тогда destroyed = true
    let destroyed = false;

    const addClass = (selector, arrayClass) => {
        arrayClass.forEach(className => {
            $modal.querySelector(selector).classList.add(className)
        });
    };

    const removeClass = (selector, arrayClass) => {
        arrayClass.forEach(className => {
            $modal.querySelector(selector).classList.remove(className)
        });
    };

    // добавляем объект с методами для модального окна
    const modal = {
        // метод (функция) открытия модального окна
        open() {

            // если окно удалено
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            // если если (неclosing) - true, тогда добавляется класс
            if (!closing) {
                removeClass('.modal-overlay', ['hide']);
                addClass('.modal-overlay', ['animate__fadeIn']);
                removeClass('.modal-window', ['hide']);
                addClass('.modal-window', ['animate__backInDown']);
            }
        },
        // метод (функция) закрытия модального окна
        close() {
            closing = true;
            // удаляем класс активности
            removeClass('.modal-overlay', ['animate__fadeIn']);
            removeClass('.modal-window', ['animate__backInDown']);
            addClass('.modal-overlay', ['animate__fadeOut']);
            addClass('.modal-window', ['animate__backOutDown']);
            setTimeout(() => {
                addClass('.modal-overlay', ['hide']);
                addClass('.modal-window', ['hide']);
                removeClass('.modal-overlay', ['animate__fadeOut']);
                removeClass('.modal-window', ['animate__backOutDown']);
                closing = false;
                // =================== если метод onClose присутствует и является функцией тогда вызывет его
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
            }, ANIMATION_SPEED)
        },
    };
    // listener при клике по модальному окну и его обертке
    const listener = event => {
        // если параметр [data-close] - true
        if (event.target.dataset.close) {
            modal.close()
        }
    };
    // добавляем прослушку модальному окну (c оберткой)
    $modal.addEventListener('click', listener);
// Метод Object.assign() используется для копирования значений всех собственных перечисляемых свойств из одного или более
// исходных объектов в целевой объект. После копирования он возвращает целевой объект.
// modal - Целевой объект. source - Исходные объекты.
// Возвращается получившийся целевой объект.
    return Object.assign(modal, {
        // удаление модального окна
        destroy() {
            // удаление "ноды" из DOM дерева
            $modal.parentNode.removeChild($modal);
            // удаляем прослушку событий с модального окна
            $modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    })
};