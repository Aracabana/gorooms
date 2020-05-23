$(document).ready(function () {
    var windowW;
    var searchBoxOnTop = false;
    $(window).resize(function () {
        windowW = $(window).width();
        if (windowW >= 992) {
            $('#js-menu-btn').removeClass('open');
            $('#js-menu').removeAttr('style');
        }
        if (windowW >= 481) {
            if ($('*').is('#details-list-wrapper')) {
                $('#details-list-wrapper').addClass('in').attr('aria-expanded', true);
            }
        } else {
            if ($('*').is('#details-list-wrapper')) {
                $('#details-list-wrapper').removeClass('in').attr('aria-expanded', false);
            }
        }
    });
    $(window).trigger('resize');
   
    //scroll search
    if ($('*').is('#js-search')) {
        var search = $('#js-search');
        var searchWrapper = $('#js-search-wrapper');
        var searchTop;
        var searchHeight;
        $(window).resize(function () {
            searchTop = search.offset().top;
            searchHeight = search.height();
        });
        $(window).trigger('resize');
        $(window).scroll(function () {
            fixSearch(search);
        });
    }
    function fixSearch(search) {
        var datepicker = $('.datepicker-here').datepicker().data('datepicker');
        datepicker.update({
            position: "bottom left"
        });
        datepicker.hide();
        if ($(window).scrollTop() >= searchTop + searchHeight) {
            searchWrapper.css('padding-top', searchHeight);
            search.removeClass('prefixed');
            search.addClass('fixed');
            if (windowW <= 991) {
                search.addClass('show-advanced-btn');
            }
            searchBoxOnTop = false;
            $(window).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (event) {
                var delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
                if (delta < 0) {
                    search.removeClass('bottom');
                } else {
                    if(!searchBoxOnTop) {
                        search.addClass('bottom');
                    }

                }
            });
        } else if ($(window).scrollTop() >= searchTop && $(window).scrollTop() < searchTop + searchHeight) {
            search.addClass('prefixed');
        } else if ($(window).scrollTop() <= searchTop) {
            searchWrapper.css('padding-top', 0);
            search.removeClass('prefixed');
            search.removeClass('fixed');
            search.removeClass('bottom');
            search.removeClass('show-advanced-btn');
            searchBoxOnTop = true;
        }
    }
    
    //advanced-search
    $('#js-advanced-search-open-btn').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var isSearchOnTop = $('#js-search').hasClass('bottom') || $('#js-search').hasClass('show-advanced-btn') || $('#js-search').hasClass('prefixed');
        if(isSearchOnTop) {
            $('#js-advanced-search').addClass('fixed');
        } else {
            $('#js-advanced-search').removeClass('fixed');
        }

        $('#js-advanced-search').slideDown();
        $('#js-advanced-search-in').scrollTop(0);

        $('body').addClass('noscroll');
    });
    $('#js-advanced-search-close-btn').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var advancedSearch = $(this).closest('#js-advanced-search');
        $(advancedSearch).slideUp();
        setTimeout(function () {
            $(advancedSearch).removeClass('fixed');
        }, 800)
        $('body').removeClass('noscroll');
    });
    
    //mobile menu
    $('#js-menu-btn').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('#js-menu').slideToggle();
    });
    
    //sliders
    if ($('*').is('.js-hotel-card-slider')) {
        $('.js-hotel-card-slider').each(function(){
            var hotelCardSwiper = new Swiper(this, {
                navigation: {
                    nextEl: this.querySelector('.swiper-button.swiper-button-next'),
                    prevEl: this.querySelector('.swiper-button.swiper-button-prev'),
                },
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                speed: 600,
                roundLengths: true,
                effect: 'fade'
            });
        });
    }
    if ($('*').is('.product-slider-big')) {
        var galleryThumbs = new Swiper('.product-slider-small', {
            spaceBetween: 10,
            slidesPerView: 2,
            loop: true,
            roundLengths: true,
            navigation: {
                nextEl: '.swiper-button.swiper-button-next.product-slider-small-button-next',
                prevEl: '.swiper-button.swiper-button-prev.product-slider-small-button-prev'
            },
            breakpoints: {
                361: {
                    spaceBetween: 10,
                    slidesPerView: 3
                },
                481: {
                    spaceBetween: 25,
                    slidesPerView: 4
                }
            }
        });
        var galleryTop = new Swiper('.product-slider-big', {
            loop: true,
            roundLengths: true,
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    }
    
    //changing name of more-btn
    if ($('*').is('.content-more')) {
        $('.content-more ').on('show.bs.collapse', function() {
            $(this).next('.content-more-btn').children('span').text('Свернуть');
        });
        $('.content-more ').on('hide.bs.collapse', function() {
            $(this).next('.content-more-btn').children('span').text('Развернуть');
        });
    }
    
    //masked input
    $('input[type="tel"]').mask('+7 (999) 999 99 99');
    
    //tables
    if($('*').is('.text-section table')) {
        var tables = $('.text-section').find('table');
        tables.each(function() {
            $(this).wrapAll('<div class="table-wrapper">');
        });
    }
    
    //show tel number
    $('.js-show-tel-btn').click(function() {
        $(this).hide();
        $(this).next('.js-tel-link').addClass('visible');
    });
    
    //formstyler
    if ($('*').is('select')) {
        $('select').styler();
    }

});
