var canvas = document.querySelector('#bg-yuki_rotate'),
    ctx = canvas.getContext('2d');

canvas.height = document.body.clientHeight;
canvas.width = document.body.clientHeight;

var imgs = [],
    yukis = [],
    translate = [],
    dragging = null,
    start = { x: 0, y: 0 },
    move = { x: 0, y: 0 },
    end = { x: 0, y: 0 };
for (var i = 1; i < 8; i++) {
    var img = new Image();
    img.src = 'yae-sakura.jpg';
    imgs.push(img);
}
for (var k = 0; k < imgs.length; k++) {
    var e = imgs[k];
    (function (k) {
        imgs[k].onload = function () {
            var yuki = new Yuki(imgs[k], 1, -25, -25, 50, 50, 0, (k + 1) * 100, (k + 1) * 100);
            yuki.init(ctx);
            yukis.push(yuki);
        }
    })(k)
}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawYukis(yukis) {
    yukis.forEach(function (yuki) {
        yuki.init(ctx);
    }, this);
}
setInterval(function () {
    clear();
    for (var i = 0; i < yukis.length; i++) {
        var yuki = yukis[i];
        yuki.angle += (i + 1) * Math.PI / 180;
        yuki.init(ctx);
    }
});

var mousedownHandler = function (e) {
    e.preventDefault();
    var p = getRelPoint(e);
    start.x = p.x;
    start.y = p.y;
    yukis.forEach(function (yuki) {
        yuki.init(ctx);
        if (ctx.isPointInPath(p.x, p.y)) {
            console.log('>> down');
            dragging = yuki;
        }
        if (translate.length !== yukis.length) {
            translate.push({ x: yuki.tx, y: yuki.ty });
        }
    }, this);
},
    mousemoveHandler = function (e) {
        e.preventDefault();
        var p = getRelPoint(e);
        move.x = p.x;
        move.y = p.y;
        if (dragging) {
            dragging.init(ctx);
            dragging.tx = translate[yukis.indexOf(dragging)].x + move.x - start.x;
            dragging.ty = translate[yukis.indexOf(dragging)].y + move.y - start.y;
            drawYukis(yukis);
        }
    },
    mouseupHandler = function (e) {
        e.preventDefault();
        var p = getRelPoint(e);
        end.x = p.x;
        end.y = p.y;
        dragging = null;
        yukis.forEach(function (yuki) {
            translate[yukis.indexOf(yuki)].x = yuki.tx;
            translate[yukis.indexOf(yuki)].y = yuki.ty;
        }, this);
    };

canvas.addEventListener('mousedown', mousedownHandler);
canvas.addEventListener('mousemove', mousemoveHandler);
canvas.addEventListener('mouseup', mouseupHandler);

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