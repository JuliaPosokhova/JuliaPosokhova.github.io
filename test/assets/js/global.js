(function ($, window, document) {
    'use strict';

    var page = {
        init: function () {
        },


        carouselDrag: function () {
            var $slidesBlock = $('.slides-carousel'),
                tabs = $slidesBlock.find('.tabs-block'),
                slides = $slidesBlock.find('.slides-block'),
                $description = slides.find('.description'),
                $status = $('.paging-info').children(),
                handle = $('.handle');

            tabs.slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: slides,
                infinite: false,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            slides.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: tabs,
                infinite: false,
                speed: 500,
                appendArrows: $('.paging-info')
            });

            //pagination by init
            var currentSlide = slides.slick('slickCurrentSlide'),
                allSlides = slides.find('.slide-item').length;
            $status.text(currentSlide + 1 + '/' + allSlides);

            //pagination by clicked tabs
            slides.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                var i = (currentSlide ? currentSlide : 0) + 1;
                $status.text(i + '/' + slick.slideCount);
            });

            slides.find('.slide-item').children('.description').addClass('active');

            //set data attribute each description block
            $description.each(function (i) {
                $(this).attr('data-description', i);
            });

            //change dragbar position when tab link was clicked
            tabs.find('.tab-item').on('click', function () {
                slides.find('.slick-current').find($description).first().addClass('active').siblings($description).removeClass('active');
                var dataDescription = $('.slick-current').find('.active').data('description');
                dragSlider.setStep(dataDescription + 2);
                return false;
            });

            $description.on('click', function () {
                var $this = $(this),
                    dataDescription = $this.data('description');

                $this.addClass('active').siblings().removeClass('active');
                dragSlider.setStep(dataDescription + 2);
                return false;
            });


            //set up dragbar
            var dragSlider = new Dragdealer('drag-bar', {
                steps: 10,
                x: 0.1,
                css3: true,
                slide: true,
                callback: function (x, y) {

                    var step = $("#drag-bar").attr('data-step', this.getStep()[0] - 1);

                    var dataDescription = slides.find('.slick-current').find('.active').data('description');
                    //dragSlider.setStep(dataDescription + 1);


                    $('.description').each(function () {
                        var dataDescription = $(this).data('description');
                        $(this).removeClass('active');

                        if ($("#drag-bar").attr('data-step') >= dataDescription) {
                            $(this).closest('.slide-item').addClass('dragged').siblings().removeClass('dragged');
                        }
                    });

                    slides.find('.slide-item').each(function () {
                        $(this).find('.description').first().addClass('active');
                    });


                    var draggedData = $('.dragged').data('slick-index');
                    $('.slides-block').slick('slickGoTo', draggedData);

                    $("#drag-bar").children('.step').each(function (i) {
                        var $this = $(this);
                        $this.attr('data-active', i + 1);
                        var dataActive = $this.data('active');

                        if ($("#drag-bar").attr('data-step') >= dataActive) {
                            $this.addClass('full');
                        } else {
                            $this.removeClass('full');
                        }
                    });
                }
            });

        },

        load: function () {
            page.carouselDrag();
        },
        resize: function () {
        },
        scroll: function () {
        }
    };

    $(document).ready(page.init);
    $(window).on({
        'load': page.load,
        'resize': page.resize,
        'scroll': page.scroll
    });
})(jQuery, window, document);