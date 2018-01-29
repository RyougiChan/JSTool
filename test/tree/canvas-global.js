(function (win, doc) {
    'use strict';

    var global = win;

    if (!global.Yuko) {
        global.Yuko = global.YUKO = global.yuko = {};
    }

    Yuko.utility = (function () {
        Yuko.images = {};

        /**
         * Save canvas data.
         * @param {HTMLCanvasElement} canvas The canvas to be saved.
         */
        function saveCanvas(canvas) {
            if (!canvas)
                return;

            var ctx = canvas.getContext('2d'),
                id = canvas.id,
                data = ctx.getImageData(0, 0, canvas.width, canvas.height);

            Yuko.images[id] = data;
        }

        /**
         * Restore canvas from saved canvas datas.
         * @param {HTMLCanvasElement} canvas The canvas to be restore.
         * @param {string} id Identification of image data to be restored.
         */
        function restoreCanvas(canvas, id) {
            if (!canvas || !Yuko.images.hasOwnProperty(id))
                return;

            var ctx = canvas.getContext('2d'),
                data = Yuko.images[id];

            ctx.putImageData(data, 0, 0);
        }

    })();

})(window, document);