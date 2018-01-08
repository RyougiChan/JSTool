var canvas = document.querySelector('#canvas'),
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

function drawYuki(yuki) {
    yuki.createYuki(ctx);
    yukis.push(yuki);
}

function drawEffect(p) {
    var rNo = Math.round(Math.random() * 54),
        img = getYukiImg(rNo);
    img.onload = function () {
        var yuki = new Yuki(img, 1.0, p.x, p.y);
        drawYuki(yuki);
    };
}

function update() {
    yukis.forEach(function (yuki) {
        var alpha = yuki.getAlpha(),
            changeAlpha = function () {
                alpha -= 0.2;
                if(alpha < 0) alpha = 0;
                log(alpha);
                yuki.setAlpha(alpha);
                drawYuki(yuki);
                if(alpha > 0) {
                    window.requestAnimationFrame(changeAlpha);
                }
            };
        window.requestAnimationFrame(changeAlpha);
    });
}

function mouseMoveHandler(e) {
    // p = getRelPoint(e);
    // drawEffect(p);
}

function mouseOverHandler(e) {

}

function mouseDownHandler(e) {
    // saveCanvas();
    p = getRelPoint(e);
    drawEffect(p);
}

function mouseUpHandler(e) {
    // restoreCanvas();
    update();
}

function log(s) {
    console.log(s);
}

canvas.addEventListener('mousemove', mouseMoveHandler);
canvas.addEventListener('mouseover', mouseOverHandler);
canvas.addEventListener('mousedown', mouseDownHandler);
canvas.addEventListener('mouseup', mouseUpHandler);