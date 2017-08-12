//Yuko.js

(function (win) {
    "use strict";

    var global = win;

    if (!global.Yuko) {
        global.Yuko = global.Yuko = global.yuko = Object();
    }

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
        function firstGreaterThan (array, value) {
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
            return parseInt((getComputedStyle(ele, null).getPropertyValue(type)), 10);
        };

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

        return {
            calcCubicEquation: calcCubicEquation,
            calcQuadraticEquation: calcQuadraticEquation,
            firstGreaterThan: firstGreaterThan,
            fontSizeInPx: fontSizeInPx,
            getComputedSizeInPx: getComputedSizeInPx,
            roundTo: roundTo
        }
    })();

    // Default style for Yuko's layout
    Yuko.style = (function () {
        // Document element
        var header = document.getElementsByTagName('header').item(0);
        var footer = document.getElementsByTagName('footer').item(0);
        var main = document.getElementsByTagName('main').item(0);
        var firstYukoContent = document.querySelectorAll('.yuko-content').item(0);
        // Element property
        var headerHeight = Yuko.utility.getComputedSizeInPx(header, 'height');
        var firstPageHeight = Yuko.utility.getComputedSizeInPx(firstYukoContent, 'height');
        // Default footer style
        footer.style.top = (firstPageHeight < win.innerHeight - headerHeight ? win.innerHeight - headerHeight : firstPageHeight + headerHeight) + 'px';
        // Default main style
        main.style.height = (win.innerHeight - 112) + "px";
    })();

    Yuko.event = (function () {

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

    Yuko.widget = (function () {
        /**
         * Make the drawer a touch sensitive android like navigation drawer
         * @param {Element} drawer The Element to be manipulated
         * @param {Element} hamburger A hamburger button to trigger the drawer
         * @param {{timespan : (string|undefined), mask : (Boolean|undefined), animationType : (string|undefined)}=} options
         *         timespan=: Time span of animation in milliseconds. Default: 300.
         *         mask=: Indicate whether there is a mask for drawer.
         *         animationType=: The functional relationship between time and position. optional:'none','linear','quadratic'
         */
        function navigationDrawer (drawer, hamburger, options) {
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

            
        }

    })();

})(window);