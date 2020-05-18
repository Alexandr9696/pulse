document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', function() {
        if (pageYOffset > 1000) {
            document.querySelector('.pageup').classList.remove('animate__slideOutRight');
            document.querySelector('.pageup').classList.add('show', 'animate__slideInRight')
        } else {
            document.querySelector('.pageup').classList.remove('animate__slideInRight');
            document.querySelector('.pageup').classList.add('animate__slideOutRight');
            setTimeout(() => {
                document.querySelector('.pageup').classList.remove('show')
            }, 100);
        }
    });


    const links = document.querySelectorAll("a[href^='#']");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (event) {
            event.preventDefault();
            //получаем href у ссылки и отрезаем первый элемент то есть решетку #
            const blockID = links[i].getAttribute("href").substr(1);

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }
});