(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Header = {
    init: function init() {
        this.burgerMenu();
        this.headerSticky();
        this.mainNav();
    },
    burgerMenu: function burgerMenu() {
        $('.menu-btn').on('click', function (e) {
            $(this).closest('#header').toggleClass('menu-active');
            e.preventDefault();
        });
    },
    headerSticky: function headerSticky() {
        var $header = $('#header');
        $(window).on('scroll load', function () {
            if ($(document).scrollTop() > 90) {
                $header.addClass("sticky");
            } else {
                $header.removeClass("sticky");
            }
        });
    },
    mainNav: function mainNav() {
        $('.main-navigation').find('a').on('click', function (event) {
            event.preventDefault();

            $(this).addClass('active').parent('li').siblings().children('a').removeClass('active');

            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 50
            }, 500);
        });
    }
};

var Slider = {
    init: function init() {
        this.sliderCarousel();
    },
    sliderCarousel: function sliderCarousel() {
        $('.about-carousel').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            fade: true,
            prevArrow: $('.prev'),
            nextArrow: $('.next'),
            autoplay: true,
            autoplaySpeed: 2000
        });
    }
};

var Portfolio = {
    init: function init() {
        this.projectsData();
        this.animated();
    },
    animated: function animated() {
        var portfolio = $('#portfolio-section');
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            $(portfolio).find('.project-item').addClass('animated', scroll >= $(portfolio).offset().top - 300);
        });
        $(window).scroll();
    },
    projectsData: function projectsData() {
        $.ajax({
            type: "GET",
            url: "./projects.json",
            dataType: "json",
            cache: "false",
            success: function success(result) {
                var items = [];
                var projectsContainer = $('#portfolio-section').children('.container');
                $.each(result, function (key) {
                    if (key <= 6) {
                        items.push('<div class="project-item ' + this.size + '">' + '<div class="project-preview" style="background-image: url(' + this.backgroundImage + ')"></div>' + '<div class="project-info"><h5>' + this.projectName + '</h5><p>' + this.category + '</p></div>' + '<div class="project-actions"><a href="/" class="view"></a><a href="/" class="like"></a></div>' + '</div>');
                    }
                });
                $(projectsContainer).find('.projects-wrap').append(items);
            }
        });
        $('.see-all').on('click', function (e) {
            $.ajax({
                type: "GET",
                url: "./projects.json",
                dataType: "json",
                cache: "false",
                success: function success(result) {
                    var items = [];
                    var projectsContainer = $('#portfolio-section').children('.container');
                    $.each(result, function (key) {
                        if (key >= 7) {
                            items.push('<div class="project-item animated ' + this.size + '">' + '<div class="project-preview" style="background-image: url(' + this.backgroundImage + ')"></div>' + '<div class="project-info"><h5>' + this.projectName + '</h5><p>' + this.category + '</p></div>' + '<div class="project-actions"><a href="/" class="view"></a><a href="/" class="like"></a></div>' + '</div>');
                        }
                    });
                    $(projectsContainer).find('.projects-wrap').append(items);
                },
                complete: function complete() {
                    $('.see-all').hide();
                }
            });
            e.preventDefault();
        });
    }
};

var Footer = {
    formValidate: function formValidate() {
        $('#subscribe').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: "Please enter a valid email address"
            },
            submitHandler: function submitHandler(form) {
                form.submit();
            }
        });
    }
};

$(document).on('ready', function () {
    Header.init();
    Slider.sliderCarousel();
    Portfolio.init();
    Footer.formValidate();
});

},{}]},{},[1]);
