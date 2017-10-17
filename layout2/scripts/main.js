var Header = {
    init: function () {
        this.menuBtn();
        this.headerSticky();
        this.mainNav();
    },
    menuBtn: function () {
        $('.menu-btn').on('click', function (e) {
            $('body').toggleClass('menu-opened');
            e.preventDefault();
        })
    },
    headerSticky: function headerSticky() {
        var $header = $('#main-header');
        $(window).on('scroll load', function () {
            if ($(document).scrollTop() > 100) {
                $header.addClass("scrolled");
            } else {
                $header.removeClass("scrolled");
            }
            if ($(document).scrollTop() > 250) {
                $header.addClass("sticky");
            } else {
                $header.removeClass("sticky");
            }
        });
    },
    mainNav: function mainNav() {
        if ($(window).innerWidth() < 975) {
            $('.main-nav').find('a').on('click', function (event) {
                event.preventDefault();
                $(this).addClass('active').parent('li').siblings().children('a').removeClass('active');

                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 50
                }, 500);
                setTimeout(function () {
                    $('.menu-btn').trigger('click');
                }, 600);
            });
        } else {
            $('.main-nav').find('a').on('click', function (event) {
                event.preventDefault();

                $(this).addClass('active').parent('li').siblings().children('a').removeClass('active');

                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 50
                }, 500);
            });
        }
    },
    scrolling: function () {
        var scrollPos = $(document).scrollTop();
        $('.main-nav').find('a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top -50 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.main-nav').find('a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }
};

var TopSlider = {
    slider: function () {
        $('.top-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            appendArrows: $(".slider-nav"),
            fade: true,
            cssEase: 'linear',
            nextArrow: '<button class="fa fa-angle-right arrow-next"></button>',
            prevArrow: '<button class="fa fa-angle-left arrow-prev"></button>'
        });
    }
};


function initMap() {
    var styles = [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ]
    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

    var uluru = {lat: 40.1389997, lng: -75.1953934};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

}


$(document).ready(function () {
    Header.init();
    TopSlider.slider();
    initMap();
});

$(document).on('scroll', function () {
    Header.scrolling();
});
