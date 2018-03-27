
var Tree = function (trunkWidth, trunkLength, depth) {
    this.trunkWidth = trunkWidth;
    this.trunkLength = trunkLength;
    this.depth = depth;
};

Tree.prototype = {
    createTree: function (ctx, startX, startY, length, angle) {
        var endX = startX + length * Math.cos(angle),
            endY = startY - length * Math.sin(angle),
            branchNum = Math.random() < 0.5 ? 3 : 4,
            oangle = 15;
        ctx.save();
        ctx.lineWidth = this.trunkWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
};