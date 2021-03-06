'use strict';

(function () {

  var levelPinSlider = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var levelLine = document.querySelector('.effect-level__line');

  var moveSlider = function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;
    var minCoordsLeft = levelLine.offsetWidth - levelLine.offsetWidth;
    var maxCoordsRight = levelLine.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var moveLevelpin = function () {
        levelPinSlider.style.left = (levelPinSlider.offsetLeft - shift) + 'px';
        effectLevelDepth.style.width = ((levelPinSlider.offsetLeft - shift) / levelLine.offsetWidth * 100) + '%';
      };

      if (levelPinSlider.offsetLeft - shift > minCoordsLeft && levelPinSlider.offsetLeft - shift < maxCoordsRight) {
        moveLevelpin();
      }
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  var initialize = function () {
    levelPinSlider.addEventListener('mousedown', moveSlider);
  };

  var reset = function () {
    levelPinSlider.removeEventListener('mousedown', moveSlider);
  };

  window.uploadFormSlider = {
    initialize: initialize,
    reset: reset
  };
})();
