$(document).ready(function () {
    $(window).scroll(function () {
        var height = $(window).scrollTop();

        if (height > 50) {
            $('.js-header').addClass('is-scroll');
        } else {
            $('.js-header').removeClass('is-scroll');
        }
    });
    $('.header__nav-link').bind('click', function (e) {
        $('.nav-bar').removeClass('toggle');
        $('.header__line').removeClass('toggle');
    });
    $('.js-slider').on('init.slick', function () {
        $(this).removeClass('is-fix-height');
    }).slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear'
    });
    $('#scroll').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    $('.popup-btn').click(function () {
        $('.popup').addClass('open');
    });
    $('.js-close').click(function () {
        $('.popup').removeClass('open');
    });
});
var toggleButton = document.querySelector('.header__toggle-menu');
var toggleLine1 = document.querySelector('.line1');
var toggleLine2 = document.querySelector('.line2');
var toggleLine3 = document.querySelector('.line3');
var navBar = document.querySelector('.nav-bar');
toggleButton.addEventListener('click', function () {
    navBar.classList.toggle('toggle');
    toggleLine1.classList.toggle('toggle');
    toggleLine2.classList.toggle('toggle');
    toggleLine3.classList.toggle('toggle');
});
var msg = document.querySelector('.msg');
var gsapMsg = gsap.to('.msg', 0.25, {
    autoAlpha: 1,
    y: -40,
    ease: Expo.inOut,
    paused: true
});
var arrInput = document.querySelectorAll('.aInput');

function send(event, php) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    for (var i = 0, count = arrInput.length; i < count; i++) {
        arrInput[i].classList.remove('inputerror');
    }

    event.target.querySelector('button').disabled = true;
    showMsg('Wait. Sending...', '#b1b1b1');
    var req = new XMLHttpRequest();
    req.open('POST', php, true);

    req.onload = function () {
        event.target.querySelector('button').disabled = false;

        if (req.status >= 200 && req.status < 400) {
            var json = JSON.parse(this.response);

            if (json.result === 'success') {
                showMsg('Message send', '#36AE46', '1000');
                setTimeout(function () {
                    document.getElementsByClassName('msg')[0].style.opacity = '0';
                }, 2000);
                event.target.reset();
            } else if (json.result === 'email') {
                showMsg('Error. Need email', '#DC352F');
                setTimeout(function () {
                    document.getElementsByClassName('msg')[0].style.opacity = '0';
                }, 2000);
                document.querySelector('#email').classList.add('inputerror');
            }
        } else {
            showMsg('Server error. number: ' + req.status, '#DC352F');
            setTimeout(function () {
                document.getElementsByClassName('msg')[0].style.opacity = '0';
            }, 2000);
        }
    };

    req.onerror = function () {
        showMsg('Error sending request', '#DC352F');
    };

    req.send(new FormData(event.target));
}

function showMsg(message, color) {
    msg.innerText = message;
    msg.style.background = color;
    gsapMsg.restart();
}

function inputFile(e) {
    var el = e.target.parentNode.querySelector('.count');
    if (e.target.value !== '') el.innerHTML = 'Selected files: ' + e.target.files.length;else el.innerHTML = 'Select file';
}

for (var i = 0, count = arrInput.length; i < count; i++) {
    arrInput[i].addEventListener('focus', function () {
        this.nextElementSibling.classList.add('active');
    });
    arrInput[i].addEventListener('blur', function () {
        if (this.value === false) {
            this.nextElementSibling.classList.remove('active');
        }
    });
}

window.onload = function () {
    var loadPage = gsap.timeline();
    loadPage.to('#form', 0.7, {
        autoAlpha: 1,
        y: 0,
        ease: Expo.inOut
    });

};

const select = document.querySelector('select');
const allLang = ['en', 'ru'];

select.addEventListener('change', changeURLLanguage);
// перенаправить url c указанием языка
function changeURLLanguage () {
    let lang = select.value
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function  changeLanguage () {
    let hash = window.location.hash;
    hash = hash.substr(1);
    if (!allLang.includes(hash) ) {
        location.href = window.location.pathname + '#en';
        location.reload()
    }
    select.value = hash;
    document.querySelector('.lng-about-title').innerHTML = langArr['about-title'][hash];

    for (let key in langArr) {
        let elem = document.querySelector('.lng-'+key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }
    }

}

changeLanguage();

