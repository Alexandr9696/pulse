import './favicon.ico';
import '@fortawesome/fontawesome-free/js/all'
import './styles/scss.scss';
// import './bootstrap/bootstrap';
import './modules/jquery.validate.min'
import './modules/jquery.maskedinput.min'
import './modules/slick.min';
import './modules/slider';
import './modules/catalog';
import './modules/modal/modal_index';
import './modules/validate';



$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});



