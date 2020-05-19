import AOS from "aos";

AOS.init();


// AOS.init({
//     // Глобальные настройки:
//     disable: false, // принимает следующие значения: 'phone', 'tablet', 'mobile', boolean, expression or function
//     startEvent: 'DOMContentLoaded', // имя события, отправляемого в документе, когда должен инициализироваться AOS
//     initClassName: 'aos-init', // класс применяется после инициализации
//     animatedClassName: 'aos-animate', // класс применяется к анимации
//     useClassNames: false, // если true, добавит содержимое `data-aos` как классы при прокрутке
//     disableMutationObserver: false, // отключает автоматическое обнаружение мутаций (дополнительно)
//     debounceDelay: 50, // задержка на debounce, используемая при изменении размера окна (дополнительно)
//     throttleDelay: 99, // задержка газа, используемая при прокрутке страницы (дополнительно)
//
//
//     // Настройки, которые могут быть переопределены для каждого элемента с помощью атрибутов `data-aos- *`:
//     offset: 120, // смещение (в пикселях) от исходной точки запуска
//     delay: 0, // задержка (значения от 0 до 3000 с шагом 50 мс)
//     duration: 400, // длительность (значения от 0 до 3000 с шагом 50 мс)
//     easing: 'ease', // ослабление по умолчанию для анимации AOS
//     once: false, // должна ли анимация происходить только один раз - при прокрутке вниз
//     mirror: false, // должны ли элементы анимироваться при прокрутке мимо них
//     anchorPlacement: 'top-bottom', // определяет, какая позиция элемента относительно окна должна вызывать анимацию
// });



////////======ПРИМЕР======\\\\\\\\

// <div data-aos="fade-up"
//      data-aos-offset="200"
//      data-aos-delay="50"
//      data-aos-duration="1000"
//      data-aos-easing="ease-in-out"
//      data-aos-mirror="true"
//      data-aos-once="false"
//      data-aos-anchor-placement="top-center">
// </div>

// Полный список
//     Animations:
//             Fade animations:
//                 fade
//                 fade-up
//                 fade-down
//                 fade-left
//                 fade-right
//                 fade-up-right
//                 fade-up-left
//                 fade-down-right
//                 fade-down-left
//             Flip animations:
//                 flip-up
//                 flip-down
//                 flip-left
//                 flip-right
//             Slide animations:
//                 slide-up
//                 slide-down
//                 slide-left
//                 slide-right
//             Zoom animations:
//                 zoom-in
//                 zoom-in-up
//                 zoom-in-down
//                 zoom-in-left
//                 zoom-in-right
//                 zoom-out
//                 zoom-out-up
//                 zoom-out-down
//                 zoom-out-left
//                 zoom-out-right
//     Anchor placements:
//             top-bottom
//             top-center
//             top-top
//             center-bottom
//             center-center
//             center-top
//             bottom-bottom
//             bottom-center
//             bottom-top
//     Easing functions:
//             linear
//             ease
//             ease-in
//             ease-out
//             ease-in-out
//             ease-in-back
//             ease-out-back
//             ease-in-out-back
//             ease-in-sine
//             ease-out-sine
//             ease-in-out-sine
//             ease-in-quad
//             ease-out-quad
//             ease-in-out-quad
//             ease-in-cubic
//             ease-out-cubic
//             ease-in-out-cubic
//             ease-in-quart
//             ease-out-quart
//             ease-in-out-quart
