import './base';
import './plugins/modal';
import './plugins/confirm';


// ========== СОЗДАЕМ МОДАЛЬНОЕ ОКНО С ОПРЕДЕЛЕННЫМИ ПАРАМЕТРАМИ ======== \\
const consultationModal = $.modal({
    closable: true,
    width: '400px',
    // footerButtons: [
    //     {
    //         text: 'Заказать консультацию', type: 'primary', handler() {
    //             modal.close()
    //         }
    //     },
    // ]
});

const orderModal = $.modal({
    closable: true,
    width: '400px',
    // footerButtons: [
    //     {
    //         text: 'Заказать консультацию', type: 'primary', handler() {
    //             modal.close()
    //         }
    //     },
    // ]
});

// добавляем слушателя для всей страницы
document.addEventListener('click', event => {
    // event.preventDefault();
    // заносим в переменную [data-btn] (если есть)
    const btnType = event.target.dataset.btn;
    // если [data-btn]= price
    if (btnType === 'price') {
        event.preventDefault();
        // добавляем контент в модальное окно
        consultationModal.setContent(`
        <div class="modal__subtitle">Просто заполните форму заявки</div>
        <div class="modal__descr">и мы перезвоним вам в течении 10 минут</div>
        <form class="feed-form feed-form_mt25" action="#">
            <input name="name" placeholder="Ваше имя" type="text">
            <input name="phone" placeholder="Ваш телефон">
            <input name="email" placeholder="Ваш E-mail" type="email">

            <button class="button button__submit">Заказать консультацию</button>
        </form>
        `);
        // открывем модальное окно
        consultationModal.open();
    } else if (btnType === 'order') {
        event.preventDefault();
        const wrap = event.target.closest('.catalog-item');
        const subtitle = wrap.querySelector('.catalog-item__subtitle').textContent;
        orderModal.setContent(`
        <div class="modal__subtitle">Ваш заказ:</div>
        <div class="modal__descr">${subtitle}</div>
        <form class="feed-form feed-form_mt25" action="#">
            <input name="name" placeholder="Ваше имя" type="text">
            <input name="phone" placeholder="Ваш телефон">
            <input name="email" placeholder="Ваш E-mail" type="email">

            <button class="button button__submit">Купить</button>
        </form>
        `);
        orderModal.open();
    }
});
