
var Tree = function (trunkWidth, trunkLength, angle, depth) {
    this.trunkWidth = trunkWidth;
    this.trunkLength = trunkLength;
    this.angle = angle;
    this.depth = depth;
};

Tree.prototype = {
    createTree : function (ctx, startX, startY) {
        ctx.save();
        ctx.lineWidth = this.trunkWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, startY - this.trunkLength);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        this.trunkWidth = (this.trunkWidth < 0.5 ? 0.5 : this.trunkWidth * 1/2);
        var branchNum = Math.random() > 0.5 ? 3 : 4;
        // The angle of branches on trunk.
        if(!this.angle) this.angle = Math.PI / 6;
        // Depth of branch.
        if(!this.depth) this.depth = this.trunkWidth;
        
        for (var i = branchNum; i > 0; i--) {
            
            
            this.createTree(ctx, 0, 0);
        }


    }
};