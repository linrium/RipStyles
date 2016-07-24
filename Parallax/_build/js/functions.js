(function() {
    $(document).ready(function() {
        $(window).scroll(function() {
            var wScroll = $(this).scrollTop();
            $('.logo').css({
                'transform': 'translate(0px, ' + wScroll / 2 + '%)'
            });

            $('.back-bird').css({
                'transform': 'translate(0px, ' + wScroll / 4 + '%)'
            });

            $('.fore-bird').css({
                'transform': 'translate(0px, -' + wScroll / 30 + '%)'
            });

            if (wScroll > $('.clothes-pics').offset().top - ($(window).height() / 2)) {
                $('.clothes-pics figure').each(function(i) {
                    setTimeout(function() {
                        $('.clothes-pics figure').eq(i).addClass('is-showing');
                    }, 150 * (i + 1));

                });
            }

            if (wScroll > $('.large-window').offset().top - $(window).height()) {
                $('.large-window').css({
                    'background-position': 'center ' + (wScroll - $('.large-window').offset().top) + 'px'
                });

                var opacity = (wScroll - $('.large-window').offset().top + 400) / (wScroll / 5);

                $('.window-tint').css({
                    'opacity': opacity
                });
            }

            if (wScroll > $('.blog-posts').offset().top - $(window).height()) {
                var offset = Math.min(0, wScroll - $('.blog-posts').offset().top + $(window).height() - 350);
                $('.post-1').css({
                    'transform': 'translate(' + offset + 'px)'
                });

                $('.post-3').css({
                    'transform': 'translate(' + Math.abs(offset * 0.5) + 'px)'
                });
            }
        });
    });
})();
