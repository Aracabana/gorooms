$(document).ready(function () {
    var windowW;
    var menu = $('#js-menu-wrapper');
    var menuTop;
    $(window).resize(function () {
        windowW = $(window).width();
        menuTop = menu.offset().top;
        if (windowW >= 992) {
            $('#js-menu-btn').removeClass('open');
            $('#js-menu').removeAttr('style');
        }
    });
    $(window).trigger('resize');
   
    //scroll menu
    // $(window).scroll(function () {
    //     fixMenu();
    // });
    // fixMenu();
    // function fixMenu() {
    //     if ($(window).scrollTop() >= menuTop) {
    //             menu.addClass('fixed');
    //         } else {
    //         menu.removeClass('fixed');
    //     }
    // }
    
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
                speed: 400
            });
        });
    }
    if ($('*').is('.product-slider-big')) {
        var galleryThumbs = new Swiper('.product-slider-small', {
            spaceBetween: 10,
            slidesPerView: 2,
            loop: true,
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
            thumbs: {
                swiper: galleryThumbs,
            },
        });
    }
    
    //input [type="file"]
    $('.js-file').change(function () {
        var file = $(this),
            fileValue = file.val(),
            label = file.next('.js-file-label');
        if (fileValue !== '') {
            label.text(fileValue);
        }
    });
    
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
    
    //form-control-label
    $(document).on('focus', '.form-control', function () {
        $(this).parent('.form-group').find('.form-control-label').hide();
    });
    $(document).on('blur', '.form-control', function () {
        var value = $(this).val();
        console.log(value);
        if (value === '' || value === '+7 (___) ___ __ __') {
            $(this).parent('.form-group').find('.form-control-label').show();
        }
    });
});
