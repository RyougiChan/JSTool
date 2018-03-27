
var Tree = function (trunkWidth, trunkLength, depth) {
    this.trunkWidth = trunkWidth;
    this.trunkLength = trunkLength;
    this.depth = depth;
};

Tree.prototype = {
    createBranch: function (ctx, startX, startY, length, angle) {
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

        if (this.depth > 0) {
            for (var i = 0; i < branchNum; i++) {
                // Left or right branch: if < 0.5 -> left; if > 0.5 -> right.
                var isLeft = Math.random() < 0.5 ? true : false;
                
                if (isLeft) {
                    angle = 2 * Math.PI - angle;
                }
                if(i === branchNum - 1) {
                    this.trunkWidth = (this.trunkWidth < 0.5 ? 0.5 : this.trunkWidth * 1 / 2);
                    this.depth--;
                    length *= 2 / 3;
                    angle += oangle;
                }
                this.createBranch(ctx, endX, endY, length, angle);
            }
        }
    },
    createTree: function (ctx, startX, startY, length, angle) {
        // Craete trunk.
        var endX = startX + length * Math.cos(Math.PI / 2),
            endY = startY - length * Math.sin(Math.PI / 2);
        ctx.save();
        ctx.lineWidth = this.trunkWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        // Create branches
        this.createBranch(ctx, endX, endY, length, angle);
    }
};