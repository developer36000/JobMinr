$.each($('.search-module .sel-wrap-default select'), function (index) {
    $(this).select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: $('.search-module'),
        dropdownCssClass: 'search-module-drowpdown-' + index

    });
});
$.each($('.filtered .sel-wrap-default select'), function (index) {
    $(this).select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: $('.filtered'),
        dropdownCssClass: 'search-module-drowpdown-' + index

    });
});

$.each($('.sidebar-left .sel-wrap-default select'), function (index) {
    $(this).select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: $('.sidebar-left'),
        dropdownCssClass: 'search-module-drowpdown-' + index

    });
});


$('select:not(.rating)').on('select2:opening', function (e) {
    setTimeout(function () {
        $('.search-module .select2-results__options').niceScroll({
            rtlmode: false,
            railalign: 'right',
            autohidemode: false
        });
        $('.select2-search__field').on('keypress', function () {
            $('.search-module-drowpdown-1 .select2-results__options').niceScroll({
                rtlmode: false,
                railalign: 'right',
                autohidemode: false
            });
        });
    }, 0);
    $(this).closest('.sel-wrap').addClass('is-focused');
}).on('select2:close', function (e) {
    $(this).closest('.sel-wrap').removeClass('is-focused');
});

$('.save').click(function() {
    var $this = $(this);
    if ($this.hasClass('add_save')) {
        $this.removeClass('add_save');
    } else if ($this.hasClass('no_save')) {
        $this.removeClass('no_save').addClass('add_save');
    } else {
        $this.addClass('add_save');
    }
});

$(document).ready(function(){

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 400) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').on('show.bs.dropdown',function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

});
$('select.dropdown').dropdown('set selected', ['php','UI']);



$('.checkdown').click(function() {
    var $this = $(this);
    $this.removeClass('open')
    if ($this.hasClass('active')) {
        $this.removeClass('active');
    } else if ($this.hasClass('inactive')) {
        $this.removeClass('inactive').addClass('active');
    } else {
        $this.addClass('active');
    }
});


//------------------
