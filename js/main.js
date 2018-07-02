var $admin_sidebar = $('.admin-sidebar-wrap'), // only search once
	$page_container = $('.job-wrapper > .main-content');
	$page_header = $('header > .wrapper');

$(window).bind('load resize orientationChange', function () {
	
	var pos =  $admin_sidebar.position();
	var	width = (($(window).width() - $page_container.width())/2);
	var sidebar = $admin_sidebar.width();

	if (width < sidebar) {
		$page_container.css('margin-left', sidebar);
		$page_header.css('margin-left', sidebar);
	}
	
});

/* Admin Search page -> filter pill */


$(document).on('click', '.filter.admin .filter-row > .close', function(e) {
	e.preventDefault();
	$(this).parent().remove();
});

$('.filter.admin .stop-btn').on('click', function (e) {
	e.preventDefault();
	$.each($('.filter.admin .filter-rows .filter-row:not(.hidden)'), function () {
        $(this).remove();
	});
});
$('.filter.admin .add-btn').on('click', function (e) {
    e.preventDefault();
	var $add_row = $('.filter.admin').find('.filter-rows .filter-row.hidden').clone().removeClass('hidden');
	$('.filter-rows').append($add_row);
	
});



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

$.each($('.sidebar.sel-wrap-default select'), function (index) {
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
    
    $('.admin-button').on('click', function (e) {
        e.preventDefault();
        $('.admin-sidebar-wrap').addClass('show');
        $(this).fadeOut();
    });
    
	$('.admin-sidebar-wrap > .close').on('click', function (e) {
		e.preventDefault();
		$('.admin-sidebar-wrap').removeClass('show');
		$('.admin-button').fadeIn();
	});
    
    
});
$('select.dropdown').dropdown('set selected', ['php','UI']);



$('.checkdown').click(function() {
    var $this = $(this);
    $this.removeClass('open');
    if ($this.hasClass('active')) {
        $this.removeClass('active');
    } else if ($this.hasClass('inactive')) {
        $this.removeClass('inactive').addClass('active');
    } else {
        $this.addClass('active');
    }
});


//------------------
