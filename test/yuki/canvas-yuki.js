/**
 * Init a Yuki object with a specific image and a series of parameters.
 * @param {Image} image An element to draw into the context. The specification permits any canvas image source (CanvasImageSource), specifically, a CSSImageValue, an HTMLImageElement, an SVGImageElement, an HTMLVideoElement, an HTMLCanvasElement, an ImageBitmap, or an OffscreenCanvas. 
 * @param {number} dx The X coordinate in the destination canvas at which to place the top-left corner of the source image.
 * @param {number} dy The Y coordinate in the destination canvas at which to place the top-left corner of the source image.
 * @param {number} dw The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
 * @param {number} dh The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
 * @param {number} alpha The canvas context's globalAlpha property. Default: 1.0.
 */
var Yuki = function (image, alpha, dx, dy, dw, dh) {
    this.image = image;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw || image.width;
    this.dh = dh || image.height;
    this.alpha = alpha || 1.0;
};

Yuki.prototype = {
    createYuki: function (ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.drawImage(this.image, this.dx, this.dy, this.dw, this.dh);
        ctx.closePath();
    },
    init: function (ctx) {
        ctx.save();
        this.createYuki(ctx);
        ctx.restore();
    },
    setImage: function (image) {
        this.image = image;
    },
    moveTo: function (dx, dy) {
        this.dx = dx;
        this.dy = dy;
    },
    scaleTo: function (dw, dh) {
        this.dw = dw;
        this.dh = dh;
    },
    getAlpha: function () {
        return this.alpha;
    },
    setAlpha: function (alpha) {
        this.alpha = alpha;
    }
};