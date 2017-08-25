//Yuko.js

(function (win) {
    "use strict";

    var global = win;

    if (!global.Yuko) {
        global.Yuko = global.Yuko = global.yuko = Object();
    }

    Yuko.polyfill = (function () {
        // String.prototype.endsWith polyfill
        /*! http://mths.be/endswith v0.2.0 by @mathias */
        if (!String.prototype.endsWith) {
            (function () {
                'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
                var defineProperty = (function () {
                    // IE 8 only supports `Object.defineProperty` on DOM elements
                    try {
                        var object = {};
                        var $defineProperty = Object.defineProperty;
                        var result = $defineProperty(object, object, object) && $defineProperty;
                    } catch (error) { }
                    return result;
                }());
                var toString = {}.toString;
                var endsWith = function (search) {
                    if (this == null) {
                        throw TypeError();
                    }
                    var string = String(this);
                    if (search && toString.call(search) == '[object RegExp]') {
                        throw TypeError();
                    }
                    var stringLength = string.length;
                    var searchString = String(search);
                    var searchLength = searchString.length;
                    var pos = stringLength;
                    if (arguments.length > 1) {
                        var position = arguments[1];
                        if (position !== undefined) {
                            // `ToInteger`
                            pos = position ? Number(position) : 0;
                            if (pos != pos) { // better `isNaN`
                                pos = 0;
                            }
                        }
                    }
                    var end = Math.min(Math.max(pos, 0), stringLength);
                    var start = end - searchLength;
                    if (start < 0) {
                        return false;
                    }
                    var index = -1;
                    while (++index < searchLength) {
                        if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                            return false;
                        }
                    }
                    return true;
                };
                if (defineProperty) {
                    defineProperty(String.prototype, 'endsWith', {
                        'value': endsWith,
                        'configurable': true,
                        'writable': true
                    });
                } else {
                    String.prototype.endsWith = endsWith;
                }
            }());
        }
    })();

    Yuko.utility = (function () {
        /**
         * Calculation for cubic equation : y = a * x * x * x + b * x * x + c * x + d
         * @param {number} a Cubic equation parameter a
         * @param {number} b Cubic equation parameter b
         * @param {number} c Cubic equation parameter b
         * @param {number} d Cubic equation parameter d
         * @param {number} x Cubic equation variable x
         * @return {number} Return the calculated result when all parameters are given
         */
        function calcCubicEquation(a, b, c, d, x) {
            return a * x * x * x + b * x * x + c * x + d;
        };

        /**
         * Calculation for quadratic equation : y = a * x * x + b * x + c
         * @param {number} a Quadratic equation parameter a
         * @param {number} b Quadratic equation parameter b
         * @param {number} c Quadratic equation parameter c
         * @param {number} x Quadratic equation variable x
         * @return {number} Return the zero point of a quadratic equation in array (if x is not given).
         *                  Or return the value of y (if x is given).
         *                  Return undefined when the solutions of equations don't exist or when there are something wrong with parameters.
         */
        function calcQuadraticEquation(a, b, c, x) {
            return isNaN(a) ? undefined : a == 0 ? undefined : isNaN(b) ? [0, 0] : isNaN(c) ? [0, (-b / a)] : isNaN(x) ? (b * b - 4 * a * c) < 0 ? undefined : [((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)), (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)] : a * x * x + b * x + c;
        };

        /**
         * Elements must implement biggerThan() or greaterThan(), or otherwise can be compared via 'greater than' sign
         * @param {Array} array 
         * @param {number} value 
         * @return {number} Return the index of the first element that is greater than the given value in an array.
         *                  Return -1 if there exists no element greater than the given value.
         */
        function firstGreaterThan(array, value) {
            var length = array.length;
            if (array[0].biggerThan) {
                for (var i = 0; i < length; i++) {
                    if (array[i].biggerThan(value)) {
                        return i;
                    }
                }
                return -1;
            } else if (array[0].greaterThan) {
                for (var i = 0; i < length; i++) {
                    if (array[i].greaterThan(value)) {
                        return i;
                    }
                }
                return -1;
            } else {
                for (var i = 0; i < length; i++) {
                    if (array[i] > value) {
                        return i;
                    }
                }
                return -1;
            }
        };

        /**
         * Get CSS property of 'font-size' with window.document.body
         */
        var fontSizeInPx = getComputedSizeInPx(win.document.body, 'font-size');

        /**
         * Get computed size in px of an element.
         * @param {Element} ele An element with document or window or otherwise.
         * @param {string} type A CSS property that wanna to get.
         * @return {number} Return computed size in px of the element {@param ele}
         */
        function getComputedSizeInPx(ele, type) {
            window.getComputedStyle = window.getComputedStyle || (
                window.getComputedStyle = function (e, t) {
                    return this.el = e,
                        this.getPropertyValue = function (t) {
                            var n = /(\-([a-z]){1})/g;
                            return t == "float" && (t = "styleFloat"),
                                n.test(t) && (t = t.replace(n, function () {
                                    return arguments[2].toUpperCase()
                                })),
                                e.currentStyle[t] ? e.currentStyle[t] : null
                        }, this
                });

            if (ele instanceof Element)
                return parseInt((window.getComputedStyle(ele, null).getPropertyValue(type)), 10);
            return;
        };

        /**
         * Create a copy od obj
         * @param {{}} obj The object to make a copy
         * @returns return a copy of obj if it's really Object
         *          return obj itself if obj is null or it's not a Object
         */
        function cloneObject(obj) {
            var copy;

            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = cloneObject(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = cloneObject(obj[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        }

        /**
         * Set bounding rectangle for a element
         **      If rectArr is not a Array or rectArr's length is 0, do noting
         **      If rectArr's length is 1 and item in rectArr is not undefined, set only width
         **      If rectArr's length is 2 and item in rectArr is not undefined, set width and height
         **      If rectArr's length is 3 and item in rectArr is not undefined, set width, height and left
         **      Default: set width, height, left and top for target
         * @param {Element} target The element to set bounding rectangle
         * @param {[(undefined|string),(undefined|string),(undefined|string),(undefined|string)]} rectArr A <strong>number</strong> string array ([width?, height?, left?, top?]) represented the bound rectangle of target
         */
        function setBoundingRectangle(target, rectArr) {
            if (!target) return;
            if (!(rectArr instanceof Array) || rectArr.length === 0) return;
            if (rectArr.length > 4) rectArr = rectArr.slice(0, 3);
            switch (rectArr.length) {
                case 1:
                    if (rectArr[0]) target.style.width = rectArr[0].endsWith('%') ? rectArr[0] : rectArr[0] + 'px';
                    break;
                case 2:
                    if (rectArr[0]) target.style.width = rectArr[0].endsWith('%') ? rectArr[0] : rectArr[0] + 'px';
                    if (rectArr[1]) target.style.top = rectArr[1].endsWith('%') ? rectArr[1] : rectArr[1] + 'px';
                    break;
                case 3:
                    if (rectArr[0]) target.style.width = rectArr[0].endsWith('%') ? rectArr[0] : rectArr[0] + 'px';
                    if (rectArr[1]) target.style.height = rectArr[1].endsWith('%') ? rectArr[1] : rectArr[1] + 'px';
                    if (rectArr[2]) target.style.top = rectArr[2].endsWith('%') ? rectArr[2] : rectArr[2] + 'px';
                    break;
                default:
                    if (rectArr[0]) target.style.width = rectArr[0].endsWith('%') ? rectArr[0] : rectArr[0] + 'px';
                    if (rectArr[1]) target.style.height = rectArr[1].endsWith('%') ? rectArr[1] : rectArr[1] + 'px';
                    if (rectArr[2]) target.style.top = rectArr[2].endsWith('%') ? rectArr[2] : rectArr[2] + 'px';
                    if (rectArr[3]) target.style.left = rectArr[3].endsWith('%') ? rectArr[3] : rectArr[3] + 'px';
                    break;
            }
        }

        /**
         * A detection for CSS3 style property in current browser
         * @param {string} cssProp CSS3 style property in string
         * @returns return true if the browser support the css style property, return false otherowise
         */
        function isBroeserSupportProp(cssProp) {
            var root = document.documentElement;
            if (cssProp in root.style) {
                return true;
            }
            return false;
        }

        /**
         * Round a number to a specific scale
         * @param {number} number The number to be rounded
         * @param {number} scale The scale to round to
         * @return {number} Return the {@param number} rounded result
         */
        function roundTo(number, scale) {
            if (isNaN(scale)) {
                return;
            }
            var factor = Math.pow(10, Math.floor(scale));
            return Math.round(factor * number) / factor;
        }

        /**
         * Add a event listener for a element
         * @param {Element} target The element to attach listener
         * @param {string} type A string representing the event type to listen for
         * @param {*} listener The object which receives a notification. This must be an object implementing the EventListener interface, or a JavaScript function
         */
        function addEvent(target, type, listener) {
            if (target == null || typeof (target) == 'undefined') return;
            if (target.addEventListener) {
                target.addEventListener(type, listener, false);
            } else if (target.attachEvent) {
                target.attachEvent("on" + type, listener);
            } else {
                target["on" + type] = listener;
            }
        }

        return {
            calcCubicEquation: calcCubicEquation,
            calcQuadraticEquation: calcQuadraticEquation,
            firstGreaterThan: firstGreaterThan,
            fontSizeInPx: fontSizeInPx,
            getComputedSizeInPx: getComputedSizeInPx,
            setBoundingRectangle: setBoundingRectangle,
            roundTo: roundTo,
            addEvent: addEvent,
            cloneObject: cloneObject,
            isBroeserSupportProp: isBroeserSupportProp
        }
    })();

    // Default style for Yuko's layout
    Yuko.style = (function () {
        // Initial Yuko Fragment Style
        function initFragStyle() {
            // Document element
            var header = document.getElementsByTagName('header').item(0);
            var footer = document.getElementsByTagName('footer').item(0);
            var main = document.getElementsByTagName('main').item(0);
            var firstYukoContent = document.querySelectorAll('.yuko-content').item(0);
            // Element property
            var headerHeight = Yuko.utility.getComputedSizeInPx(header, 'height');
            var firstPageHeight = Yuko.utility.getComputedSizeInPx(firstYukoContent, 'height');

            // Default footer style
            footer.style.top = (firstPageHeight < document.body.clientHeight - headerHeight ? document.body.clientHeight - headerHeight : firstPageHeight + headerHeight).toString() + 'px';
            // Default main style
            main.style.height = (document.body.clientHeight - 112) + "px";
        }

        // Initial Carousel Style
        function initCarouselStyle() {
            // Carousel Container
            var carouselContainer = document.getElementById('yuko-carousel-container');
            // Carousel Parameter
            var carouselContainerHeight, carouselTitleHeight, carouselHeight;
            // If there should be a Caeousel
            if (carouselContainer) {
                var carouselTitle = document.getElementById('yuko-carousel-title');
                var carousel = document.getElementById('yuko-carousel');
                var carouselList = document.querySelectorAll('.yuko-carousel-item');

                carouselContainerHeight = Yuko.utility.getComputedSizeInPx(carouselContainer, 'height');
                carouselTitleHeight = Yuko.utility.getComputedSizeInPx(carouselTitle, 'height');
                carouselHeight = Yuko.utility.getComputedSizeInPx(carousel, 'height');

                if (carouselHeight !== carouselContainerHeight - carouselTitleHeight)
                    carousel.style.height = (carouselContainerHeight - carouselTitleHeight) + 'px';
            }
        }

        return {
            initFragStyle: initFragStyle,
            initCarouselStyle: initCarouselStyle
        }
    })();

    Yuko.event = (function () {

        /**
         * Bind page and drawer list item
         * @param {Element} drawer The drawer container
         * @param {Function} drawerContainer Yuko.widget.navigationDrawer(drawer, hamburger, options) function
         * @param {Function} pageContainer Yuko.widget.pageContainer(container, option, onPageContainerReady, onAnimationComplete) function
         */
        function bindDrawerNavItemToPage(drawer, drawerContainer, pageContainer) {
            var drawerList = document.querySelectorAll('#' + drawer.id + ' li');
            for (var i = 0; i < drawerList.length; i++) {
                drawerList[i].addEventListener('touchend', (function (i) {
                    return function () {
                        // Switch main page to show
                        pageContainer.slideTo(i);
                    }
                })(i));
            }
        }

        return {
            bindDrawerNavItemToPage: bindDrawerNavItemToPage
        }

    })();

    // Yuko's effect
    Yuko.effect = (function () {
        /**
         * Create a ripple effect
         * @param {Event} event The DOM Event which was triggered
         * @return {Boolean} Return true all the time
         */
        function rippleEffect(event) {
            var target = event.target;
            var rect = target.getBoundingClientRect();
            var ripple = target.querySelector('.ripple');
            if (!ripple) {
                ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                target.appendChild(ripple);
            }
            ripple.classList.remove('show');
            var top = event.changedTouches[0].pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
            var left = event.changedTouches[0].pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
            ripple.style.top = top + 'px';
            ripple.style.left = left + 'px';
            ripple.classList.add('show');
            return true;
        }

        return {
            rippleEffect: rippleEffect
        }
    })();

    // Yuko's widget
    Yuko.widget = (function () {
        /**
         * Make the drawer a touch sensitive android like navigation drawer
         * @param {Element} drawer The Element to be manipulated
         * @param {Element} hamburger A hamburger button to trigger the drawer
         * @param {{timespan : (number|undefined), mask : (Boolean|undefined), animationType : (string|undefined)}=} options
         *         timespan=: Time span of animation in milliseconds. Default: 300.
         *         mask=: Indicate whether there is a mask for drawer.
         *         animationType=: The functional relationship between time and position. optional:'none','linear','quadratic'
         */
        function navigationDrawer(drawer, hamburger, options) {
            // Load parameters
            var button, options;
            switch (arguments.length) {
                case 0:
                case 1:
                    return;
                case 2:
                    if (arguments[1] instanceof Element) {
                        button = arguments[1];
                    } else {
                        options = arguments[1];
                    }
                    break;
                case 3:
                    button = arguments[1];
                    options = arguments[2];
                    break;
                default:
                    return;
            }

            // Initial drawer option
            var width = Math.floor(Yuko.utility.getComputedSizeInPx(drawer, 'width'));
            var timeSpan = options.timeSpan ? options.timeSpan : 300;
            var animationType = options.animationType ? options.animationType : 'linear';
            var mask = options.mask ? true : false;

            /**
             * Curried function for position calculation (time as variable)
             * @param {number} progress A timespan
             */
            var curriedTimeFunction = (function () {
                switch (options.animationType) {
                    case 'linear':
                        var a = width / timeSpan;
                        var b = -width;
                        return function (progress) {
                            return a * progress + b;
                        };
                        break;
                    case 'quadratic':
                        var a = -width / (timeSpan * timeSpan);
                        var b = 2 * width / timeSpan;
                        var c = -width;
                        return function (progress) {
                            return Yuko.utility.calcQuadraticEquation(a, b, c, progress);
                        };
                        break;
                    default:
                        break;
                }
            })();

            /**
             * Curried function for time calculation (position as variable)
             * @param {number} left CSS property of left with drawer
             */
            var curriedPositionFunction = (function () {
                switch (options.animationType) {
                    case 'linear':
                        var a = timeSpan / width;
                        var b = timeSpan;
                        return function (left) {
                            return a * left + b;
                        };
                        break;
                    case 'quadratic':
                        return function (left) {
                            return timeSpan * (1 - Math.sqrt(-left / width));
                        };
                        break;
                    default:
                        break;
                }
            })();

            // Save position for each progress
            var keyTimeFrames = [];
            for (var i = 0; i <= timeSpan; i++) {
                keyTimeFrames.push(curriedTimeFunction(i));
            }
            for (var i = 0; i < 16; i++) {
                keyTimeFrames.push(curriedTimeFunction(timeSpan));
            }

            // Save progress for each position
            var keyPositionFrames = [];
            for (var i = -width; i <= 0; i++) {
                keyPositionFrames.push(curriedPositionFunction(i));
            }
            for (var i = 0; i < 16; i++) {
                keyPositionFrames.push(curriedPositionFunction(0));
            }

            // Public variables for event handlers
            var startPoint;
            var startTime;
            var currentPoint;
            var endPoint;
            var endTime;
            var distance;
            var menuDisplayed = false;
            var thereShouldBeAnAnimation = false;
            var positionIndex;
            var drawerList = document.querySelectorAll('#' + drawer.id + ' li');
            var pageList = document.querySelectorAll('.yuko-content');
            var footer = document.getElementsByTagName('footer').item(0);
            var hamburgerLeft, hamburgerTop, hamburgerRight, hamburgerBottom;
            if (hamburger) {
                hamburgerLeft = hamburger.offsetLeft;
                hamburgerTop = hamburger.offsetTop;
                hamburgerRight = hamburgerLeft + hamburger.offsetWidth;
                hamburgerBottom = hamburgerTop + hamburger.offsetHeight;
            }

            // Initial swipe events
            var onWindowTouchStart = function (e) {
                startPoint = e.changedTouches[0];
                startTime = new Date().getTime();
            };

            var onWindowTouchMove = function (e) {
                currentPoint = e.changedTouches[0];

                if (menuDisplayed) {
                    currentPoint = e.changedTouches[0];
                    if (currentPoint.clientX <= width) {
                        distance = currentPoint.clientX - (startPoint.clientX <= width ? startPoint.clientX : width);
                        drawer.style.left = (distance < 0 ? distance : 0) + 'px';
                    }
                    thereShouldBeAnAnimation = true;
                    e.stopImmediatePropagation();
                } else if (startPoint.clientX < 16) {
                    distance = currentPoint.clientX - startPoint.clientX;
                    drawer.style.left = (distance < 0 ? -width : distance > width ? 0 : distance - width) + 'px';
                    thereShouldBeAnAnimation = true;
                    e.stopImmediatePropagation();
                }
                // Mask
                if (mask) {
                    drawer.parentNode.style.background = 'rgba(0,0,0,' + (1 - Math.abs(Math.round(drawer.offsetLeft)) / Math.round(drawer.offsetWidth)) * 0.6 + ')';
                }
            };

            var onWindowTouchEnd = function (e) {
                endPoint = e.changedTouches[0];
                endTime = new Date().getTime();

                if (menuDisplayed && startPoint.clientX > width && endPoint.clientX > width && (endTime - startTime < 1000)) {
                    showMenu(false);
                }

                if (thereShouldBeAnAnimation) {
                    showMenu(Yuko.utility.getComputedSizeInPx(drawer, 'left') > ((menuDisplayed ? -0.382 : -0.618) * width));
                }
                thereShouldBeAnAnimation = false;
            };

            var onHamburgerTouchEnd = function (e) {
                endPoint = e.changedTouches[0];
                // Show menu and stopImmediatePropagation if hamburger button is clicked
                if (endPoint.clientX <= hamburgerRight && endPoint.clientX >= hamburgerLeft && endPoint.clientY <= hamburgerBottom && endPoint.clientY >= hamburgerTop) {
                    showMenu(true);
                    e.stopImmediatePropagation();
                }
            };

            var attachTouchEvents = function (boolean) {
                if (boolean) {
                    win.addEventListener('touchstart', onWindowTouchStart, true);
                    win.addEventListener('touchmove', onWindowTouchMove, true);
                    win.addEventListener('touchend', onWindowTouchEnd, true);
                    if (hamburger) {
                        hamburger.addEventListener('touchend', onHamburgerTouchEnd, false);
                    }
                } else {
                    win.removeEventListener('touchstart', onWindowTouchStart);
                    win.removeEventListener('touchmove', onWindowTouchMove);
                    win.removeEventListener('touchend', onWindowTouchEnd);
                    if (hamburger) {
                        hamburger.removeEventListener('touchend', onHamburgerTouchEnd);
                    }
                }

            };
            attachTouchEvents(true);
            // Change style for drawer list and add effect to it
            for (var i = 0; i < drawerList.length; i++) {
                drawerList[i].addEventListener('touchstart', (function () {
                    return function () {
                        for (var j = 0; j < drawerList.length; j++) {
                            drawerList[j].className = 'yuko-nav-item';
                        }
                    }
                })());
                drawerList[i].addEventListener('touchend', (function (i) {
                    return function () {
                        // Change style of nav list item
                        drawerList[i].className = 'yuko-nav-item item-selected'
                        // Adjust position of footer
                        footer.style.top = (pageList[i].offsetHeight < document.body.clientHeight - 56 ? document.body.clientHeight - 56 : pageList[i].offsetHeight + 56) + 'px';
                        // Adjust height of main
                        document.getElementsByTagName('main').item(0).style.height = pageList[i].offsetHeight + "px";
                        showMenu(false);
                    }
                })(i));
                drawerList[i].addEventListener('touchstart', Yuko.effect.rippleEffect, false);
            }
            /**
             * Show or hide the drawer
             * @param {Boolean} boolean 
             */
            var showMenu = function (boolean) {
                var currentPosition = 0;
                var startProgress = 0;
                var start = null;

                var showProcess = function (timestamp) {
                    if (!start) {
                        start = timestamp;
                    }
                    positionIndex = Math.floor(startProgress + timestamp - start);
                    if (mask) {
                        drawer.parentNode.style.background = 'rgba(0,0,0,' + (1 - Math.abs(keyTimeFrames[positionIndex] / drawer.offsetWidth)) * 0.6 + ')';
                    }
                    drawer.style.left = keyTimeFrames[positionIndex] + 'px';

                    if (positionIndex < timeSpan) {
                        win.requestAnimationFrame(showProcess);
                    } else {
                        drawer.parentNode.style.position = 'fixed';
                        drawer.style.left = 0;
                        menuDisplayed = true;
                        attachTouchEvents(true);
                    }
                };

                var hideProcess = function (timestamp) {
                    if (!start) {
                        start = timestamp;
                    }
                    positionIndex = Math.floor(startProgress - timestamp + start);
                    if (mask) {
                        drawer.parentNode.style.background = 'rgba(0,0,0,' + (1 - Math.abs(keyTimeFrames[positionIndex] / drawer.offsetWidth)) * 0.6 + ')';
                    }
                    drawer.style.left = keyTimeFrames[positionIndex] + 'px';

                    if (positionIndex > 0) {
                        win.requestAnimationFrame(hideProcess);
                    } else {
                        drawer.parentNode.style.position = '';
                        drawer.style.left = -width + 'px';
                        menuDisplayed = false;
                        attachTouchEvents(true);
                    }
                };

                currentPosition = Math.floor(Yuko.utility.getComputedSizeInPx(drawer, 'left')) + width;
                startProgress = Math.floor(keyPositionFrames[currentPosition]);

                if (boolean) {
                    attachTouchEvents(false);
                    win.requestAnimationFrame(showProcess);
                } else {
                    attachTouchEvents(false);
                    win.requestAnimationFrame(hideProcess);
                }
            };

            return {
                show: function () {
                    showMenu(true);
                },
                close: function () {
                    showMenu(false);
                }
            };
        }

        /**
         * Make the provided block element to be a page container
         * @param {Element} container The container for main content
         * @param {{allowSwipe : (Boolean|undefined), timeSpan : (number|undefined), animationType : (string|undefined), swipeScale : (number|undefined)}=} option 
         *          allowSwipe=: Is the container allowed swipe to switch the display content.
         *          timeSpan=: Time span of animation in milliseconds. Default: 300.
         *          animationType=: The functional relationship between time and position. optional:'none','linear','quadratic' .
         *          swipeScale=: Switch limtation position
         * @param {Function} onPageContainerReady A callback when the page container is in ready state
         * @param {Boolean} onAnimationComplete A judgement of whether the animation is completed or not
         */
        function pageContainer(container, option, onPageContainerReady, onAnimationComplete) {
            container.classList.add('yuko-page-container');
            var width = win.document.body.offsetWidth;
            container.style.width = width + 'px';
            var allowSwipe = option.allowSwipe ? true : false;
            var timeSpan = option.timeSpan ? option.timeSpan : 300;
            var animationType = option.animationType ? option.animationType : 'linear';
            var swipeScale = option.swipeScale ? option.swipeScale : 0.5;

            var pageList = [];
            for (var i = 0; i < container.children.length; i++) {
                if (container.children[i].getAttribute('data-role') == 'yuko-page') {
                    pageList.push(container.children[i]);
                }
            }

            var currentPage = 0;
            var currentLeft = 0;
            var lastLeft = currentLeft;
            var pageCount = pageList.length;
            var isAnimating = false;

            // Position of each page
            var page;
            for (var i = 0; i < pageCount; i++) {
                page = pageList[i];
                page.classList.add('yuko-page');
                page.style.left = page.getAttribute('data-page-id') * width + 'px';
            }

            var curriedTimeFunction = (function () {
                switch (animationType) {
                    case 'linear':
                        var a = 2 * width / (timeSpan * timeSpan);
                        var b = 2 * width / timeSpan;
                        return function (progress) {
                            return progress < 0.5 * timeSpan ? a * progress * progress : b * progress - a * progress * progress;
                        };
                        break;
                    case 'quadratic':
                        var a = -2 * width / (timeSpan * timeSpan * timeSpan);
                        var b = 3 * width / (timeSpan * timeSpan);
                        return function (progress) {
                            return Yuko.utility.calcCubicEquation(a, b, 0, 0, progress);
                        };
                        break;
                    default:
                        break;
                }
            })();

            // Save position for each progress
            var keyTimeFrames = [];
            for (var i = 0; i <= timeSpan; i++) {
                keyTimeFrames.push(Yuko.utility.roundTo(curriedTimeFunction(i), 0));
            }

            // Save progress for each position
            var keyPositionFrames = [];
            for (var i = 0, counter = 0; i <= width; i++) {
                keyPositionFrames.push(Yuko.utility.firstGreaterThan(keyTimeFrames, i - 1));
            }

            var touchStartPointValid = false;
            var startPoint;
            var currentPoint;
            var endPoint;
            var distance;

            // Touch event
            var onPageContainerTouchStart = function (e) {
                if (e.changedTouches[0].clientX > 16 && e.changedTouches[0].clientX < width - 16) {
                    touchStartPointValid = true;
                    startPoint = e.changedTouches[0];
                    lastLeft = currentLeft;
                } else {
                    touchStartPointValid = false;
                    startPoint = null;
                }
            };

            var onPageContainerTouchMove = function (e) {
                if (touchStartPointValid) {
                    currentPoint = e.changedTouches[0];
                    distance = currentPoint.clientX - startPoint.clientX;
                    if ((currentPage != 0 && distance > 0) || (currentPage != pageCount - 1 && distance < 0)) {
                        for (var i = 0; i < pageCount; i++) {
                            pageList[i].style.left = lastLeft + width * i + 'px';
                        }
                    } else {
                    }
                }
            };

            var onPageContainerTouchEnd = function (e) {
                if (touchStartPointValid) {
                    endPoint = e.changedTouches[0];
                    if (distance == 0) {
                        return;
                    }
                    var scale = distance / width;
                    var indexChange = 0;
                    if ((scale < -swipeScale) || (scale > 0 && scale < swipeScale)) {
                        var currentPosition = (distance > 0 ? 0 : width) + Math.floor(distance);
                        var currentProgress = keyPositionFrames[currentPosition];
                        var keyFrames = [];
                        if (distance > 0) {
                            indexChange = 0;
                            for (var i = currentProgress; i >= 0; i--) {
                                keyFrames.push(currentLeft + keyTimeFrames[i]);
                            }
                            for (var i = 0; i < 16; i++) {
                                keyFrames.push(currentLeft);
                            }
                        } else {
                            for (var i = currentProgress; i >= 0; i--) {
                                keyFrames.push(currentLeft + keyTimeFrames[i] - width);
                            }
                            for (var i = 0; i < 16; i++) {
                                keyFrames.push(currentLeft - width);
                            }
                            indexChange = 1;
                        }
                        slide(keyFrames, currentProgress, indexChange);
                    } else {
                        var currentPosition = (distance > 0 ? 0 : width) + Math.floor(distance);
                        var currentProgress = keyPositionFrames[currentPosition];
                        var keyFrames = [];
                        if (distance > 0) {
                            for (var i = currentProgress; i <= timeSpan; i++) {
                                keyFrames.push(currentLeft + keyTimeFrames[i]);
                            }
                            for (var i = 0; i < 16; i++) {
                                keyFrames.push(currentLeft + width);
                            }
                            indexChange = -1;
                        } else {
                            for (var i = currentProgress; i <= timeSpan; i++) {
                                keyFrames.push(currentLeft + keyTimeFrames[i] - width);
                            }
                            for (var i = 0; i < 16; i++) {
                                keyFrames.push(currentLeft);
                            }
                            indexChange = 0;
                        }
                        slide(keyFrames, timeSpan - currentProgress + 1, indexChange);
                    }
                }
            };

            var attachSwipeEvent = function (boolean) {
                if (boolean) {
                    container.addEventListener('touchstart', onPageContainerTouchStart);
                    container.addEventListener('touchmove', onPageContainerTouchMove);
                    container.addEventListener('touchend', onPageContainerTouchEnd);
                } else {
                    container.removeEventListener('touchstart', onPageContainerTouchStart);
                    container.removeEventListener('touchmove', onPageContainerTouchMove);
                    container.removeEventListener('touchend', onPageContainerTouchEnd);
                }
            }
            if (allowSwipe) {
                attachSwipeEvent(true)
            }


            var slide = function (keyFrames, progressCount, indexChange) {
                if (isAnimating) {
                    return;
                }
                var start = null;
                var positionIndex = 0;

                // Detach slide event here
                if (allowSwipe) {
                    attachSwipeEvent(false);
                }

                isAnimating = true;

                var slideProcess = function (timestamp) {
                    if (!start) {
                        start = timestamp;
                    }
                    positionIndex = Math.floor(timestamp - start);
                    for (var i = 0; i < pageCount; i++) {
                        pageList[i].style.left = keyFrames[positionIndex] + width * i + 'px';
                    }
                    if (positionIndex < progressCount) {
                        win.requestAnimationFrame(slideProcess);
                    } else {
                        for (var i = 0; i < pageCount; i++) {
                            pageList[i].style.left = keyFrames[progressCount + 1] + width * i + 'px';
                        }
                        currentLeft = keyFrames[progressCount + 1];
                        currentPage += indexChange;
                        container.setAttribute('data-page-index', currentPage);
                        isAnimating = false;
                        if (allowSwipe) {
                            attachSwipeEvent(true);
                        }
                        // if (onAnimationComplete) {
                        //     onAnimationComplete(currentPage);
                        // }
                    }
                };

                win.requestAnimationFrame(slideProcess);
            };

            /**
             * Slide to a specific page
             * @param {string|number} page The page to slide to
             *          "next": Slide to the next page (if it exists)
             *          "previous": Slide to the previous page (if it exists)
             *          number: Slide to the numberth page (start at 0)
             */
            var slideTo = function (page) {
                var keyFrames = [];
                var progressCount = 0;
                if (page == "next") {
                    if (currentPage == 0) {
                        return;
                    }
                    keyFrames = [];
                    for (var i = 0; i < keyTimeFrames.length; i++) {
                        keyFrames.push(keyTimeFrames[i] + currentLeft);
                    }
                    progressCount = timeSpan;
                    slide(keyFrames, progressCount, 1);
                } else if (page == "previous") {
                    if (currentPage == pageCount - 1) {
                        return;
                    }
                    keyFrames = [];
                    for (var i = 0; i < keyTimeFrames.length; i++) {
                        keyFrames.push(currentLeft - keyTimeFrames[i])
                    }
                    progressCount = timeSpan;
                    slide(keyFrames, progressCount, -1);
                } else {
                    var index;
                    // Return if paramater is not a valid value
                    if (isNaN(index = parseInt(page)) || index < 0 || index > pageCount - 1) {
                        return;
                    }

                    var indexChange = index - currentPage;
                    keyFrames = [];
                    for (var i = 0; i < keyTimeFrames.length; i++) {
                        keyFrames.push(currentLeft - keyTimeFrames[i] * indexChange);
                    }
                    for (var i = 0; i < 16; i++) {
                        keyFrames.push(currentLeft - width * indexChange);
                    }
                    progressCount = timeSpan;
                    slide(keyFrames, progressCount, indexChange);
                }

                return currentPage;
            };

            onPageContainerReady();

            return {
                currentPage: function () {
                    return currentPage;
                },
                slideTo: slideTo
            }
        };

        /**
         * Make a list's items to be Carousel items
         * @param {Element} carouselList Carousel items' collection
         * @param {Element} preButton A button to switch to Carousel's previous display order
         * @param {Element} nextButton A button to switch to Carousel's next display order
         * @returns 
         */
        function carousel(carouselList, preButton, nextButton, duration) {

            var len = carouselList.length;
            var nextItemList = [], positionValues = [];
            // Item position span
            var positionProgress = [];
            var prePositionSpan = null, nextPositionSpan = null, positionProgressCopy = null, tempPositionSpan = null;
            for (var i = 0; i < carouselList.length; i++) {
                positionProgress.push([]);
            }
            var position = {
                evenNumberItem: [
                    ['100%', '100%', '0', '0'],
                    ['80%', '80%', '10%', '-12.5%'],
                    ['60%', '60%', '20%', '20%'],
                    ['80%', '80%', '10%', '27.5%']
                ],
                oddNumberItem: [
                    ['100%', '100%', '0', '0'],
                    ['80%', '80%', '10%', '-12.5%'],
                    ['60%', '60%', '20%', '12.5%'],
                    ['60%', '60%', '20%', '27.5%'],
                    ['80%', '80%', '10%', '32.5%']
                ]
            }
            window.requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

            var cssTransitionPolyfill = function (carouselList, option, duration, event) {
                // Position data
                var position = {
                    evenNumberItem: [
                        [100, 100, 0, 0],
                        [80, 80, 10, -12.5],
                        [60, 60, 20, 20],
                        [80, 80, 10, 27.5]
                    ],
                    oddNumberItem: [
                        [100, 100, 0, 0],
                        [80, 80, 10, -12.5],
                        [60, 60, 20, 12.5],
                        [60, 60, 20, 27.5],
                        [80, 80, 10, 32.5]
                    ]
                }
                // Make a copy for position data
                var positionCopy = Yuko.utility.cloneObject(position);

                var refreshTime = duration * 60;
                var pos = null, posCopy = null, posCopyTemp;
                var next = 0;
                /**
                 * Load data for every progress
                 * @param {number} count position object's length
                 */
                var fillPositionData = function (count) {
                    for (var j = 0; j < count; j++) {
                        j < count - 1 ? next = j + 1 : next = 0;

                        if (count % 2 !== 0) {
                            if (count === 3) {
                                pos = [
                                    position.oddNumberItem[0],
                                    position.oddNumberItem[1],
                                    position.oddNumberItem[5]
                                ];
                                if (posCopy === null) {
                                    posCopy = [
                                        positionCopy.oddNumberItem[0],
                                        positionCopy.oddNumberItem[1],
                                        positionCopy.oddNumberItem[5]
                                    ];
                                }
                            }
                            if (count === 5) {
                                pos = position.oddNumberItem;
                                if (posCopy === null) {
                                    posCopy = positionCopy.oddNumberItem;
                                }
                            }
                            if (count > 5) {
                                var overflowItem = [];
                                for (var i = 0; i < count - 5; i++) {
                                    overflowItem.push([40, 40, 30, 30]);
                                }
                                pos = [].concat(position.oddNumberItem.slice(0, 3), overflowItem, position.oddNumberItem.slice(-2));
                                if (posCopy === null) {
                                    posCopy = [].concat(positionCopy.oddNumberItem.slice(0, 3), overflowItem, positionCopy.oddNumberItem.slice(-2));
                                }
                            }
                        } else {
                            if (count === 2) {
                                pos = [
                                    position.evenNumberItem[0],
                                    position.evenNumberItem[3]
                                ];
                                if (posCopy === null) {
                                    posCopy = [
                                        positionCopy.evenNumberItem[0],
                                        positionCopy.evenNumberItem[3]
                                    ];
                                }
                            }
                            if (count === 4) {
                                pos = position.evenNumberItem;
                                if (posCopy === null) {
                                    posCopy = positionCopy.evenNumberItem;
                                }
                            }
                            if (count > 4) {
                                var overflowItem = [];
                                for (var i = 0; i < count - 4; i++) {
                                    overflowItem.push([60, 60, 20, 20]);
                                }
                                pos = [].concat(position.evenNumberItem.slice(0, 3), overflowItem, position.evenNumberItem.slice(-1));
                                if (posCopy === null) {
                                    posCopy = [].concat(positionCopy.evenNumberItem.slice(0, 3), overflowItem, positionCopy.evenNumberItem.slice(-1));
                                }
                            }
                        }

                        // posCopyTemp = Yuko.utility.cloneObject(pos);
                        // posCopy = positionCopy.oddNumberItem;

                        for (var k = 0; k < 4; k++) {
                            // ERROR In IE9, there is a unexpected action with pos
                            posCopy[j][k] += ((pos[next][k] - pos[j][k]) / refreshTime);
                        }
                        var data = [];
                        for (var m = 0; m < 4; m++) {
                            data.push(posCopy[j][m].toLocaleString() === '-0' ? '0' : posCopy[j][m].toLocaleString() + '%');
                        }
                        positionProgress[j].push(data);
                    }
                }

                for (var i = 0; i < refreshTime; i++) {
                    fillPositionData(carouselList.length);
                }
                // console.log([].concat(positionProgressOdd.slice(-1), positionProgressOdd.slice(0, positionProgressOdd.length - 1)));
                // console.log(positionProgressEven);
                if (prePositionSpan === null) prePositionSpan = [].concat(positionProgress.slice(-1), positionProgress.slice(0, positionProgress.length - 1));
                if (positionProgressCopy === null) positionProgressCopy = [].concat(positionProgress);
                if (tempPositionSpan === null) {
                    tempPositionSpan = [];
                    for (var i = 0; i < positionProgress.length; i++) {
                        tempPositionSpan.push([].concat(positionProgressCopy[i]).reverse());
                    }
                }
                if (nextPositionSpan === null) nextPositionSpan = tempPositionSpan;
                return event.target === preButton ? prePositionSpan : nextPositionSpan;
            }

            if (!carouselList || len < 2) return;

            // Attach click event to button
            var sortedPositionValues = null;
            Yuko.utility.addEvent(nextButton, 'click', function (event) {
                sortedPositionValues = cssTransitionPolyfill(carouselList, {}, duration, event);
                changeCoordinate(event, duration);
            });
            Yuko.utility.addEvent(preButton, 'click', function (event) {
                sortedPositionValues = cssTransitionPolyfill(carouselList, {}, duration, event);
                changeCoordinate(event, duration);
            });

            /**
             * Change Coordination of carousel list item
             * @param {Event} event The DOM Event which was triggered
             */
            var changeCoordinate = function (event, duration) {

                var visualPageIndex = window.parseInt(document.querySelector('#yuko-carousel-list > ul').getAttribute('data-page-index'));
                // Reset visualPageIndex where it is overflow(more than carouselList.length or less than 0)
                if (event.target === nextButton) {
                    visualPageIndex++;
                    if (visualPageIndex === len) {
                        visualPageIndex = 0;
                    }
                }
                if (event.target === preButton) {
                    visualPageIndex--;
                    if (visualPageIndex === -1) {
                        visualPageIndex = len - 1;
                    }
                }
                // The next display order list
                nextItemList = [];
                for (var i = visualPageIndex; i < len; i++) {
                    nextItemList.push(carouselList[i]);
                }
                for (var i = 0; i < visualPageIndex; i++) {
                    nextItemList.push(carouselList[i]);
                }

                // console.log(nextItemList);

                if (len % 2 !== 0) {
                    if (len === 3) {
                        positionValues = [
                            position.oddNumberItem[0],
                            position.oddNumberItem[1],
                            position.oddNumberItem[5]
                        ];
                    }
                    if (len === 5) {
                        positionValues = position.oddNumberItem;
                    }
                    if (len > 5) {
                        var overflowItem = [];
                        for (var i = 0; i < len - 5; i++) {
                            overflowItem.push(['40%', '40%', '30%', '30%']);
                        }
                        positionValues = [].concat(position.oddNumberItem.slice(0, 3), overflowItem, position.oddNumberItem.slice(-2));
                    }
                } else {
                    if (len === 2) {
                        positionValues = [
                            position.evenNumberItem[0],
                            position.evenNumberItem[3]
                        ];
                    }
                    if (len === 4) {
                        positionValues = position.evenNumberItem;
                    }
                    if (len > 4) {
                        var overflowItem = [];
                        for (var i = 0; i < len - 4; i++) {
                            overflowItem.push(['60%', '60%', '20%', '20%']);
                        }
                        positionValues = [].concat(position.evenNumberItem.slice(0, 3), overflowItem, position.evenNumberItem.slice(-1));
                    }
                }
                nextItemList[len - 2].style.zIndex = (20 - len) + "";
                nextItemList[len - 1].style.zIndex = (21 - len) + "";

                var refreshTime = duration * 60;

                /*
                function animate(i, f) {
                    function load(flag) {
                        window.requestAnimFrame(function () {
                            return (function () {
                                console.log('flag = ' + flag + '   i = ' + i);
                                console.log(sortedPositionValues[i][flag]);
                                Yuko.utility.setBoundingRectangle(nextItemList[i], sortedPositionValues[i][flag]);
                            })();
                        });
                    };

                    for (var flag = 0; flag < f; flag++) {
                        load(flag);
                    }
                };
                */

                console.log('len = ' + len);
                for (var i = 0; i < len; i++) {
                    if (i < len - 2) {
                        nextItemList[i].style.zIndex = (19 - i) + "";
                    }
                    if (Yuko.utility.isBroeserSupportProp('transition')) {
                        // console.log(positionValues[i]);
                        Yuko.utility.setBoundingRectangle(nextItemList[i], positionValues[i]);
                    }
                    else {
                        //CSS transition is not support
                        (function (i) {
                            var flag = 0;
                            var animate = function () {
                                if (flag < refreshTime - 1) {
                                    flag++;
                                    console.log(sortedPositionValues);
                                    Yuko.utility.setBoundingRectangle(nextItemList[i], sortedPositionValues[i][flag]);
                                    window.requestAnimFrame(animate);
                                }
                            }
                            window.requestAnimFrame(animate);
                        })(i);
                        // animate(i, refreshTime);
                    }
                }

                document.querySelector('#yuko-carousel-list > ul').setAttribute('data-page-index', visualPageIndex + "");
            }

            // cssTransitionPolyfill(position.oddNumberItem, {}, .1);
        }

        return {
            navigationDrawer: navigationDrawer,
            pageContainer: pageContainer,
            carousel: carousel
        };

    })();

    Yuko.init = (function () {
        // Fragment style
        Yuko.style.initFragStyle();
        // Carousel style
        Yuko.style.initCarouselStyle();
        // When a resize event happen
        Yuko.utility.addEvent(win, 'resize', function () {
            // Fragment style
            Yuko.style.initFragStyle();
            // Carousel style
            Yuko.style.initCarouselStyle();
        });
    })();

})(window);