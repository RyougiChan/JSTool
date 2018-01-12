var canvas = document.querySelector('#bg-yuki_rotate'),
    ctx = canvas.getContext('2d');

canvas.height = document.body.clientHeight;
canvas.width = document.body.clientHeight;

var imgs = [],
    yukis = [],
    state = [];
for (var i = 1; i < 9; i++) {
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
            if(k % 2 == 0) state.push({xs: 1, ys: -1});
            else state.push({xs: -1, ys: 1});
        };
    })(k);
}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// tx, ty 's growth state.

setInterval(function () {
    clear();
    for (var i = 0; i < yukis.length; i++) {
        var yuki = yukis[i],
            impact = getImpact(canvas, yuki);
        yuki.angle += (i + 1) * Math.PI / 180;

        // initial.
        if (impact[0] === -1 && impact[1] === -1 && impact[2] === -1 && impact[3] === -1) {
            if(state[i].xs === 1) yuki.tx += 1.0;
            else yuki.tx -= 1.0;
            if(state[i].ys === 1) yuki.ty += 1.0;
            else yuki.ty -= 1.0;
        } else {
            // catch a impaction.
            (function(i){
                impact.forEach(function (ip) {
                    if (ip === 0) {
                        if (state[i].xs === 1) yuki.tx += 1.0;
                        else yuki.tx -= 1.0;
                        
                        // change state.
                        yuki.ty += 1.0;
                        state[i].ys = 1;
                    }
                    if (ip === 1) {
                        yuki.tx -= 1.0;
                        state[i].xs = -1;
    
                        if (state[i].ys === 1) yuki.ty += 1.0;
                        else yuki.ty -= 1.0;
                    }
                    if (ip === 2) {
                        if (state[i].xs === 1) yuki.tx += 1.0;
                        else yuki.tx -= 1.0;
                        
                        yuki.ty -= 1.0;
                        state[i].ys = -1;
                    }
                    if (ip === 3) {
                        yuki.tx += 1.0;
                        state[i].xs = 1;
    
                        if (state[i].ys === 1) yuki.ty += 1.0;
                        else yuki.ty -= 1.0;
                    }
                }, this);
            })(i);
        }

        // re-draw.
        yuki.init(ctx);
    }
});

/**
 * Get Impact state.
 * @param {HTMLCanvasElement} canvas HTML <canvas> object.
 * @param {Yuki} yuki Yuki object defined in canvas-yuki.js.
 * 
 * @returns {[0|-1, 1|-1, 2|-1, 3|-1]} 
 *          Values meaning: 0 -> top impact; 1 -> right impact. 
 *          2 -> bottom impact. 3 -> left impact; -1 -> no impact.
 */
function getImpact(canvas, yuki) {
    var x = yuki.dx + yuki.tx,
        y = yuki.dy + yuki.ty,
        w = yuki.dw,
        h = yuki.dh,
        cw = canvas.width,
        ch = canvas.height,
        ti, ri, bi, li,
        ir = [];

    if (y <= 0) ti = true;
    if (x >= cw - w) ri = true;
    if (y >= ch - h) bi = true;
    if (x <= 0) li = true;

    if (ti) ir.push(0);
    else ir.push(-1);
    if (ri) ir.push(1);
    else ir.push(-1);
    if (bi) ir.push(2);
    else ir.push(-1);
    if (li) ir.push(3);
    else ir.push(-1);
    
    return ir;
}