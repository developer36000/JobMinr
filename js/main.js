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


function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerText;
            console.log(html);
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;

}

/* Read  json file  */
$.getJSON('db.json', function (data) {
    var job = data.job;

    $(document).ready(addToSearchList());


    $.each(job, function (k) {
        $("#check" + k).change(function () {
            if (this.checked) {
                job[k].jobSelected = true;
                addToViewList();
                CheckList();
                addKeyTabMenu();
                addKeyTabContent();

            } else {
                job[k].jobSelected = false;
                job[k].jobCheck = false;
                addToViewList();
                CheckList();
                addKeyTabMenu();
                addKeyTabContent();
                console.log(job);
            }
        });
    });

    function checkSelect() {
        $.each(job, function (k) {
            $("#check" + k).change(function () {
                if (this.checked) {
                    job[k].jobSelected = true;
                    addToViewList();
                    CheckList();
                    addKeyTabMenu();
                    addKeyTabContent();

                } else {
                    job[k].jobSelected = false;
                    job[k].jobCheck = false;
                    addToViewList();
                    CheckList();
                    addKeyTabMenu();
                    addKeyTabContent();
                    console.log(job);
                }
            });
        });
        addToViewList();
        CheckList();
        addKeyTabMenu();
        addKeyTabContent();
    }

    function addToSearchList() {
        $("#search-list").html("");
        for (var i in job) {
            var selectOption = job[i].jobSelected;
            if (selectOption == false) {
                $("#search-list").append('<li><input id="check' + i + '" type="checkbox" value="' + job[i].jobNiche + '"><label for="check' + i + '">' + job[i].jobNiche + '</label></li>');
            } else {
                $("#search-list").append('<li><input id="check' + i + '" type="checkbox" value="' + job[i].jobNiche + '" checked><label for="check' + i + '">' + job[i].jobNiche + '</label></li>');
            }
        }
    }

    /*update view list */
    function addToViewList() {
        $(".views-list").html("");
        for (var t  in  job) {
            if (job[t].jobSelected == true) {
                $(".views-list").append('<input id="ch' + t + '" type="checkbox" value="' + job[t].jobNiche + '"  checked><label for="ch' + t + '">' + job[t].jobNiche + '</label>');
                job[t].jobCheck = true;
            }
        }
    }

    /*update tab menu */
    function addKeyTabMenu() {
        $("#keyword-list").html("");
        for (var t  in  job) {
            if (job[t].jobCheck == true) {
                $("#keyword-list").append('<li><a data-toggle="tab" href="#home' + t + '">' + job[t].jobNiche + '</li>');
            }
        }
    }


    /*update tab content */
    function addKeyTabContent() {
        addKeyTabMenu();

        var jobKey = [];
        $(".tab-content ").html("");
        for (var t  in  job) {
            if (job[t].jobCheck == true) {
                jobKey = job[t].kaywords;

                $(".tab-content").append('<div id="home' + t + '" class="tab-pane  fade in "><ul></ul></div>');
                for (var m in jobKey) {
                    $("#home" + t + ' ul').append('<li class="li-' + m + '">- <span>' + jobKey[m].keyText + '</span><button class="editKey"><i class="fa fa-edit"></i></button><button class="saveKey"><i class="fa fa-floppy-o" aria-hidden="true"></i></button><button class="removeKey" ><i' +
                        ' class="fa fa-times"></i></button></li>');
                    var instance = new Mark(document.querySelector("div.job-description"));
                    instance.mark(jobKey[m].keyText, {
                        "element": "span",
                        "className": "select-key",
                        accuracy: "exactly",
                        separateWordSearch: true,
                    });
                }
            }
        }
        $('#keyword-list li:first a').tab('show');

    }


    /*checked error  value  input niche */
    function addToJson() {
        var a = $("form.niche").serializeArray();
        /*checked error  value  input niche */
        var p = [];
        $.each(a, function () {
            for (var i = 0; i < job.length; i++) {
                if (job[i].jobNiche == this.value) {
                    p = true;
                    console.log(p);
                }
            }
        });
        $.each(a, function () {
            if (this.value == '') {
                console.log("Pleas entry value");
                alert("Pleas entry value")
            } else if (p == true) {
                console.log("Pleas entry another value");
                alert("Pleas entry another value");
            } else {
                var jobID = job.length + 1;
                var jobNiche = this.value;
                var jobSelected = true;
                var jobCheck = true;
                var kaywords = [];
                mas = {
                    'jobID': jobID,
                    'jobNiche': jobNiche,
                    'jobSelected': jobSelected,
                    'jobCheck': jobCheck,
                    'kaywords': kaywords
                };
                job.push(mas);
                addToSearchList();
                checkSelect();
            }
        });
        console.log(job);
    }


    /*------------------------------------------------------*/

    function addToKay() {
        var a = $("form.keywoard").serializeArray();
        var y = [];
        $.each(a, function () {
            for (var i = 0; i < job.length; i++) {
                if (job[i].jobCheck == true) {
                    var key = job[i].kaywords;
                    for (var j = 0; j < key.length; j++) {
                        if (key[j].keyText == this.value) {
                            y = true;
                            console.log(y);
                        }
                    }
                }
            }
        });
	   
        $.each(a, function () {
            if (this.value == '') {
                console.log("Pleas entry value");
                alert("Pleas entry value")
            } else if (y == true) {
                console.log("Pleas entry another value");
                alert("Pleas entry another value");
            } else {
                var jobKey = [];
                for (var i = 0; i < job.length; i++) {
                    if (job[i].jobCheck == true) {
                        jobKey = job[i].kaywords;
                        console.log(job.length);
                        var p = {
                            keyID: jobKey.length + 1,
                            keyText: this.value
                        };
                        jobKey.push(p);
                    }
                }
                addKeyTabContent();
            }
          //  console.log(job);
        });
    }

    function CheckList() {
        $.each(job, function (k) {
            $("#ch" + k).change(function () {
                if (this.checked) {
                    job[k].jobCheck = true;
                    console.log(job);
                    addKeyTabMenu();
                    addKeyTabContent();

                }
                else {
                    job[k].jobCheck = false;
                    console.log(job);
                    addKeyTabMenu();
                    addKeyTabContent();

                }
            });
        });
    }
    
    function removeFromKey(btn) {
	    var _this = btn,
		    _parent = _this.parent('li'),
            active_niche = _this.parents('.keyw').find('#keyword-list li.active a').text(),
            keyword = _parent.find('span').text();
	    for (var i = 0; i < job.length; i++) {
		    if ( job[i].jobCheck == true && job[i].jobNiche == active_niche ) {
			    var key = job[i].kaywords;
			    for (var j = 0; j < key.length; j++) {
				    if (key[j].keyText == keyword) {
					    key.splice(j);
					    _parent.remove();
					    console.log(key);
				    }
			    }
		    }
	    }
    }
    function editKey(btn) {
	    var _this = btn,
		    _parent = _this.parent('li'),
		    active_niche = _this.parents('.keyw').find('#keyword-list li.active a').text(),
		    keyword = _parent.find('span').text();
	    for (var i = 0; i < job.length; i++) {
		    if ( job[i].jobCheck == true && job[i].jobNiche == active_niche ) {
			    var key = job[i].kaywords;
			    for (var j = 0; j < key.length; j++) {
				    if (key[j].keyText == keyword) {
					    //key.splice(j);
					    _this.fadeOut();
					    _parent.find('.saveKey').fadeIn();
					    _parent.find('span').hide();
					    _parent.append('<input type="text" class="key-input" value="'+ keyword +'">').fadeIn();
					    console.log(key);
				    }
			    }
		    }
	    }
    }
	
	function saveKey(btn) {
		var _this = btn,
			_parent = _this.parent('li'),
			active_niche = _this.parents('.keyw').find('#keyword-list li.active a').text(),
			keyword = _parent.find('span').text(),
            input = _parent.find('.key-input');
		for (var i = 0; i < job.length; i++) {
			if ( job[i].jobCheck == true && job[i].jobNiche == active_niche ) {
				var key = job[i].kaywords;
				for (var j = 0; j < key.length; j++) {
					if (key[j].keyText == keyword) {
						_this.hide();
						_parent.find('.editKey').show();
						input.hide();
						_parent.find('span').text(input.val()).fadeIn();
						key[j].keyText = input.val();
						console.log(key);
					}
				}
			}
		}
	}
    
    /*------------------------------------------------------*/
    
    /* create  new niche*/
    $(".push-value").click(function () {
        addToJson();
        $(this).prev('#name').val(''); // input#name
	    console.log('job array');
        console.log(job);
        
    });

    document.getElementById('description').addEventListener("mouseup", function () {
        var slection = getSelectionHtml();
        if (slection == '') {
        } else {
            $('#key').val(slection);
            addToKay();
            $('#key').val('');
        }
    });
    $(".push-key").click(function () {
        addToKay();
	    $(this).prev('#key').val(''); // input#key
    });
    
    //remove keywords
	
	$(document).on('click', '.removeKey', function (e) {
		removeFromKey($(this));
	});
	$(document).on('click', '.editKey', function (e) {
		editKey($(this));
	});
	$(document).on('click', '.saveKey', function (e) {
		saveKey($(this));
	});

});




