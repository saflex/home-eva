// mobile menu


$(function() {
    $('.clk-la').click(function() {
        window.location = 'http://www.saflex.ru/shop-mebel2/index10.html'
    });
});


$(function() {
    $('.t-clz').click(function() {
        $('.t-clzs').addClass("sw-active-no");
    });
});
$(function() {
    $('.t-clz2').click(function() {
        $('.t-clzs2').addClass("sw-active-no");
    });
});
$(function() {
    $('.t-clz3').click(function() {
        $('.t-clzs3').addClass("sw-active-no");
    });
});
$(function() {
    $('.t-clz4').click(function() {
        $('.t-clzs4').addClass("sw-active-no");
    });
});
$(function() {
    $('.t-clz5').click(function() {
        $('.t-clzs5').addClass("sw-active-no");
    });
});
$(function() {
    $('.t-clz6').click(function() {
        $('.t-clzs6').addClass("sw-active-no");
    });
});


$(function() {
    $('nav#menu').mmenu();
});




$(function() {
    inputmask_initialization()
});




function inputmask_initialization() {
    var listCountries = $.masksSort($.masksLoad("http://cdn.rawgit.com/andr-04/inputmask-multi/master/data/phone-codes.json"), ['#'], /[0-9]|#/, "mask");
    var listRU = $.masksSort($.masksLoad("http://cdn.rawgit.com/andr-04/inputmask-multi/master/data/phones-ru.json"), ['#'], /[0-9]|#/, "mask");
    var maskOpts = {
        inputmask: {
            definitions: {
                '#': {
                    validator: "[0-9]",
                    cardinality: 1
                }
            },
            showMaskOnHover: false,
            autoUnmask: true,
            clearMaskOnLostFocus: false
        },
        match: /[0-9]/,
        replace: '#',
        listKey: "mask"
    };

    var maskChangeRU = function(maskObj, determined) {
        if (determined) {
            if (maskObj.type != "mobile") {
                $("#descr").html(maskObj.city.toString() + " (" + maskObj.region.toString() + ")");
            } else {
                $("#descr").html("мобильные");
            }
        } else {
            $("#descr").html("");
        }
    }
    $('#customer_phone').inputmasks($.extend(true, {}, maskOpts, {
        list: listRU,
        onMaskChange: maskChangeRU
    }));
    $('#phone_mask').change();


};




jQuery('.acive-block').click(function() {
    jQuery('.close-block').slideToggle('');
});


jQuery('.search-menu').click(function() {
    jQuery('.search-area').slideToggle('');
});



var $nav_list = $('.tabs'),
    $nav_tab = $nav_list.children('.tab'),
    $back_tab = $('.tab-back'),
    $more_tab = $('.tab-more'),
    $sections = $('.slides'),
    tab_list_length = $nav_tab.length,
    tab_width = $nav_tab.eq(0).outerWidth(),
    list_width = $nav_list.innerWidth(),
    tabs_displayed = parseInt((list_width / tab_width), 10),
    pos_counter = 0;

// configure the slider
$sections.slick({
    arrows: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
    speed: 1000,
    infinite: true,

    // set the height of the slide display based on the currently displayed slide when the slider is initialized
    onInit: function() {
        startingSlideHeight = $('.slick-active').outerHeight();
        $sections.css({
            'height': startingSlideHeight + 'px',
            'overflow': 'hidden'
        });
    },

    // when navigating via the slider, keep the active section's tab in view in the tab display
    onBeforeChange: function(slick, currentSlide, targetSlide) {
        //round tabs_displayed to nearest whole number to ensure logic is correct after resizing
        var tabs_rounded = Math.round(tabs_displayed);

        // trigger a rightward animation of tabs
        if ((targetSlide - pos_counter) / (tabs_rounded - 1) >= 1 && targetSlide < (tab_list_length - 1)) {
            var modulus = ((targetSlide - pos_counter) % (tabs_rounded)) + 1;
            var integer = Math.floor((targetSlide - pos_counter) / tabs_rounded);
            var tab_animation_distance = (((integer - 1) * tabs_rounded) + modulus + 1) * tab_width;
            $nav_tab.each(function() {
                $(this).animate({
                    left: '-=' + tab_animation_distance
                }, 300);
            });
            pos_counter += (((integer - 1) * tabs_rounded) + modulus + 1);
            if (pos_counter < tab_list_length - tabs_rounded) {
                $more_tab.css('right', '0px');
            } else {
                $more_tab.css('right', '999px');
            }
            if (pos_counter > 0) {
                $back_tab.css('left', '0px');
            }
        } else {
            // behavior for tabs if sliding to last panel while tab view is offset some distance to the left
            if ((targetSlide - pos_counter) / (tabs_rounded - 1) >= 1 && targetSlide === (tab_list_length - 1)) {
                var last_pos = tab_list_length - tabs_rounded;
                $nav_tab.each(function() {
                    var index = $(this).index();
                    $(this).animate({
                        left: ((index - last_pos) * tab_width) + 'px'
                    }, 300);
                });
                $more_tab.css('right', '999px');
                $back_tab.css('left', '0px');
                pos_counter = last_pos;
            }
        }

        // trigger a leftward animation of tabs
        if (targetSlide / pos_counter <= 1 && targetSlide > 0) {
            var distance_multiplier = (pos_counter - targetSlide) + 1;
            var tab_animation_distance = distance_multiplier * tab_width;
            $nav_tab.each(function() {
                $(this).animate({
                    left: '+=' + tab_animation_distance
                }, 300);
            });
            pos_counter -= distance_multiplier;
            if (pos_counter > 0) {
                $back_tab.css('left', '0px');
            } else {
                $back_tab.css('left', '-999px');
            }
            if (pos_counter < tab_list_length - tabs_rounded) {
                $more_tab.css('right', '0px');
            }
        } else {
            // behavior for tabs if sliding to first panel while tab view is offset some distance to the right
            if (targetSlide / pos_counter <= 1 && targetSlide === 0) {
                $nav_tab.each(function() {
                    var index = $(this).index();
                    $(this).animate({
                        left: (index * tab_width) + 'px'
                    }, 300);
                });
                $more_tab.css('right', '0px');
                $back_tab.css('left', '-999px');
                pos_counter = 0;
            }
        }
    },

    // after sliding, fix the height of the display to that of the currently displayed slide
    // update the active tab
    onAfterChange: function() {
        var index = $sections.slickCurrentSlide(),
            this_sectionHeight = $('.slick-active').outerHeight();
        $nav_tab.removeClass('active');
        $nav_tab.eq(index).addClass('active');
        $sections.animate({
            height: this_sectionHeight + 'px'
        });
    }
});

$nav_tab.each(function() {
    var index = $(this).index();
    var left_pos = (tab_width * index) + 'px';
    $(this).css('left', left_pos);
});

//on click on more or back tabs, list animates right or left, more and back tab appearance determined by counter value
$more_tab.click(function() {
    $nav_tab.each(function() {
        $(this).animate({
            left: '-=' + tab_width
        }, 300);
    });
    pos_counter++;
    if (pos_counter < tab_list_length - tabs_displayed) {
        $more_tab.css('right', '0px');
    } else {
        $more_tab.css('right', '999px');
    }
    if (pos_counter > 0) {
        $back_tab.css('left', '0px');
    }
});
$back_tab.click(function() {
    $nav_tab.each(function() {
        $(this).animate({
            left: '+=' + tab_width
        }, 300);
    });
    pos_counter--;
    if (pos_counter > 0) {
        $back_tab.css('left', '0px');
    } else {
        $back_tab.css('left', '-999px');
    }
    if (pos_counter < tab_list_length - tabs_displayed) {
        $more_tab.css('right', '0px');
    }
});

//clicking on a nav_tab gives it the active class, slides slider to the corresponding section
$nav_tab.click(function() {
    $nav_tab.removeClass('active');
    $(this).addClass('active');
    var index = $(this).index();
    $sections.slickGoTo(parseInt(index));
});

// remeasure an li and tab width for spacing, re-measure num of tabs displayed
function set_sizes() {
    tab_width = $nav_tab.outerWidth();
    list_width = $nav_list.outerWidth();
    tabs_displayed = list_width / tab_width;
    //recalculate height of the currently displayed slide
    var this_sectionHeight = $('.slick-active').outerHeight();
    $sections.css('height', this_sectionHeight + 'px');
    //use tab width and tab index to set horizontal spacing
    $nav_tab.each(function() {
        var index = $(this).index();
        var left_pos = (tab_width * (index - pos_counter)) + 'px';
        $(this).css('left', left_pos);
    });
}

// trigger set_sizes on page resize
var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(set_sizes, 15);
});


// accordion jq-ui
$(function() {
    $(".accordion").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
    });
});

$(function() {
    $(".accordion1").accordion({
        heightStyle: "content",
        collapsible: true,
    });
});






if ($(window).width() < 768) {


    $(function() {
        $(".accordion1").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false,
        });
    });


} else {
    // change functionality for larger screens
}




$(function() {
    $('.switcher').click(function() {
        $('.switcher').toggleClass("sw-active");
        $('.filtr-area').toggleClass('no-screen');
    });
});


$(document).ready(function() {

    //main nav
    $(window).on('scroll load', function() {
        updateMainNav();
    });

    function updateMainNav() {
        if ($(window).scrollTop() >= 153) {
            $('body').addClass('minimize-menus');
        } else {
            $('body').removeClass('minimize-menus');
        }
    }

    $('.user-nav > a').on('click', function() {
        $('body').toggleClass('show-user-nav');
    });

    $(document).on('click', function(event) {
        $('body').removeClass('show-user-nav');
    });

    $('.collapse-main-nav').on('click', function() {
        if ($('body').toggleClass('show-main-nav').hasClass('show-main-nav')) window.scrollTo(0, 0);
        return false;
    });

});




// mobile-viewport
if (screen.width <= 400) {
    $('head').append('<meta name="viewport" content="width=400, telephone=no, user-scalable=0" />');
} else {
    $('head').append('<meta name="viewport" content="width=device-width, telephone=no">');
}
$(window).on("orientationchange", function() {
    if (window.orientation == 0) // Portrait 
    {
        $('head').append('<meta name="viewport" content="width=device-width,  telephone=no">');
    } else // Landscape 
    {
        $('head').append('<meta name="viewport" content="width=640,  telephone=no">');
    }
});



// placeholder-focus
$(document).ready(function() {
    $('input,textarea').focus(function() {
        $(this).data('placeholder', $(this).attr('placeholder'))
        $(this).attr('placeholder', '');
    });
    $('input,textarea').blur(function() {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });
});



// slick-slider
$(document).ready(function() {



    $('.s-items').slick({
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-navs'
    });
    $('.slider-navs').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.s-items',
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });







    $('.slide-r').slick({
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },

            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 501,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });




    $('.s-items2s').slick({
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },

            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 501,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });






    $('.s-items3').slick({
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },

            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 501,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });




    $('.s-items4').slick({
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },

            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 501,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]


    });


    $('.s-items4').show();




    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },

            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 501,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

});

// zoom off mobile 
document.documentElement.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);



// custom-forms 
(function($) {
    $(function() {
        $('.form-control, .form-controls, select, input[type="checkbox"], .inp-checks input').styler({
            selectSearch: true
        });
    });
})(jQuery);



//
$(function() {
    $(".tool").tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });
});




if ($(window).width() > 768) {


    $(".scroller-b").mCustomScrollbar({
        axis: "y",
        autoDraggerLength: false,

    });


} else {
    // change functionality for larger screens
}



/**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */
$(function() {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');

        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });
});




jQuery('.suss-btn').click(function() {
    jQuery('.shower').slideToggle('');
    jQuery('.suss-btn').toggleClass("str-full");
});



if ($(window).width() > 767) {


    jQuery('.slick-fliltr').click(function() {
        jQuery('.filtr-right').toggleClass('str-full');
        jQuery('.ul-area-div').toggleClass("full-sizer");
        jQuery('.no-show-l').toggleClass("shows-class");
        jQuery('.slick-fliltr').toggleClass("new-bg-filtr");
    });

} else {
    // change functionality for larger screens
}



if ($(window).width() < 768) {


    jQuery('.slick-fliltr').click(function() {
        jQuery('.filtr-right').toggleClass('str-full2');
        jQuery('.slick-fliltr').toggleClass("new-bg-filtr");
        jQuery('.ul-area-div').toggleClass("full-sizer");
    });

} else {
    // change functionality for larger screens
}


if ($(window).width() < 1199) {

    $(document).ready(function() {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 5,

            asNavFor: '.slider-for',
            dots: true,
            focusOnSelect: true,
            centerMode: false,
        });
    });

} else {
    // change functionality for larger screens
}



if ($(window).width() > 1199) {

    $(document).ready(function() {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 5,
            vertical: true,
            asNavFor: '.slider-for',
            dots: true,
            focusOnSelect: true,
            centerMode: false,
        });
    });

} else {
    // change functionality for larger screens
}





$('.add-cart').click(function() {
    var $this = $(this);
    $this.toggleClass('SeeMore');
    if ($this.hasClass('.add-cart')) {
        $this.text('В корзину');
    } else {
        $this.text('Добавлено в корзину!');
    }
});








$(document).ready(function() {


    var today = new Date();
    var my_year = today.getFullYear();
    var my_month = today.getMonth();
    var my_date = today.getDate() + 1;


    function get_timer() {


        var date_new = new Date(my_year, my_month, my_date);


        var date_t = new Date(date_new);

        var date = new Date();

        var timer = date_t - date;



        if (date_t > date) {


            var day = parseInt(timer / (60 * 60 * 1000 * 24));

            if (day < 10) {
                day = '0' + day;
            }

            day = day.toString();

            var hour = parseInt(timer / (60 * 60 * 1000)) % 24;

            if (hour < 10) {
                hour = '0' + hour;
            }

            hour = hour.toString();

            var min = parseInt(timer / (1000 * 60)) % 60;

            if (min < 10) {
                min = '0' + min;
            }

            min = min.toString();


            var sec = parseInt(timer / 1000) % 60;

            if (sec < 10) {
                sec = '0' + sec;
            }

            sec = sec.toString();


            if (day[1] == 9 &&
                hour[0] == 2 &&
                hour[1] == 3 &&
                min[0] == 5 &&
                min[1] == 9 &&
                sec[0] == 5 &&
                sec[1] == 9) {
                animation($("#day0"), day[0]);
            } else {
                $("#day0").html(day[0]);
            }

            if (hour[0] == 2 &&
                hour[1] == 3 &&
                min[0] == 5 &&
                min[1] == 9 &&
                sec[0] == 5 &&
                sec[1] == 9) {
                animation($("#day1"), day[1]);
            } else {
                $("#day1").html(day[1]);
            }

            if (hour[1] == 3 &&
                min[0] == 5 &&
                min[1] == 9 &&
                sec[0] == 5 &&
                sec[1] == 9) {
                animation($("#hour0"), hour[0]);
            } else {
                $("#hour0").html(hour[0]);
            }
            //Äëÿ åäèíèö ÷àññîâ 
            if (min[0] == 5 &&
                min[1] == 9 &&
                sec[0] == 5 &&
                sec[1] == 9) {
                animation($("#hour1"), hour[1]);
            } else {
                $("#hour1").html(hour[1]);
            }


            if (min[1] == 9 &&
                sec[0] == 5 &&
                sec[1] == 9) {
                animation($("#min0"), min[0]);
            } else {
                $("#min0").html(min[0]);
            }

            if (sec[0] == 5 && sec[1] == 9) {
                animation($("#min1"), min[1]);
            } else {
                $("#min1").html(min[1]);
            }

            if (sec[1] == 9) {
                animation($("#sec0"), sec[0]);
            } else {
                $("#sec0").html(sec[0]);
            }
            animation($("#sec1"), sec[1]);

            setTimeout(get_timer, 1000);
        } else {
            $("#clock").html("<span id='stop'>Îòñ÷åò çàêîí÷åí!!!</span>");
        }

    }

    function animation(vibor, param) {
        vibor.html(param)
            .css({ 'marginTop': '-20px', 'opacity': '0' })
            .animate({ 'marginTop': '0px', 'opacity': '1' });
    }

    get_timer();
});





$(function() {
    $("#accordion").accordion({
        heightStyle: "content"
    });
});

$('.slm1').on('click', function() {
    $('.slm1').addClass('active-element');
    $('.slm2').removeClass('active-element');
    $('.slm2').removeClass('active-element');
});
$('.slm2').on('click', function() {
    $('.slm2').addClass('active-element');
    $('.slm1').removeClass('active-element');
    $('.slm3').removeClass('active-element');
});
$('.slm3').on('click', function() {
    $('.slm3').addClass('active-element');
    $('.slm1').removeClass('active-element');
    $('.slm2').removeClass('active-element');
});



$(".scroller-bs").mCustomScrollbar({
    axis: "y",
    autoDraggerLength: false,

});


$(document).ready(function() {
    $('#video-modal').on('hidden.bs.modal', function() {
        var $this = $(this).find('iframe'),
            tempSrc = $this.attr('src');
        $this.attr('src', "");
        $this.attr('src', tempSrc);
    });
});



$(function() {

    $('.q_order').on('click', function(e) {
        e.preventDefault();
    });

});







ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [52.1293224, 26.0831308],
            zoom: 10,
            controls: ['zoomControl']
        }),


        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [52.1293224, 26.0831308]
            },

        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'twirl#redStretchyIcon',

        }),


        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            balloonContent: 'Брестская обл., г. Пинск, д. Заполье, ул. Мирная, 21'
        }, {
            // Опции.
            // Необходимо указать данный тип проекта.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/maps.png',
            // Размеры метки.
            iconImageSize: [59, 74],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-27, -2]
        });




    myMap.geoObjects.add(myPlacemark)
}