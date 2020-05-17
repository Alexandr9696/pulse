// $(document).ready(function () {
//     $('[data-modal=consultation]').on('click', function () {
//         $('.overlay, #consultation').fadeIn('slow');
//     });
//     $('.modal__close').on('click', function () {
//         $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
//     });
//
//     $('.button_mini').each(function (i) {
//         $(this).on('click', function () {
//             $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
//             $('.overlay, #order').fadeIn('slow');
//         })
//     })
// });


let modalCons = document.querySelector('#consultation');
let open_modal = document.querySelectorAll('[data-modal="consultation"]');
let overlay = document.querySelector('.overlay');
let modal__close = document.querySelectorAll('.modal__close');
let body = document.querySelector('body');


open_modal.forEach(btn => {
    btn.addEventListener('click', function () {
        modalCons.classList.remove('animate__fadeOutUp');
        overlay.classList.remove('animate__fadeOut');
        modalCons.style.display = 'block';
        overlay.classList.add('overlay_show');
        body.classList.add('block')
    })
});

modal__close.forEach(btn => {
    btn.addEventListener('click', function () {
        modalCons.classList.add('animate__fadeOutUp');
        overlay.classList.add('animate__fadeOut')
        setTimeout(() => {
            modalCons.style.display = 'none';
            overlay.classList.remove('overlay_show')
            body.classList.remove('block')
        }, 500)

    })
});


// let close_modal = document.getElementById('close_modal');
// let modal = document.getElementById('modal');
// let body = document.getElementsByTagName('body')[0];
// open_modal.onclick = function() { // клик на открытие
//     modal.classList.add('modal_vis'); // добавляем видимость окна
//     modal.classList.remove('animate__backOutDown'); // удаляем эффект закрытия
//     body.classList.add('body_block'); // убираем прокрутку
// };
// close_modal.onclick = function() { // клик на закрытие
//     modal.classList.add('animate__backOutDown'); // добавляем эффект закрытия
//     window.setTimeout(function() { // удаляем окно через полсекунды (чтобы увидеть эффект закрытия).
//         modal.classList.remove('modal_vis');
//         body.classList.remove('body_block'); // возвращаем прокрутку
//     }, 500);
// };

