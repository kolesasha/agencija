$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navb').addClass("sticky");
        }else{
            $('.navb').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navb .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navb .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Letovanje", "Zimovanja", "Ekskurzije", "Vikendi"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Letovanje", "Zimovanja", "Ekskurzije", "Vikendi"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

//galery
(function($)
{
	"use strict";
	
	
	jQuery(window).on('load', function() {
		preloader();
		
		
		if(jQuery('.gallery-outer .gallery-items').length > 0){
			jQuery('.gallery-outer .gallery-items').filterizr();
		}
		jQuery('#filter-list li').on("click", function(){
			jQuery('#filter-list li').removeClass('active');
			jQuery(this).addClass('active');
		});
	});
	
	
	
	
	function preloader(){
		jQuery(".preloaderimg").fadeOut();
		jQuery(".preloader").delay(200).fadeOut("slow").delay(200, function(){
			jQuery(this).remove();
		});
	}
	
	
	
})(jQuery);	
