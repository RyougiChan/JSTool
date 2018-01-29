(function () {
    'use strict';

    var canvas = document.querySelector('#canvas'),
        ctx = canvas.getContext('2d');

    var clickHandler = function (e) {
        var x = e.clientX,
            y = e.clientY,
            
            tree = new Tree(16, 240);
        
        tree.createTree(ctx, x, canvas.height);
    };
    canvas.addEventListener('click', clickHandler);

})();