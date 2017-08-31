/*
 * Created by Ryougi(りょうぎ) on Dec. 31, 2015
 * First edited by Ryougi(りょうぎ) on Dec. 31, 2015
 * Corresponding author: Ryougi
 * Email: xiaoyixiaoyi1009@gmail.com
 * 
 */

// Get object code
	var Ryougi_slider_container = document.getElementsByClassName("Ryougi_slider_container");
	var Ryougi_slider = document.getElementById("Ryougi_slider");
	var Ryougi_slider_item = document.getElementsByClassName("Ryougi_slider_item");
	var iconQueryNodelist = document.querySelectorAll("#Ryougi_slider_bar > li");
	var iconNodelist = document.querySelectorAll("#Ryougi_slider_bar > li");

	var windowX = document.body.clientWidth;

// Box height control code
	for (var i = Ryougi_slider_item.length - 1; i >= 0; i--) {
		Ryougi_slider_item[i].style.height = (windowX * 0.4375).toString() + "px";
	};

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
				}
		});

		Ryougi_slider.style.marginLeft = "0%";

        //Change slider by icon in bottom
	    var changeLocation = function (index, marginLeft) {
	        iconNodelist[index].addEventListener("mouseover", function () {
	            Ryougi_slider.style.marginLeft = marginLeft;
	            for (var i = iconNodelist.length - 1; i >= 0; i--) {
	                iconNodelist[i].className = "";
	            };
	            iconNodelist[index].className += "on";
	        });
	    }

	    for (var j = 0; j <= 6; j++) {
	        changeLocation(j, (-j).toString() + "00%");
	    };

	    

        //Change slider auto with 4000ms deday
	    setInterval(function () {

		    var curMargin = parseFloat(Ryougi_slider.style.marginLeft);
		    
		    var curIndex = curMargin / 100;
		    var ChangeSliderAuto = (function() {
		    return function() {
		        Ryougi_slider.style.marginLeft = (curIndex * 100 - 100).toString() + "%" ; 
		        iconNodelist[-curIndex].className = "";
		        iconNodelist[1-curIndex].className += "on";
			}})()
		    switch (curIndex) {
	            case 0:
	                ChangeSliderAuto();
	                break;
	            case -1:
	                ChangeSliderAuto();
	                break;
	            case -2:
	                ChangeSliderAuto();
	                break;
	            case -3:
	                ChangeSliderAuto();
	                break;
	            case -4:
	                ChangeSliderAuto();
	                break;
	            case -5:
	                ChangeSliderAuto();
	                break;
	            case -6:
	                setTimeout((function() {
	                	return function() {
	                	    Ryougi_slider.style.marginLeft = "0%"; 
	                	    iconNodelist[6].className = "";
	                	    iconNodelist[0].className += "on";
	                	}})(), 0);
                	break;
		    }

		} , 4000);
	})();