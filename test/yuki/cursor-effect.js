var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    p;

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

function drawEffect(p) {
    var rNo = Math.round(Math.random() * 54),
        img = new Image();
    if(rNo == 0) rNo = 1;
    img.src = 'images/yuki_' + (rNo <= 9 ? '0' + rNo : rNo) + '.png';
    ctx.beginPath();
    ctx.drawImage(img, p.x, p.y);
    ctx.fill();
}

function mouseMoveHandler(e) {
    p = getRelPoint(e);
    drawEffect(p);
}

canvas.addEventListener('mousemove', mouseMoveHandler);