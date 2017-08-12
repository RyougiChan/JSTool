//Yuko.js

(function (win) {
    "use strict";

    var global = win;

    if (!global.Yuko) {
        global.Yuko = global.Yuko = global.yuko = Object();
    }

    // Util tools for Yuko.js
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

    Yuko.style = (function () {

    })();

    Yuko.event = (function () {

    })();

    Yuko.effect = (function () {

    })();

    Yuko.widget = (function () {

    })();

})(window);