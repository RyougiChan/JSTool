(function (win) {
  'use strict';

  var global = win;

  if (!global.Yuko) {
    global.Yuko = global.Yuko = global.yuko = Object();
  }

  Yuko.polyfill = (function () {
    function map() {
      if (!Array.prototype.map) {
        Array.prototype.map = function (callback) {
          var T, A, k;
          if (this == null) {
            throw new TypeError('this is null or not defined');
          }
          var O = Object(this);
          var len = O.length >>> 0;
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          if (arguments.length > 1) {
            T = arguments[1];
          }
          A = new Array(len);
          k = 0;
          while (k < len) {

            var kValue, mappedValue;
            if (k in O) {
              kValue = O[k];
              mappedValue = callback.call(T, kValue, k, O);
              A[k] = mappedValue;
            }
            k++;
          }
          return A;
        };
      }
    }
    return {
      map: map
    }
  })()

  Yuko.utility = (function () {

    function gaussianElimination(arr, b) {
      // Lower Upper Solver
      var lusolve = function (A, b, update) {
        var lu = ludcmp(A, update);
        if (lu === undefined) return; // Singular Matrix!
        return lubksb(lu, b, update);
      }

      // Lower Upper Decomposition
      var ludcmp = function (A, update) {
        // A is a matrix that we want to decompose into Lower and Upper matrices.
        var d = true,
          n = A.length,
          idx = new Array(n), // Output vector with row permutations from partial pivoting
          vv = new Array(n);  // Scaling information

        for (var i = 0; i < n; i++) {
          var max = 0;
          for (var j = 0; j < n; j++) {
            var temp = Math.abs(A[i][j]);
            if (temp > max) max = temp;
          }
          if (max == 0) return; // Singular Matrix!
          vv[i] = 1 / max; // Scaling
        }

        if (!update) { // make a copy of A
          var Acpy = new Array(n);
          for (var i = 0; i < n; i++) {
            var Ai = A[i],
              Acpyi = new Array(Ai.length);
            for (j = 0; j < Ai.length; j += 1) Acpyi[j] = Ai[j];
            Acpy[i] = Acpyi;
          }
          A = Acpy;
        }

        var tiny = 1e-20 // in case pivot element is zero
        for (var i = 0; ; i++) {
          for (var j = 0; j < i; j++) {
            var sum = A[j][i];
            for (var k = 0; k < j; k++) sum -= A[j][k] * A[k][i];
            A[j][i] = sum;
          }
          var jmax = 0,
            max = 0;
          for (var j = i; j < n; j++) {
            var sum = A[j][i];
            for (var k = 0; k < i; k++) sum -= A[j][k] * A[k][i];
            A[j][i] = sum;
            var temp = vv[j] * Math.abs(sum);
            if (temp >= max) {
              max = temp;
              jmax = j;
            }
          }
          if (i <= jmax) {
            for (var j = 0; j < n; j++) {
              var temp = A[jmax][j];
              A[jmax][j] = A[i][j];
              A[i][j] = temp;
            }
            d = !d;
            vv[jmax] = vv[i];
          }
          idx[i] = jmax;
          if (i == n - 1) break;
          var temp = A[i][i];
          if (temp == 0) A[i][i] = temp = tiny;
          temp = 1 / temp;
          for (var j = i + 1; j < n; j++) A[j][i] *= temp;
        }
        return { A: A, idx: idx, d: d }
      }

      // Lower Upper Back Substitution
      var lubksb = function (lu, b, update) {
        // solves the set of n linear equations A*x = b.
        // lu is the object containing A, idx and d as determined by the routine ludcmp.
        var A = lu.A,
          idx = lu.idx,
          n = idx.length;

        if (!update) { // make a copy of b
          var bcpy = new Array(n);
          for (var i = 0; i < b.length; i += 1) bcpy[i] = b[i];
          b = bcpy;
        }

        for (var ii = -1, i = 0; i < n; i++) {
          var ix = idx[i],
            sum = b[ix];
          b[ix] = b[i];
          if (ii > -1)
            for (var j = ii; j < i; j++) sum -= A[i][j] * b[j];
          else if (sum)
            ii = i;
          b[i] = sum;
        }
        for (var i = n - 1; i >= 0; i--) {
          var sum = b[i];
          for (var j = i + 1; j < n; j++) sum -= A[i][j] * b[j];
          b[i] = sum / A[i][i];
        }
        return b; // solution vector x
      }

      return lusolve(
        arr, b
      )
    }


    function addEvent(target, type, listener) {
      if (target == null || typeof (target) == 'undefined') return;
      if (target.addEventListener) {
        target.addEventListener(type, listener, false);
      } else if (target.attachEvent) {
        target.attachEvent('on' + type, listener);
      } else {
        target['on' + type] = listener;
      }
    }
    /**
     * Create a specific animaion
     * @param {Element} ele The element to execute animation.
     * @param {{properties: ({}), duration?: (string|number), easing?: (string), start?: (Function), complete? : (Function)}} options Parameters to initial animation.
     *   properties=: An object of CSS properties and values that the animation will move toward.
     *   duration=: A string or number determining how long the animation will run. default: 400.
     *   easing=: A string indicating which easing function to use for the transition. default: 'linear'.
     *   start=? A function to call when the animation on an element begins.
     *   complete=? A function to call once the animation is complete.
     * @returns Return while there are something not match.
     */
    function animate(ele, options) {
      if (!options || !options.properties || !(options.properties instanceof Object)) return;
      // Initial parameters
      var props = options.properties,
        duration = options.duration === 'fast' ? 300 : options.duration === 'normal' ? 900 : options.duration === 'slow' ? 1500 : options.duration || 400,
        easing = options.easing || 'linear',
        start = options.start || function () { console.log('Now Start!') },
        complete = options.complete || function () { console.log('Now Completed!') };

      Yuko.polyfill.map();

      /**
       * Calculation of cubic bezier function f(x) = a * x * x * x + b * x *x + c * x + d.
       * @param {string} bp bezier adjust point format in 'cubic-bezier(.17,.67,.78,.31)' or 'cubic-bezier(.17,.67,.78,.31,.17,.67,.78,.31)'
       */
      var cubicBezierFunction = function (bp, x) {
        var floatFix = function (val) {
          return parseFloat(val.toLocaleString());
        }
        var calcFp = function (ps, t) {
          return Math.pow(1 - t, 3) * ps[0] + 3 * t * Math.pow(1 - t, 2) * ps[1] + 3 * (1 - t) * Math.pow(t, 2) * ps[2] + Math.pow(t, 3) * ps[3];
        }
        var bpInArray = bp.substring(bp.indexOf('(') + 1, bp.indexOf(')')).split(',').map(function (i) { return parseFloat(i) }),
          // Cubic Bézier curves points
          ps = bpInArray.length < 4 ? []
            : bpInArray.length >= 4 && bpInArray.length < 8 ? [].concat([0, 0], bpInArray.slice(0, 4), [1.0, 1.0])
              : bpInArray.length > 8 ? bpInArray.slice(0, 8) : bpInArray,
          // parameters to calculate a, b, c, d
          ft1 = .25,
          ft2 = .75,
          fp1 = calcFp([ps[0], ps[2], ps[4], ps[6]], ft1),
          fp2 = calcFp([ps[0], ps[2], ps[4], ps[6]], ft2),
          fp3 = calcFp([ps[1], ps[3], ps[5], ps[7]], ft1),
          fp4 = calcFp([ps[1], ps[3], ps[5], ps[7]], ft2),
          // Coefficient of cubic equation
          cs = gaussianElimination([
            [0, 0, 0, 1],
            [Math.pow(fp1, 3), Math.pow(fp1, 2), fp1, 1],
            [Math.pow(fp2, 3), Math.pow(fp2, 2), fp2, 1],
            [1, 1, 1, 1]
          ], [0, fp3, fp4, 1]).map(function (i) {
            return parseFloat(i.toLocaleString());
          }),
          a = cs[0], b = cs[1], c = cs[2], d = cs[3];

        // console.log(cs);
        // console.log(gaussianElimination([[0,0,0,1],[1,1,1,1],[8,4,2,1],[27,9,3,1]],[0,1,4,9]));
        // console.log(ps);
        // console.log('fp1 = ' + fp1 + ' fp2 = ' + fp2 + 'fp3 = ' + fp3 + ' fp4 = ' + fp4);
        // console.log('a = ' + a + ' b = ' + b + ' c = ' + c + ' d = '+d);
        // console.log(floatFix(floatFix(a * x * x * x) + floatFix(b * x * x) + floatFix(c * x) + floatFix(d)));
        return a * x * x * x + b * x * x + c * x + d;
      }

      var getBrowserType = function () {
        var userAgent = navigator.userAgent,
          isOpera = userAgent.indexOf("Opera") > -1,
          isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera,
          isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE,
          isFirefox = userAgent.indexOf("Firefox") > -1,
          isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1,
          isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
        return isFirefox ? "Firefox" : isOpera ? "Opera" : isSafari ? "Safari" : isChrome ? "Chrome" : isIE ? "IE" : isEdge ? "Edge" : "Unknown";
      }

      /**
       * Get computed style.
       * @param {Element} ele Target element.
       * @param {String} prop Target property.
       * @returns Return a computed style.
       */
      var getStyle = function (ele, prop) {
        var propVal = window.getComputedStyle ? window.getComputedStyle(ele, null)[prop] : ele.currentStyle[prop];
        var safariBugFix = {
          "left": ele.offsetLeft,
          "top": ele.offsetTop,
          "right": document.documentElement.clientWidth - ele.offsetLeft - ele.offsetWidth,
          "bottom": document.documentElement.clientHeight - ele.offsetTop - ele.offsetWidth
        }
        return safariBugFix[prop] || propVal;
      }

      var requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };

      start();

      var mainEntry = (function () {
        // Initial parameters
        var style, count = 0, index = 0, per = -1000 / 60 / duration, origin = [], target = [], anim, keyframes = [], animType;
        for (var p in props) {
          style = getStyle(ele, p);
          origin.push(parseFloat(style));
          target.push(parseFloat(props[p]));
          anim = {
            'ease': 'cubic-bezier(.25,.1,.25,1)',
            'linear': 'cubic-bezier(0,0,1,1)',
            'ease-in': 'cubic-bezier(.42,0,1,1)',
            'ease-out': 'cubic-bezier(0,0,.58,1)',
            'ease-in-out': 'cubic-bezier(.42,0,.58,1)',
            'cubic-bezier': easing
          }
          // cubicBezierFunction('cubic-bezier(.17,.67,.78,.31)');
          count++;
        }
        for (var i = 0; i < count; i++) {
          var tempKeyFrames = [], tempKeyFrame = 0, len = Math.floor(60 / 1000 * duration), gap = target[i] - origin[i];
          // console.log('gap = ' + gap);
          tempKeyFrames.push(origin[i]);
          for (var k = 0; k < len; k++) {
            // console.log((per));
            console.log(cubicBezierFunction('cubic-bezier(.17,.67,.91,.38)', (per += 1000 / 60 / duration)));
            // console.log(tempKeyFrame);
            per += 1000 / 60 / duration;
            animType = anim[easing] ? anim[easing] : /cubic-bezier\([\d|,|\.]+\)/g.test(easing) ? anim['cubic-bezier'] : 'linear';
            tempKeyFrame = origin[i] + cubicBezierFunction(animType, per) * gap;
            // console.log(per);
            // console.log('per = ' + per);
            // console.log('per = ' + per + 'A = ' + cubicBezierFunction('cubic-bezier(0,1,1,0)', per));
            // console.log('B = ' + cubicBezierFunction('cubic-bezier(0,1,1,0)', per) * gap);
            tempKeyFrames.push(tempKeyFrame);
          }
          tempKeyFrames.push(target[i]);
          keyframes.push(tempKeyFrames);
          // console.log(keyframes[0]);
        }
        var go = function () {
          var pi = 0;
          for (var prop in props) {
            prop === 'opacity' ? ele.style[prop] = keyframes[pi][index] : ele.style[prop] = props[prop].indexOf('%') > -1 ? keyframes[pi][index] + '%' : keyframes[pi][index] + 'px';
            pi++;
          }
          index++;
          if (index !== keyframes[pi - 1].length) requestAnimFrame(go);
          else complete();
        }
        requestAnimFrame(go);
        return true;
      })();

      return;
    }

    return {
      addEvent: addEvent,
      animate: animate
    }
  })();

})(window);