$(document).ready(function(){
    $('.slider__inner').slick({
        arrows: true, // стрелки
        dots: false, // точки
        speed: 300,
        adaptiveHeight: false, // адаптация высоты в зависимости от высоты картинки (обязательное свойство в стилях - .slick-track { align-items: flex-start; } )
        slidesToShow: 1, // сколько слайдов показывается
        slidesToScroll: 1, // сколько слайдов перелистывается за раз
        easing: 'linear', // стиль анимации
        infinite: true, // бесконечность слайдера
        initialSlide: 0, // с какого слайда начинается
        autoplay: false, // автопереключение
        autoplaySpeed: 3000, // скорость переключения
        pauseOnFocus: true, // пауза автопереключения при фокусе
        pauseOnHover: true, // пауза автопереключения при наведение
        pauseOnDotsHover: true, // пауза автопереключения при наведении на точки
        draggable: true, // перетягивание слайдов мышкой (swipe) на компьютере (поумолчанию включено)
        swipe: true, // swipe на мобильном устройстве
        touchThreshold: 5, // сколько нужно просвайпить чтобы слайд переключился
        waitForAnimate: true, // следующий клик на кнопку переключения будет срабатывать когда закончится анимация
        vertical: false, // включение вертикального слайдера
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true,
                    infinity: true
                }
            },
        ]
    });
});