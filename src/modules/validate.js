$(document).ready(function () {
    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                name: {
                    required: "Пожалуйста введите свое имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа")
                },
                phone: "Пожалуйста введите номер телефона",
                email: {
                    required: "Пожалуйста введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');


    $('input[name=phone]').mask("+7 (999) 999-99-99")
});