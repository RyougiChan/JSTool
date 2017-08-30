(function () {
  "use strict"
  /**
   * Create a specific animaion
   * @param {{}=} properties An object of CSS properties and values that the animation will move toward.
   * @param {string|number} duration A string or number determining how long the animation will run. default: 400.
   * @param {string} easing A string indicating which easing function to use for the transition. default: swing.
   * @param {Function} complete A function to call once the animation is complete, called once per matched element.
   * @returns Return
   */
  function animate(properties, duration, easing, complete) {
    if (!properties || !(properties instanceof Object) || !(complete instanceof Function)) return;
    var props = properties,
      duration = duration || 400,
      easing = easing || 'swing',
      complete = complete || function () { };

    return;
  }

})();