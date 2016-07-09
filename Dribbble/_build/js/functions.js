$(function() {
    $(document).ready(function() {
        // show tooltips
        tooltips();
        hoverlogo();
        displayoptions();
        shownav();
        // active like nav
        fav();
        more();
        navdown();
        // fix menu responsive
        setInterval(function() {
            fixmenu();
            displayresponsive();
        }, 250);

    });

    var tooltips = function() {
        $('.share a,.attach a,.fav a:nth-child(2), .group a').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized']
        });
        $('.small-with-meta,.large-with-meta,.small-without-meta, .large-without-meta').tooltipster({
            theme: ['tooltipster-noir', 'tooltipster-noir-customized1']
        });
    };

    var hoverlogo = function() {
        $('#logo').hover(function() {
            var x = $(this).find('img');
            if (x.attr('src') === 'img/logo.png') {
                x.attr('src', 'img/logo-hover.png');
            } else {
                x.attr('src', 'img/logo.png');
            }
        });
    };

    var displayoptions = function() {
        var dr = $('.dribbbles');
        $('.small-with-meta').click(function() {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            dr.removeClass('hide-meta');
            dr.removeClass('large-meta');
            return false;
        });

        $('.large-with-meta').click(function() {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            dr.addClass('large-meta');
            dr.removeClass('hide-meta');
            return false;
        });

        $('.small-without-meta').click(function() {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            dr.addClass('hide-meta');
            dr.removeClass('large-meta');
            return false;
        });

        $('.large-without-meta').click(function() {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            dr.addClass('hide-meta');
            dr.addClass('large-meta');
            return false;
        });
    };

    // sai cmnr :)) khong biet lam
    var displayresponsive = function() {
        if ($(window).width() < 560) {
            $('.small-without-meta').addClass('active');
            if ($('.large-with-meta').hasClass('active')) {
                $('.small-without-meta').removeClass('active');
                $('.dribbbles').addClass('large-meta-active');
            } else {
                $('.dribbbles').removeClass('large-meta-active');
            }
        } else {
            $('.large-with-meta').removeClass('active');
            $('.small-without-meta').removeClass('active');
            $('.small-with-meta').addClass('active');
        }
    };

    var changesmall = function() {
        var dr = $('.dribbbles');
        if ($(window).width() < 560) {
            dr.addClass('hide-meta');
        } else {
            dr.removeClass('hide-meta');
        }
    };

    var shownav = function() {
        $('#toggle-nav').on('click', function() {
            var nav = $('#nav');
            var wrap = $('.wrap');
            if (nav.hasClass('nav-open')) {
                nav.removeClass('nav-open');
                wrap.css('margin-top', '0');
            } else {
                nav.addClass('nav-open');
                wrap.css('margin-top', $('#nav').height() + 'px');
            }
        });
    };

    var fav = function() {
        $('.toggle-fav').click(function() {
            var i = $(this).find('i');
            if (i.hasClass('is-fav')) {
                i.removeClass('is-fav');
            } else {
                i.addClass('is-fav');
            }
            return false;
        });
    };

    var more = function() {
        $('.more').click(function() {
            $('#t-home').css('display', 'none', 'important');
            if ($(window).width() <= 890) {
                if ($(this).hasClass('is-open')) {
                    $(this).siblings().show();
                    $(this).removeClass('is-open');
                    $('.wrap').css('margin-top', $('#nav').height() + 'px');
                } else {
                    $(this).siblings().hide();
                    $(this).addClass('is-open');
                    var x = $(this).height() + $(this).find('.tabs').height();
                    $('.wrap').css('margin-top', x + 'px');
                }
                return false;
            }
            return true;
        });
    };

    var navdown = function() {
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();

        $(window).scroll(function(event) {
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        });

        function hasScrolled() {
            var st = $(this).scrollTop();

            if (Math.abs(lastScrollTop - st) <= delta) {
                return;
            }

            if (st > lastScrollTop && st > navbarHeight) {
                $('header').removeClass('nav-down').addClass('nav-up');
            } else {
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-up').addClass('nav-down');
                }
            }
            lastScrollTop = st;
        }
    };

    var fixmenu = function() {
        if ($(window).width() > 890) {
            $('.wrap').css('margin-top', '56px');
            if ($('#nav').hasClass('nav-open')) {
                $('#nav').removeClass('nav-open');
            }
            $('#nav').children().each(function() {
                $(this).show();
                if ($(this).hasClass('is-open')) {
                    $(this).removeClass('is-open');
                }
            });
            if ($('#t-home').css('display') != 'none') {
                $('#t-home').css('display', 'none', 'important');
            }
        }
        if ($(window).width() < 890) {
            $('.wrap').css('margin-top', '40px');
        }
    };
});
