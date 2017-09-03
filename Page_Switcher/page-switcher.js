(function () {
  "use strict"

  if (!window.Yuko) {
    window.Yuko = Object();
  }

  Yuko.util = (function () {
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

    return {
      addEvent: addEvent,
      getComputedSizeInPx: getComputedSizeInPx
    }
  })()

  Yuko.widget = (function () {

    // Global parameter
    var userAgent = navigator.userAgent,
      winPhone = userAgent.match(/Windows Phone ([\d.]+)/),
      android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/),
      // Device parameter
      deviceWidth = document.documentElement.clientWidth,
      deviceHeight = document.documentElement.clientHeight,
      deviceRatio = deviceWidth / deviceHeight;

    /**
     * Make a specific box a response box
     * @param {{width:(number), height:(number)}=} design Design modal options
     *        width=: Design modal width
     *        height=: Design modal height
     * @param {{selectors:(string), width:(number), height:(number), left:(number), top:(number)}=} option Initial parameters
     *        selector=: box selector, using querySelectorAll() here.
     *        width=: box width, default 100. 
     *        height=: box height, default 100.
     *        width=: box left, default 0. 
     *        height=: box top, default 0.
     */
    function responseBox(design, option) {
      // design modal width and height
      var designWidth = design.width || 750,
        designHeight = design.height || 1334,

        // box ratio of width and height
        boxWidth = option.width || 100,
        boxHeight = option.height || 100,
        boxLeft = option.left || 0,
        boxTop = option.top || 0,
        boxRatio = boxWidth / boxHeight,

        // relative width and height to design modal
        reWidth = boxWidth / designWidth,
        reHeight = boxHeight / designHeight,

        // boxs selector
        boxs = document.querySelectorAll(option.selectors),
        boxCount = boxs.length;


      var setBoxStyle = function (ele) {
        ele.style.width = reWidth * deviceWidth + 'px';
        ele.style.height = ele.style.lineHeight = reWidth * deviceWidth / boxRatio + 'px';
        ele.style.left = typeof (boxLeft) === 'string' ? 'auto' : boxLeft * deviceWidth / designWidth + 'px';
        ele.style.top = typeof (boxTop) === 'string' ? 'auto' : boxTop * deviceWidth / designWidth + 'px';
      }

      while (boxCount-- > 0) {
        setBoxStyle(boxs[boxCount]);
      }
    }

    /**
     * Make a series of boxs to be response boxs automatically according to their origin style
     * @param {{width:(number), height:(number)}=} design Design modal options
     *        width=: Design modal width
     *        height=: Design modal height
     * @param {Array} selectors A series query selectors in array
     */
    function responseBoxAuto(design, selectors) {

      var boxWidth, boxHeight, boxLeft, boxTop, boxRatio,
        designWidth = design.width || 750,
        designHeight = design.height || 1334,
        reWidth, reHeight;

      var setBoxStyle = function (ele) {
        boxWidth = Yuko.util.getComputedSizeInPx(ele, 'width');
        boxHeight = Yuko.util.getComputedSizeInPx(ele, 'height');
        boxRatio = boxWidth / boxHeight;
        boxLeft = Yuko.util.getComputedSizeInPx(ele, 'left');
        boxTop = Yuko.util.getComputedSizeInPx(ele, 'top');
        reWidth = boxWidth / designWidth;
        reHeight = boxHeight / designHeight;

        ele.style.width = reWidth * deviceWidth + 'px';
        ele.style.height = ele.style.lineHeight = reWidth * deviceWidth / boxRatio + 'px';
        ele.style.left = isNaN(boxLeft) ? 'auto' : boxLeft * deviceWidth / designWidth + 'px';
        ele.style.top = isNaN(boxTop) ? 'auto' : boxTop * deviceWidth / designWidth + 'px';
        ele.style.position = 'absolute';
      }

      for (var i = 0; i < selectors.length; i++) {
        var eles = document.querySelectorAll(selectors[i]);
        for (var k = 0; k < eles.length; k++) {
          setBoxStyle(eles[k]);
        }
      }

    }

    /**
     * Make several pages to be a page switcher.
     * @param {NodeList|HTMLCollection} pages The page list to be switch.
     */
    function pageSwitcher(pages) {
      // If pages is undefined or pages is not a instance of NodeList or HTMLCollection, return.
      if (!pages || (!(pages instanceof NodeList) && !(pages instanceof HTMLCollection)) || pages.length < 2) return;

      var winWidth = document.body.clientWidth,
        winHeight = document.body.clientHeight,
        pageContainer = document.querySelector('.page-container'),
        visualPageIndex,
        visualPageType = pageContainer.getAttribute('data-page-type'),
        count = pages.length,
        pos = [], curPos, tempPos, nextPos = [],
        start, temp, end, tempDis, totalDis,
        pageTextContainer, pageTextContainerHeight, pageText,
        hasListener = false, curPagesBgTop;
      // Initial pos by push all potential positions
      for (var i = 0; i < count * 2 - 1; i++) {
        pos.push(100 * (i - count + 1));
      }

      var setTop = function (ele, top) {
        ele.style.top = top + '%';
      }

      var switchTo = function (positions) {
        for (var i = 0; i < count; i++) {
          setTop(pages[i], positions[i]);
        }
      }

      // If page type is '1', use this listener
      var tempTouchMoveListener = function (event) {
        temp = event.changedTouches[0].pageY;
        tempDis = temp - start;
        // Temperary positions
        tempPos = [];
        for (var i = 0; i < count; i++) {
          tempPos.push(curPos[i] + tempDis);
        }
        if (pageTextContainer.offsetHeight >= 80 && pageTextContainer.offsetHeight <= 180) {
          if ((pageTextContainer.offsetHeight === 180 && tempDis <= 0)) {
            if (pageTextContainerHeight === 180) {
              for (var i = 0; i < count; i++) {
                pages[i].style.top = curPos[i] + tempDis + 'px';
              }
            }
          } else if ((pageTextContainer.offsetHeight === 80 && tempDis >= 0)) {
            if (pageTextContainerHeight === 80) {
              for (var i = 0; i < count; i++) {
                pages[i].style.top = curPos[i] + tempDis + 'px';
              }
            }
          }
          else {
            var pageTextTempHeight, pageBgTop;
            var bgtop = curPagesBgTop.split(' ')[7];
            if (pageTextContainerHeight - tempDis > 180) pageTextTempHeight = 180;
            else if (pageTextContainerHeight - tempDis < 80) pageTextTempHeight = 80;
            else pageTextTempHeight = pageTextContainerHeight - tempDis;
            pageBgTop = parseFloat(bgtop.substring(0, bgtop.length - 2)) + tempDis;
            pageTextContainer.style.height = pageTextTempHeight + 'px';
            pages[visualPageIndex].style.background = '#A8DBEC url("images/images_01.png") center ' + pageBgTop + 'px / cover no-repeat';
            pageText.style.opacity = tempDis < 0 ? '' + (-tempDis / 100) : '' + (1 - tempDis / 100);
          }
        }
      }

      // Touch start listener
      var swipeStartListener = function (event) {
        start = 0; temp = 0; end = 0; tempDis = 0; totalDis = 0;
        start = event.changedTouches[0].pageY;
        curPos = [];
        for (var i = 0; i < count; i++) {
          // Restore current top.
          curPos.push(Yuko.util.getComputedSizeInPx(pages[i], 'top'));
          visualPageIndex = parseInt(pageContainer.getAttribute('data-page-id'))
          visualPageType = pageContainer.getAttribute('data-page-type');
          // Remove pages css property transition.
          pages[i].style.transition = '';

          if (visualPageType === '1') {// If page type is '1'
            curPagesBgTop = window.getComputedStyle(pages[visualPageIndex], null).getPropertyValue('background');
            pageTextContainer = pages[visualPageIndex].children[0];
            pageText = pageTextContainer.children[0];
            pageTextContainerHeight = pageTextContainer.offsetHeight;
            pageTextContainer.style.transition = '';
            if (!hasListener) {
              document.addEventListener('touchmove', tempTouchMoveListener);
              hasListener = true;
            }
          }
        }
      }

      // Touch move listener
      var swipeMoveListener = function (event) {
        temp = event.changedTouches[0].pageY;
        tempDis = temp - start;
        // If is first page and try to switch to previous page, return.
        // If is last page and try to switch to next page, return.
        if (visualPageIndex === 0 && tempDis > 0) return;
        if (visualPageIndex === count - 1 && tempDis < 0) return;

        // Temperary positions
        tempPos = [];
        for (var i = 0; i < count; i++) {
          tempPos.push(curPos[i] + tempDis);
        }

        if (visualPageType !== '1') {
          for (var i = 0; i < count; i++) {
            pages[i].style.top = curPos[i] + tempDis + 'px';
          }
        }
      }

      // Touch end listener
      var swipeEndListener = function (event) {
        document.removeEventListener('touchmove', tempTouchMoveListener);
        hasListener = false;
        end = event.changedTouches[0].pageY;
        totalDis = end - start;

        // Reset visualPageIndex where it is overflow(more than pages.length or less than 0).
        if (totalDis < 0 && visualPageIndex < count - 1) {
          if (visualPageType === '1') {
            if (pageTextContainer.offsetHeight === 180 && pageTextContainerHeight !== 80) {
              visualPageIndex++;
            }
          } else {
            visualPageIndex++;
          }
        }

        if (totalDis > 0 && visualPageIndex > 0) {
          if (visualPageType === '1') {
            if (pageTextContainer.offsetHeight === 80 && pageTextContainerHeight !== 180) {
              visualPageIndex--;
            }
          } else {
            visualPageIndex--;
          }
        }
        nextPos = pos.slice(count - visualPageIndex - 1, 2 * count - visualPageIndex - 1);

        // Set pages css property transition.
        for (var i = 0; i < count; i++) {
          pages[i].style.transition = 'top .5s ease';
        }
        if (visualPageType === '1') {
          pageTextContainer.style.transition = 'height .5s ease';
          pages[visualPageIndex].style.transition = 'top .5s ease, background .5s ease';

          // 
          if (totalDis < 0) {
            if (pageTextContainer.offsetHeight !== 180) {
              pages[visualPageIndex].style.background = '#A8DBEC url("images/images_01.png") center -100px / cover no-repeat';
              pageTextContainer.style.height = '180px';
              pageText.style.opacity = '1';
            }
            if (pageTextContainerHeight === 180) for (var i = 0; i < count; i++) switchTo(nextPos);
          }
          if (totalDis > 0) {
            if (pageTextContainer.offsetHeight !== 80) {
              pages[visualPageIndex].style.background = '#A8DBEC url("images/images_01.png") center 0px / cover no-repeat';
              pageTextContainer.style.height = '80px';
              pageText.style.opacity = '0';
            }
            if (pageTextContainerHeight === 80) for (var i = 0; i < count; i++) switchTo(nextPos);
          }
        } else
          for (var i = 0; i < count; i++) switchTo(nextPos);
        pageContainer.setAttribute('data-page-id', visualPageIndex.toString());
        pageContainer.setAttribute('data-page-type', pages[visualPageIndex].getAttribute('data-page-type'));
      }

      // Attach listener
      Yuko.util.addEvent(document, 'touchstart', swipeStartListener);
      Yuko.util.addEvent(document, 'touchmove', swipeMoveListener);
      Yuko.util.addEvent(document, 'touchend', swipeEndListener);

    }

    return {
      pageSwitcher: pageSwitcher,
      responseBox: responseBox,
      responseBoxAuto: responseBoxAuto
    }
  })()


})()