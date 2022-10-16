(function($){

	// Below should match variables from _custom_fortive_variables.less
	var screenXs = 480,
	screenSm = 780,
	screenMd = 1250,
	screenLg = 1250;

	//get window width
	var doc_width = $(window).width();

	Drupal.behaviors.buttons = {
		attach: function (context, settings) {
			$("button.button").each(function() {
				var button_value = $(this).val();
				//case can be here to add font awesome icons
				if(button_value == "Search"){
					$(this).html('<i class="fa fa-search" aria-hidden="true"></i>');
				}else{
					$(this).html(button_value);
				}
			});
		}
	};


	$(document).ready(function() {

		//suppliers page
		$('select[name="download-file"]').selectpicker({
			style: 'btn-success',
			size: 4
		});
		//Set download file select box in case it exists
		$('select[name="download-file"]').each(function() {
			var $this=$(this);
			$this.change(function () {
				window.location.href=$(this).val();
			});
		});

		//get rid of your tube video when modal closes
		$("#myModal").on('hidden.bs.modal', function (e) {
			$("#myModal iframe").attr("src", $("#myModal iframe").attr("src"));
		});

		$(".navbar-toggle").on("click", function(){
			$(this).toggleClass('active');
		});

		//desktop front page news slider equal divs
		//http://stackoverflow.com/a/11688395
		$('#news-block-carousel-desktop .carousel-inner .item').each(function(){
			var highestBox = 0;
			$(this).find('article').each(function(){
				if($(this).height() > highestBox){
					highestBox = $(this).height();
				}
			})
			$(this).find('article').height(highestBox);
		});

		//use this custom Jquery Resize because Enquire does not work with the custom JS below
		$(window).resize(function() {
			// This will fire each time the window is resized:
			if($(window).width() >= 1250) {
				// if larger or equal
				$(".dropdown").hover(function () {
					$(this).addClass('open');
				}, function () {
					$(this).removeClass('open');
				});
			} else {
				//mobile off canvas tap, mouse events
				$('.dropdown').bind('touchstart', function(){
					//when this start close all the open <uL> dropdowns and remove active classes in case they are open from this touchstart
					$(".dropdown").removeClass('open');
					//-------------
					//add dropdown menus accordian functionality
					$(this).addClass('open');
					//----------------------------------------------------------
					//this is for the main parent menu item not sub items
					//anchor binding to take out click and the 300 millisecond default for stupid mobile events.
					$('> a', this).bind('click', function(e){
						e.preventDefault();
					});
					//set timer variables to create our redirect after 3 seconds.
					//if the user does not hold for the 3 seconds it will not redirect.
					var timeout_main;
					var longtouch_main;
					//take out touchstart click - wierd mobile 300 millisecond stuff
					$('> a', this).bind('touchstart', function(e){
						e.preventDefault();
						//set timer back to 250 seconds
						//http://www.w3schools.com/jsref/met_win_settimeout.asp
						timeout_main = setTimeout(function() {
							longtouch_main = true;
						}, 250);
					});
					//take out touchend click - wierd mobile 300 millisecond stuff
					$('> a', this).bind('touchend', function(e){
						e.preventDefault();
						//if timer was enabled and long touch
						if(longtouch_main) {
							//go to url of link
							var href = $(this).attr( "href" );
							if(href.indexOf( "#" ) !== 0){
								window.location.href = href;
							}
						}
						longtouch_main = false;
						clearTimeout(timeout_main);
					});
					//end of main parent item 300 second custom event fun
					//---------------------------------------------------

					//----------------------------------------------------------
					//this is for the sub menu items
					//anchor binding to take out click and the 300 miliseconds default for stupid mobile events.
					$('> .dropdown-menu > li > a', this).bind('click', function(e){
						e.preventDefault();
					});
					//set timer variables to create our redirect after 3 seconds.
					//if the user does not hold for the .8 seconds it will not redirect.
					var timeout_sub;
					var longtouch_sub;
					//take out touchstart click - wierd mobile 80 millisecond stuff
					$('> .dropdown-menu > li > a', this).bind('touchstart', function(e){
						e.preventDefault();
						//set timer back to 80 millsecond
						//http://www.w3schools.com/jsref/met_win_settimeout.asp
						timeout_sub = setTimeout(function() {
							longtouch_sub = true;
						}, 80);
					});
					//take out touchend click - wierd mobile 300 millisecond stuff
					$('> .dropdown-menu > li > a', this).bind('touchend', function(e){
						e.preventDefault();
						//if timer was enabled and long touch
						if(longtouch_sub) {
							//go to url of link
							var href = $(this).attr( "href" );
							if(href.indexOf( "#" ) !== 0){
								window.location.href = href;
							}
						}
						longtouch_sub = false;
						clearTimeout(timeout_sub);
					});
					//end of sub menu items 300 second custom event fun
					//---------------------------------------------------
				});
			}
			//fire the Hero Image - H1 fix on resize
			hero_h1_height(); //function below
			//front page text
			front_slide_text_center();
			//business segment block equal height
			business_segment_body_equal();

		}).resize(); // This will simulate a resize to trigger the initial run.


		//front page blocks fixes
		$(".region-front-upper-content article").hover(function(){
			//$(this).find('img').css('opacity', 0.7);
			$('img', this).addClass("hover-opacity");
			$('h3 a', this).addClass("hover-opacity");
			$('p', this).addClass("hover-opacity");
		}, function(){
			//$(this).find('img').css('opacity', 1);
			$('img', this).removeClass("hover-opacity");
			$('h3 a', this).removeClass("hover-opacity");
			$('p', this).removeClass("hover-opacity");
		});

		$("#block-views-block-news-block-1 img").wrap($("<a/>").attr("href", $("#block-views-block-news-block-1 h3 a").attr('href')));

		//stop slideshow when modal is active
		$('#myModal').on('show.bs.modal', function () {
			$('#carousel-front-slide').carousel('pause')
		})
		//start slideshow when modal is hidden
		$('#myModal').on('hidden' +
			'.bs.modal', function () {
			$('#carousel-front-slide').carousel('cycle')
		})
		//--------------------------------------------------------------------

		//directory accordion fun---------------------------------------------
		//directory-accordion-row moves the links to the header
		$( "#business-accordion .directory-accordion-row" ).each(function() {
			$('.company-header', this).append( $('.company-content .views-field-title', this) );
			$('.company-header', this).append( $('.company-content .views-field-field-platform', this) );
			$('.company-header', this).append( $('.company-content .views-field-field-sector', this) );
		});
		$( "#leadership-accordion-1 .leadership-accordion-1-row" ).each(function() {
			$('.leadership-header-1', this).append( $('.leadership-content-1 .views-field-title', this) );
			//$('.leadership-header-1', this).append( $('.leadership-content-1 .views-field-field-position', this) );
		});
		$( "#leadership-accordion-2 .leadership-accordion-2-row" ).each(function() {
			$('.leadership-header-2', this).append( $('.leadership-content-2 .views-field-title', this) );
			//$('.leadership-header-2', this).append( $('.leadership-content-2 .views-field-field-position', this) );
		});
		$('.directory-accordion-row, .leadership-accordion-1-row, .leadership-accordion-2-row').on('show.bs.collapse', function () {
			$(this).addClass('accordion-open');
		});
		$('.directory-accordion-row, .leadership-accordion-1-row, .leadership-accordion-2-row').on('hidden.bs.collapse', function () {
			$(this).removeClass('accordion-open');
		});

		//change option default text
		$('.view-business-directory-page #edit-eref-node-titles option:contains("- Any -")').text('All Segments');
		//submit exposed filter on select change
		$('.view-business-directory-page select').change(function(){
			$('form').submit();
		});

		$('.view-business-directory-page select').selectpicker({
			style: 'btn-success',
			size: 4
		});

		//http://stackoverflow.com/a/29195062
		$('.directory-accordion-row').on('shown.bs.collapse', function (e) {
			var offset = $(this).find('.collapse.in').prev('.company-header');
			if(offset) {
				$('html,body').animate({scrollTop: $(offset).offset().top -30}, 500);
			}
		});
		$('.leadership-accordion-1-row').on('shown.bs.collapse', function (e) {
			var offset = $(this).find('.collapse.in').prev('.leadership-header-1');
			if(offset) {
				$('html,body').animate({scrollTop: $(offset).offset().top -30}, 500);
			}
		});
		$('.leadership-accordion-2-row').on('shown.bs.collapse', function (e) {
			var offset = $(this).find('.collapse.in').prev('.leadership-header-2');
			if(offset) {
				$('html,body').animate({scrollTop: $(offset).offset().top -30}, 500);
			}
		});

		//Responsive Fixes for MD Desktop-----------------------------------------------------------
		enquire.register('screen and (min-width:' + screenMd + 'px)', {
			match: function () {
				//desktop menu dropdown centering
				$('#block-danaher-bootstrap-main-menu .navbar-nav .dropdown').each(function() {
					var dropdown_ul_width = $(this).width();
					var dropdown_sub_width = $('.dropdown-menu', this).width();
					//main dropdown is longer then the sub
					if(dropdown_ul_width > dropdown_sub_width){
						//we need to make the sub nav the same width as the main menu
						$('.dropdown-menu', this).width(dropdown_ul_width);
					}else{
						//if sub is longer then the main
						var sub_drop_diff = dropdown_sub_width - dropdown_ul_width;
						//divide by 1/2 and rnd
						sub_drop_diff =  Math.floor(sub_drop_diff / 2);
						//move the sub dropdown left by a negative
						var css_left = "-" + sub_drop_diff + "px";
						$($('.dropdown-menu', this)).css('left', css_left);
					}
				});
				//this is a Main Menu fix if the Window width is 1250 - 1290.
				if(doc_width < 1290){
					var menu_last_li_width = $("#block-danaher-bootstrap-main-menu .navbar-nav > li:last-child").width();
					var menu_last_dropdown_sub_width = $('#block-danaher-bootstrap-main-menu .navbar-nav > li:last-child .dropdown-menu').width();
					//main dropdown is longer then the sub
					if(menu_last_li_width < menu_last_dropdown_sub_width){
						//if sub is longer then the main
						var menu_last_sub_drop_diff = menu_last_dropdown_sub_width - menu_last_li_width;
						//subtract 15px for the gutter
						menu_last_sub_drop_diff = menu_last_sub_drop_diff - 15;
						//move the sub dropdown left by a negative
						var css_left = "-" + menu_last_sub_drop_diff + "px";
						$("#block-danaher-bootstrap-main-menu .navbar-nav > li:last-child .dropdown-menu").css('left', css_left);
					}
				}
				//-----------------------------------------------------

			},
			unmatch: function () {
				//move leader position back to original position
				$( "#leadership-accordion-1 .leadership-accordion-1-row" ).each(function() {
					$('.leadership-content-1', this).prepend( $('.leadership-header-1 .views-field-field-position', this) );
				});
				$( "#leadership-accordion-2 .leadership-accordion-2-row" ).each(function() {
					$('.leadership-content-2', this).prepend( $('.leadership-header-2 .views-field-field-position', this) );
				});
				//business page blocks back to auto heights
				$('.block-type-segment-feature .our-businesses .our-businesses-inner .our-businesses-inner-col').css('min-height','20px');
			}
		});
		//-----------------------------------------------------------------------------------------
	});

	//Responsive Fixes for MD Desktop-----------------------------------------------------------
	enquire.register('screen and (min-width:' + screenSm + 'px)', {
		match: function () {

		},
		unmatch: function () {

		}
	});
	//-----------------------------------------------------------------------------------------


	//--------------------------------------------------------------------
	$(window).load(function() {
		hero_h1_height();

		//need to fire 1st
		front_slide_text_center();

		//business segment block equal height
		business_segment_body_equal();
	});
	//-------------------------------------------------------------------

	$('#carousel-front-slide').on('slid.bs.carousel', function () {
		//fire on slide
		front_slide_text_center();
	})

	//hero h1 resize function
	function hero_h1_height() {
		//larger then tablet
		var doc_width_hero = $(window).width();
		if(doc_width_hero > 780){
			//Hero and H1 intro equal height blocks and center Divs
			var page_hero_height = $(".page-hero .field--name-field-hero-image, .page-hero .carousel-inner .item, .page-hero .field--name-field-directory-image").height();
			var page_intro_text = $(".page-intro .page-intro-text").height();
			//subtract borders and padding
			//alert(page_hero_height);
			page_hero_height = page_hero_height - 60;
			//make sure there is a page hero image
			$(".page-intro .page-intro-inner").height(page_hero_height).css("padding", "0");
			//subtract page hero height from inner text for difference
			var page_intro_text_diff = page_hero_height - page_intro_text;
			//divide by 1/2 and rnd
			page_intro_text_diff = Math.floor(page_intro_text_diff / 2);
			page_intro_text_diff = page_intro_text_diff + "px";
			$(".page-intro .page-intro-text").css("margin-top", page_intro_text_diff);
		}else {
			//revert padding to normal on h1 and intro
			$(".page-intro .page-intro-inner").css("height", "auto").css("padding", "38px 0");
			$(".page-intro .page-intro-text").css("margin-top", "0");
		}
	}
	//-----------------------------------------------------

	//front page slideshow text center
	function front_slide_text_center() {
		//larger then tablet
		var doc_width = $(window).width();
		if(doc_width > 1240){
			//var carousel_content = $(this).height();
			var carousel_inner_content = $("#carousel-front-slide .active article .inner-slide-content").height();
			//subtract carousel content from article height minus padding
			var height_diff = 236 - carousel_inner_content;
			//divide by 1/2 and rnd
			height_diff = Math.floor(height_diff/ 2);
			height_diff = height_diff + "px";
			$("#carousel-front-slide .active article .inner-slide-content").css("margin-top", height_diff);
		}
	}
	//-----------------------------------------------------

	//business segment blocks body equal heights
	function business_segment_body_equal() {
		//larger then tablet
		var doc_width = $(window).width();
		if(doc_width > 1240){
			// Select and loop the container element of the elements you want to equalise
			$('#block-views-block-business-segments-block-1').each(function(){
				// Cache the highest
				var highestBox = 0;
				// Select and loop the elements you want to equalise
				$('.page-body', this).each(function(){
					// If this box is higher than the cached highest then store it
					if($(this).height() > highestBox) {
						highestBox = $(this).height();
					}
				});
				// Set the height of all those children to whichever was highest
				$('.page-body',this).height(highestBox);
			});
		}else{
			$("#block-views-block-business-segments-block-1 .page-body").css("height", "auto");
		}
	}
	//-----------------------------------------------------

})(jQuery);



