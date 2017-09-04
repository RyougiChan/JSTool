/*
 * Created by Ryougi(りょうぎ) on 2015/12/31
 * First edited by Ryougi(りょうぎ) on 2015/12/31
 * Corresponding author: Ryougi
 * Email: xiaoyixiaoyi1009@gmail.com
 * 
 * Edited by Ryougi(りょうぎ) on 2016/01/09
 */

// Get object code
	var Ryougi_slider_container = document.getElementById("Ryougi_slider_container");
	var Ryougi_slider = document.getElementById("Ryougi_slider");
	var Ryougi_slider_blank = document.getElementById("Ryougi_slider_blank");
	var Ryougi_slider_item = document.getElementsByClassName("Ryougi_slider_item");
	var iconQueryNodelist = document.querySelectorAll("#Ryougi_slider_bar > li");
	var iconNodelist = document.querySelectorAll("#Ryougi_slider_bar > li");
	var windowX = document.body.clientWidth;

// Box height control code
	for (var i = Ryougi_slider_item.length - 1; i >= 0; i--) {
		Ryougi_slider_item[i].style.height = (windowX * 0.4375).toString() + "px";
	};
	Ryougi_slider_container.style.height = (windowX * 0.4375).toString() + "px";


//Animate definition code
	(function () {
	    "use strict"

	    //Window resize event
		var addEvent = function(object, type, callback) {
		    if (object == null || typeof(object) == 'undefined') return;
		    if (object.addEventListener) {
		        object.addEventListener(type, callback, false);
		    } else if (object.attachEvent) {
		        object.attachEvent("on" + type, callback);
		    } else {
		        object["on"+type] = callback;
		    }
		};

		//Calling the window resize event
		addEvent(window, "resize", function (event) {
				for (var i = Ryougi_slider_item.length - 1; i >= 0; i--) {
					 Ryougi_slider_item[i].style.height = (document.body.clientWidth * 0.4375).toString() + "px";
					 Ryougi_slider_container.style.height = (document.body.clientWidth * 0.4375).toString() + "px";
				}
		});

		Ryougi_slider_blank.style.marginLeft = "0%";
	    //Change slider by icon in bottom
	    var changeOpacity = function (index) {
	    	iconNodelist[index].addEventListener("mouseover", function () {
		        Ryougi_slider_blank.style.marginLeft = (-index).toString() + "00%";
		        for (var i = iconNodelist.length - 1; i >= 0; i--) {
		        	iconNodelist[i].className = "";
	                Ryougi_slider_item[i].style.opacity = "0";
		        };
		        Ryougi_slider_item[index].style.opacity = "1";
		        iconNodelist[index].className += "on";
		    });
	    }
	    for(var j = 0; j <= 6; j++) {
	    	changeOpacity(j);
	    }

        //Change slider auto with 4000ms deday
	    setInterval(function () {
	        var curMargin = parseFloat(Ryougi_slider_blank.style.marginLeft);
		    var curIndex = curMargin / 100;
		    var ChangeSliderAuto = (function() {
		    return function() {
		        Ryougi_slider_blank.style.marginLeft = (curIndex * 100 - 100).toString() + "%";
		        iconNodelist[-curIndex].className = "";
		        iconNodelist[1 - curIndex].className += "on";
		        for (var i = iconNodelist.length - 1; i >= 0; i--) {
		            Ryougi_slider_item[i].style.opacity = "0";
		        };
		        Ryougi_slider_item[1 - curIndex].style.opacity = "1";
			}})()
	        switch (curIndex) {
	            case  0:setTimeout(ChangeSliderAuto(), 0);break;
	            case -1:setTimeout(ChangeSliderAuto(), 0);break;
	            case -2:setTimeout(ChangeSliderAuto(), 0);break;
	            case -3:setTimeout(ChangeSliderAuto(), 0);break;
	            case -4:setTimeout(ChangeSliderAuto(), 0);break;
	            case -5:setTimeout(ChangeSliderAuto(), 0);break;
	            case -6:
	                setTimeout((function() {
	                    return function () {
	                        Ryougi_slider_blank.style.marginLeft = "0%";
	                	    iconNodelist[6].className = "";
	                	    iconNodelist[0].className += "on";
	                	    for (var i = iconNodelist.length - 1; i >= 0; i--) {
	                	        Ryougi_slider_item[i].style.opacity = "0";
	                	    };
	                	    Ryougi_slider_item[0].style.opacity = "1";
	                	}})(), 0);
	                break;
		    }
		} , 4000);
	})();