// ===== создаем новое модальное окно
$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            // метод удаление модального окна
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {
                    text: 'Отменить', type: 'secondary', handler() {
                        modal.close();
                        reject()
                    }
                },
                {
                    text: 'Удалить', type: 'danger', handler() {
                        modal.close();
                        resolve()
                    }
                }
            ]
        });

        // вызывает метод open через 200 мс (для работы анимации)
        setTimeout(() => {
            modal.open()
        }, 200)
    })
};