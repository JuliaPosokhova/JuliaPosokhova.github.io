$(document).ready(function () {
    $('html').removeClass('no-js');

    /*  mobile devices detected  */
    if ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) {
        $('.no-dev').removeClass('no-dev');
    }
    /*  /mobile devices detected  */

    /*  mobile menu behaviour */
    $('.btn-mob').on('click', function () {
        var $html = $('html');
        $html.toggleClass('menu-open');
        return false;
    });
    /*  /mobile menu behaviour */

    /*  add/remove sticky class for header  */
    var $header = $('#header');
    $(window).on('scroll load', function () {
        if ($(document).scrollTop() > 90) {
            $header.addClass("sticky");
        } else {
            $header.removeClass("sticky");
        }
    });
    /*  /add/remove sticky class for header  */

    $(".items").owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        nav: true,
    });


    /*  facts circles */
    var circleFacts = $('.facts').find('div[id^="circle-"]');
    circleFacts.each(function () {
        var $this = $(this);
        var $circleNumber = $this.data('number');

        $this.circleProgress({
            value: 1,
            fill: {color: '#ffffff'},
            size: 80,
            thickness: 2
        }).on('circle-animation-progress', function (event, progress) {
            $(this).find('strong').html(parseInt($circleNumber * progress));
        });
    });
    /*  /facts circles */

});


