/*
 * Created by Ryougi(りょうぎ) on Dec. 31, 2015
 * First edited by Ryougi(りょうぎ) on Dec. 31, 2015
 * Corresponding author: Ryougi
 * Email: xiaoyixiaoyi1009@gmail.com
 * 
 */

// Get object code
	var Ryougi_slider_container = $('.Ryougi_slider_container');
	var Ryougi_slider = $('.Ryougi_slider');
	var Ryougi_slider_item = $('.Ryougi_slider_item');
	var iconQueryNodelist = $("#Ryougi_slider_bar > li");
	var iconNodelist = document.querySelectorAll("#Ryougi_slider_bar > li");

	var windowX = $(window).width();

// Box height control code
	Ryougi_slider_item.height(Ryougi_slider_item.width() * 0.4375);


//Animate definition code
	(function () {
	    "use strict"

	    //Window resize event
		$(window).resize(function () {
			Ryougi_slider_item.height($(window).width() * 0.4375);
		});

        //Change slider by icon in bottom
	    iconNodelist[0].addEventListener("mouseover", function () {
	        console.log("0");
	        Ryougi_slider.css("margin-left", "0%");
	        iconQueryNodelist.removeClass("on");
	        iconNodelist[0].className += "on";
	    });
	    iconNodelist[1].addEventListener("mouseover", function () {
	        console.log("1");
	        Ryougi_slider.css("margin-left", "-100%");
	        iconQueryNodelist.removeClass("on");
	        iconNodelist[1].className += "on";
	    });
	    iconNodelist[2].addEventListener("mouseover", function () {
	        console.log("2");
	        Ryougi_slider.css("margin-left", "-200%");
	        iconQueryNodelist.removeClass("on");
	        iconNodelist[2].className += "on";
	    });
	    iconNodelist[3].addEventListener("mouseover", function () {
	        console.log("3");
	        Ryougi_slider.css("margin-left", "-300%");
	        iconQueryNodelist.removeClass("on");
	        iconNodelist[3].className += "on";
	    });
	    iconNodelist[4].addEventListener("mouseover", function () {
	        console.log("4");
	        Ryougi_slider.css("margin-left", "-400%");
	        iconQueryNodelist.removeClass("on");
	        iconNodelist[4].className += "on";
	    });
	    iconNodelist[5].addEventListener("mouseover", function () {
	        console.log("5");
	        Ryougi_slider.css("margin-left", "-500%");
	        iconQueryNodelist.removeClass("on");
	        iconNodelist[5].className += "on";
	    });
	    iconNodelist[6].addEventListener("mouseover", function () {
	        console.log("6");
	        Ryougi_slider.css("margin-left", "-600%");
	        iconQueryNodelist.removeClass("on");
	        iconNodelist[6].className += "on";
	    });

        //Change slider auto with 4000ms deday
	    setInterval(function () {

		    var curMargin = parseFloat(Ryougi_slider.css("margin-left"));
		    var curIndex = curMargin / windowX;

		        switch (curIndex) {
		            case 0:
		                setTimeout((function() {
		                	return function() {
		                		Ryougi_slider.css("margin-left", "-100%");
		                		iconNodelist[0].className = "";
		                		iconNodelist[1].className += "on";
		                	}})(), 0);
		                console.log(curIndex);
		                break;
		            case -1:
		                setTimeout((function() {
		                	return function() {
		                	    Ryougi_slider.css("margin-left", "-200%");
		                	    iconNodelist[1].className = "";
		                	    iconNodelist[2].className += "on";
		                	}})(), 0);
		                console.log(curIndex);
		                break;
		            case -2:
		                setTimeout((function() {
		                	return function() {
		                	    Ryougi_slider.css("margin-left", "-300%");
		                	    iconNodelist[2].className = "";
		                	    iconNodelist[3].className += "on";
		                	}})(), 0);
		                console.log(curIndex);
		                break;
		            case -3:
		                setTimeout((function() {
		                	return function() {
		                	    Ryougi_slider.css("margin-left", "-400%");
		                	    iconNodelist[3].className = "";
		                	    iconNodelist[4].className += "on";
		                	}})(), 0);
		                console.log(curIndex);
		                break;
		            case -4:
		                setTimeout((function() {
		                	return function() {
		                	    Ryougi_slider.css("margin-left", "-500%");
		                	    iconNodelist[4].className = "";
		                	    iconNodelist[5].className += "on";
		                	}})(), 0);
		                console.log(curIndex);
		                break;
		            case -5:
		                setTimeout((function() {
		                	return function() {
		                	    Ryougi_slider.css("margin-left", "-600%");
		                	    iconNodelist[5].className = "";
		                	    iconNodelist[6].className += "on";
		                	}})(), 0);
		                console.log(curIndex);
		                break;
		            case -6:
		                setTimeout((function() {
		                	return function() {
		                	    Ryougi_slider.css("margin-left", "0%");
		                	    iconNodelist[6].className = "";
		                	    iconNodelist[0].className += "on";
		                	}})(), 0);
		                console.log(curIndex);
		                break;
		    }
		} , 4000);
	})();