var main = document.querySelector('.main-container'),
    canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    yukis = [],
    savedCanvasData,
    p;

function saveCanvas() {
    savedCanvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreCanvas() {
    ctx.putImageData(savedCanvasData, 0, 0);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getRelPoint(e) {
    var clientX = e.clientX,
        clientY = e.clientY,
        rect = canvas.getBoundingClientRect(),
        left = rect.left,
        top = rect.top,
        x = clientX - left,
        y = clientY - top;

    return {
        x: x,
        y: y
    };
}

function getYukiImg(rNo) {
    var img = new Image();
    if (rNo === 0) rNo = 1;
    img.src = 'images/yuki_' + (rNo <= 9 ? '0' + rNo : rNo) + '.png';
    return img;
}

function createRandomYuki(p, alpha) {
    var rNo = Math.round(Math.random() * 54),
        img = getYukiImg(rNo),
        a = alpha || 1.0;
    img.onload = function () {
        var yuki = new Yuki(img, a, p.x, p.y);
        yuki.createYuki(ctx);
        yukis.push({ yuki: yuki, sp: p });
    };
}

function drawEffect(p) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateYukis(yukis, p);
    drawYukis(yukis, ctx);
}

function drawYukis(yukis, ctx) {
    yukis.forEach(function (yuki) {
        yuki.yuki.createYuki(ctx);
    }, this);
}

var count = 0;
function updateYukis(yukis, p) {
    yukis.forEach(function (yuki) {
        var y = yuki.yuki;
        if (y.alpha > 0) {
            y.alpha -= 1 / 120;
            y.dx += Math.random() > 0.5 ? Math.random() * 1 : -Math.random() * 1;
            y.dy += 1;
        } else {
            y.dx = p.x;
            y.dy = p.y;
            y.alpha = 1;
        }
    }, this);
}

var intervalID,
    anim;
function mouseMoveHandler(e) {
    if (intervalID) clearInterval(intervalID);
    var p = getRelPoint(e),
        x = p.x,
        y = p.y,
        a = 1,
        // Number of yuki
        n = 8;
    if (yukis.length === 0) {
        for (var i = 0; i < n; i++) {
            var tp = { x: x, y: y };
            createRandomYuki(tp, a);
            y += n;
            a -= 1 / n;
        }
    }
    intervalID = setInterval(function () {
        drawEffect(p);
    }, 50 / 3);
}

function mouseOutHandler(e) {
    // if (intervalID) clearInterval(intervalID);    
    clearCanvas();
}

function mouseOverHandler(e) {

}

saveCanvas();
function mouseDownHandler(e) {

}

function mouseUpHandler(e) {

}

function log(s) {
    console.log(s);
}

canvas.addEventListener('mousemove', mouseMoveHandler);
canvas.addEventListener('mouseover', mouseOverHandler);
canvas.addEventListener('mouseout', mouseOutHandler);
canvas.addEventListener('mousedown', mouseDownHandler);
canvas.addEventListener('mouseup', mouseUpHandler);

main.addEventListener('mousemove', mouseMoveHandler);
main.addEventListener('mouseout', mouseOutHandler);
