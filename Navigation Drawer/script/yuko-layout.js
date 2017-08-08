var yuko = {
  "util": function () {
    var timer = function (dom, start, stop, duration) {
      var distance = start - stop;
      var intID = setInterval(
        function () {
          if (start == stop) {
            clearInterval(intID);
            return;
          }
          start > stop ? start-- : start++;
          dom.style.left = start + "px";
        }
        , duration / distance
      );

    }
    var quadraticEquation = function (a, b, c, x) {
      return isNaN(a) ? undefined : a == 0 ? undefined : isNaN(b) ? [0, 0] : isNaN(c) ? [0, (-b / a)] : isNaN(x) ? (b * b - 4 * a * c) < 0 ? undefined : [((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)), (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)] : a * x * x + b * x + c;
    }
    var calcQuadraticAnimation = function (dom, duration) {
      var a = -dom.offsetWidth / (duration * duration);
      var b = 2 * dom.offsetWidth / duration;
      var c = -dom.offsetWidth;
      return function (x) {
        return quadraticEquation(a, b, c, x);
      };
    }
  },
  // "value": "ox" : start touch point x,"oy" : start touch point y,"ofx" : offset touch point x,"ofy" : offset touch point y,"ex" : end touch point x,"ey" : end touch point y, "dtx" : temp touch distance x, "dty" : temp touch distance x, "dx" : total touch distance x, "dy" : total touch distance y
  "value": { "ox": 0, "oy": 0, "ofx": 0, "ofy": 0, "ex": 0, "ey": 0, "dtx": 0, "dty": 0, "dx": 0, "dy": 0, "el": 0 },
  "drawer": function (dom, duration) {
    var drawerMask = document.getElementById("yuko-nav-drawer-container");
    var drawerButton = document.getElementById("yuko-nav-drawer-button");
    var drawerNavList = document.querySelector("#yuko-nav-list ul");
    var drawerNavItem = document.querySelectorAll("#yuko-nav-list li");
    var drawer = dom;
    var drawerX = drawer.offsetLeft;
    var drawerY = drawer.offsetTop;
    var drawerW = drawer.offsetWidth;
    var relative_distance = 0;
    // Touch listener.
    var touchStartListener, touchMoveListener, touchEndListener, clickListener, rippleEffectListener;
    touchStartListener = function (event) {
      // Set start point's coordinate.
      yuko.value.ox = event.changedTouches[0].pageX;
      yuko.value.oy = event.changedTouches[0].pageY;
      relative_distance = yuko.value.ox - drawerX;
      event.stopImmediatePropagation();
    }
    touchMoveListener = function (event) {
      yuko.value.ofx = event.changedTouches[0].pageX;
      yuko.value.ofy = event.changedTouches[0].pageY;
      yuko.value.dtx = yuko.value.ofx - yuko.value.ox;
      yuko.value.dty = yuko.value.ofy - yuko.value.oy;
      // Between the allowing slide area.
      if (yuko.value.dtx < drawerW - 10 && drawer.offsetLeft >= drawerX) {
        // If the drawer style => left is 0.
        if (yuko.value.el >= -(drawerW - 10) / 2) {
          // Slide from right to left
          yuko.value.dtx < 0 ? changeStyle(drawer, yuko.value.dtx) : drawer.offsetLeft == 0 ? undefined : changeStyle(drawer, drawerX + yuko.value.dtx);
        } else {
          changeStyle(drawer, drawerX + yuko.value.dtx);
        }
      }
      event.stopImmediatePropagation();
    }
    touchEndListener = function (event) {
      yuko.value.ex = event.changedTouches[0].pageX;
      yuko.value.ey = event.changedTouches[0].pageY;
      yuko.value.dx = yuko.value.ex - yuko.value.ox;
      yuko.value.dy = yuko.value.ey - yuko.value.oy;
      // yuko.value.dx < (drawerW-10) / 2 ? drawer.offsetLeft < -(drawerW-10) / 2 ? yuko.timer(drawer, drawer.offsetLeft, drawerX, duration) : yuko.timer(drawer, drawer.offsetLeft, 0, duration) : yuko.timer(drawer, drawer.offsetLeft, 0, duration);
      yuko.requestAnimation(drawer, yuko.value.dx, duration, false);
      yuko.value.el = drawer.offsetLeft;
      event.stopImmediatePropagation();
    }
    maskClickListener = function (event) {
      if (dom.offsetLeft === 0 && 10 + event.changedTouches[0].pageX > drawer.offsetWidth)
        yuko.requestAnimation(drawer, -1, duration, true);
    }
    buttonClickListener = function (event) {
      if (dom.offsetLeft === 10 - dom.offsetWidth)
        yuko.requestAnimation(drawer, 1, duration, true);
    }
    navItemClickListener = function (event) {
      if (dom.offsetLeft === 0)
        yuko.requestAnimation(drawer, -1, duration, true);
    }
    rippleEffectListener = function (event) {
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
      return false;
    }
    var changeStyle = function (dom, x) {
      dom.style.left = x + "px";
      drawerMask.style.background = "rgba(0,0,0," + (1 - Math.abs(x) / dom.offsetWidth) * 2 / 5 + ")";
    }
    // Attach event
    
    drawer.addEventListener("touchstart", touchStartListener, false);
    drawer.addEventListener("touchmove", touchMoveListener, false);
    drawer.addEventListener("touchend", touchEndListener, false);
    drawerMask.addEventListener("touchend", maskClickListener, false);
    drawerButton.addEventListener("touchend", buttonClickListener, false);
    drawerNavList.addEventListener("touchend", navItemClickListener, false);
    drawerNavItem.forEach(function (e) {
      e.addEventListener("touchstart", function () {
        drawerNavItem.forEach(function (ele) {
          ele.className = "yuko-nav-item";
        }, false);
      });
      e.addEventListener("touchend", function () {
        e.className = "yuko-nav-item item-selected";
      }, false);
      e.addEventListener("touchstart", rippleEffectListener, false);
    });
  },
  "requestAnimation": function (dom, dx, duration, isClicked) {
    var drawerMask = document.getElementById("yuko-nav-drawer-container");
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
    var curPos = dom.offsetLeft, op = dom.offsetLeft;
    duration == null ? duration = 300 : undefined;
    var animate = function () {
      // var speed = 5;
      // dx > 0 ? curPos > (10 - dom.offsetWidth) * 2 / 3 ? curPos += speed : curPos -= speed : curPos < (10 - dom.offsetWidth) / 3 ? curPos -= speed : curPos += speed;
      !isClicked ? dx > 0 ? curPos > (10 - dom.offsetWidth) * 2 / 3 ? curPos += Math.abs(op) * 16.7 / duration : curPos -= Math.floor(dom.offsetWidth - 10 + op) * 16.7 / duration : curPos < (10 - dom.offsetWidth) / 3 ? curPos -= Math.floor(dom.offsetWidth - 10 + op) * 16.7 / duration : curPos += Math.abs(op) * 16.7 / duration : op === 0 ? curPos -= Math.floor(dom.offsetWidth - 10 + op) * 16.7 / duration : curPos += Math.abs(op) * 16.7 / duration;

      curPos > 0 ? curPos = 0 : undefined;
      curPos < 10 - dom.offsetWidth ? curPos = 10 - dom.offsetWidth : undefined;
      dom.style.left = curPos + "px";
      drawerMask.style.background = "rgba(0,0,0," + (1 - Math.abs(curPos) / (dom.offsetWidth - 10)) * 2 / 5 + ")";

      dx > 0 ? curPos > (10 - dom.offsetWidth) * 2 / 3 ? curPos != 0 ?
        window.requestAnimationFrame(animate) : undefined : curPos != 10 - dom.offsetWidth ?
          window.requestAnimationFrame(animate) : undefined : curPos < (10 - dom.offsetWidth) / 3 ? curPos != 10 - dom.offsetWidth ? window.requestAnimationFrame(animate) : undefined : curPos != 0 ? window.requestAnimationFrame(animate) : undefined;
    }
    window.requestAnimationFrame(animate);
  }
}