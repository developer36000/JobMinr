var $admin_sidebar = $('.admin-sidebar-wrap'), // only search once
    $page_container = $('.job-wrapper > .main-content');
$page_header = $('header > .wrapper');

$(window).bind('load resize orientationChange', function () {

    var pos = $admin_sidebar.position();
    var width = (($(window).width() - $page_container.width()) / 2);
    var sidebar = $admin_sidebar.width();

    if (width < sidebar) {
        $page_container.css('margin-left', sidebar);
        $page_header.css('margin-left', sidebar);
    }

});

/* Admin Search page -> filter pill */


$(document).on('click', '.filter.admin .filter-row > .close', function (e) {
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

$('.save').click(function () {
    var $this = $(this);
    if ($this.hasClass('add_save')) {
        $this.removeClass('add_save');
    } else if ($this.hasClass('no_save')) {
        $this.removeClass('no_save').addClass('add_save');
    } else {
        $this.addClass('add_save');
    }
});

$(document).ready(function () {

    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').on('show.bs.dropdown', function () {
        $('html, body').animate({scrollTop: 0}, 800);
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
$('select.dropdown').dropdown('set selected', ['php', 'UI']);


$('.checkdown').click(function () {
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
/* search for niche*/
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('search-input');
    filter = input.value.toUpperCase();
    ul = document.getElementById("search-list");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("label")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
/* Read  json file  */

$.getJSON('db.json', function (data) {
    var job = data.job;
    var jobFilter = [];
    for (var i in job) {
        var selectOption = job[i].jobSelected;
        if (selectOption == false) {
            $("#search-list").append('<li><input id="check' + i + '" type="checkbox" value="' + job[i].jobNiche + '"><label for="check' + i + '">' + job[i].jobNiche + '</label></li>');
        } else {
            $("#search-list").append('<li><input id="ch' + i + '" type="checkbox" value="' + job[i].jobNiche + '" checked><label for="check' + i + '">' + job[i].jobNiche + '</label></li>');
        }
        jobFilter.push(job[i].jobNiche);
    }

    /*checked error  value  input niche */
    var p = [];

    function EroorNiche() {
        var a = $("form.niche").serializeArray();
        $.each(a, function () {
            for (var i = 0; i < jobFilter.length; i++) {
                if (jobFilter[i] == this.value) {
                    p = true;
                }
            }
        });
    }


    /*checked error  value  input niche */
    function addToJson() {
        var a = $("form.niche").serializeArray();
        EroorNiche();
        $.each(a, function () {
            if (this.value == '') {
                console.log("Pleas entry value");
            } else if (p == true) {
                console.log("Pleas entry another value");
            } else {
                i++;
                var jobID = i + 1;
                var jobNiche = this.value;
                var jobSelected = true;
                var jobCheck = true;
                var kaywords = [];
                job[i] = {
                    'jobID': jobID,
                    'jobNiche': jobNiche,
                    'jobSelected': jobSelected,
                    'jobCheck': jobCheck,
                    'kaywords': kaywords
                };
                $("#search-list").append('<li><input id="check' + i + '" type="checkbox" value="' + job[i].jobNiche + '" checked><label for="check' + i + '">' + job[i].jobNiche + '</label></li>');
                $(".views-list").append('<input id="ch' + i + '" type="checkbox" value="' + job[i].jobNiche + '"  checked><label for="ch' + i + '">' + job[i].jobNiche + '</label>');
            }
        });
    }

    function CheckList() {
        $.each(job, function (k) {
            $("#ch" + k).change(function () {
                if (this.checked) {
                    job[k].jobCheck = true;
                    console.log(job);
                }
                else {
                    job[k].jobCheck = false;
                    console.log(job);
                }
            });
        });
    }

    $.each(job, function (k) {
        $("#check" + k).change(function () {
            if (this.checked) {
                $(".views-list").html("");
                job[k].jobSelected = true;
                for (var t  in  job) {
                    if (job[t].jobSelected == true) {
                        $(".views-list").append('<input id="ch' + t + '" type="checkbox" value="' + job[t].jobNiche + '"  checked><label for="ch' + t + '">' + job[t].jobNiche + '</label>');
                        job[t].jobCheck = true;
                        console.log(job, t);
                    }
                    CheckList();
                }
            } else {
                CheckList();
                $(".views-list").html("");
                job[k].jobSelected = false;
                job[k].jobCheck = false;
                for (var t  in  job) {
                    if (job[t].jobSelected == true) {
                        $(".views-list").append('<input id="ch' + t + '" type="checkbox" value="' + job[t].jobNiche + '"  checked><label for="ch' + t + '">' + job[t].jobNiche + '</label>');
                        job[t].jobCheck = true;
                    }
                }
                console.log(job);
            }
        });
    });


    /* create  new niche*/
    $(".push-value").click(function () {
        addToJson();
        console.log(job);
    });


    function addToKay() {
        var a = $("form.keywoard").serializeArray();
        var p = [];
        $.each(a, function () {
            for (var i = 0; i < jobFilter.length; i++) {
                if (jobFilter[i] == this.value) {
                    p = true;
                }
            }
        });
        $.each(a, function () {
            if (this.value == '') {
                console.log("Pleas entry value");
            } else if (p == true) {
                console.log("Pleas entry another value");
            } else {
                i++;
                var jobID = i + 1;
                var jobNiche = this.value;
                var jobSelected = true;
                var jobCheck = true;
                var kaywords = [];
                job[i] = {
                    'jobID': jobID,
                    'jobNiche': jobNiche,
                    'jobSelected': jobSelected,
                    'jobCheck': jobCheck,
                    'kaywords': kaywords
                };
                $("#search-list").append('<li><input id="check' + i + '" type="checkbox" value="' + job[i].jobNiche + '" checked><label for="check' + i + '">' + job[i].jobNiche + '</label></li>');
                $(".views-list").append('<input id="ch' + i + '" type="checkbox" value="' + job[i].jobNiche + '"  checked><label for="ch' + i + '">' + job[i].jobNiche + '</label>');
            }
        });
    }

    $(".push-key").click(function () {
        addToKay();
        console.log(job);
    });

});
