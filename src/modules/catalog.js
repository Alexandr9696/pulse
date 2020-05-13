$(document).ready(function () {
    // для переключения табов
    $('.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container_flex').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // для преключения контента на карточках
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        })
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
});

// // убираем margin у каждого третьего элемента
// function noneMargin() {
//     const items = document.querySelectorAll('.catalog__content_active>.catalog-item');
//
//     for (let i=0; i<items.length; i++) {
//         if ((i+1) % 3 === 0) {
//             items[i].style.marginRight = '0'
//         }
//     }
// }
// noneMargin();