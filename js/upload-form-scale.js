'use strict';

(function () {

  var STEP_VALUES = ['25', '50', '75', '100'];
  var smallScaleBtn = document.querySelector('.scale__control--smaller');
  var biggerScaleBtn = document.querySelector('.scale__control--bigger');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var imgUploadDiv = document.querySelector('.img-upload__preview').querySelector('img');
  var stepValue = 3;

  function getSmallScale() {
    if (scaleControlInput.value === '25%') {
      scaleControlInput.value = '25%';
    } else {
      stepValue--;
      scaleControlInput.value = STEP_VALUES[stepValue] + '%';
      imgUploadDiv.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
    }
  }

  function getBiggerScale() {
    if (scaleControlInput.value === '100%') {
      scaleControlInput.value = '100%';
    } else {
      stepValue++;
      scaleControlInput.value = STEP_VALUES[stepValue] + '%';
      if (STEP_VALUES[stepValue] === '100') {
        imgUploadDiv.style.transform = 'scale(1.0)';
      } else {
        imgUploadDiv.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
      }
    }
  }

  var increase = function () {
    smallScaleBtn.addEventListener('click', getSmallScale);
    biggerScaleBtn.addEventListener('click', getBiggerScale);
    scaleControlInput.value = '100%';
    imgUploadDiv.style.transform = 'scale(1.0)';
    stepValue = 3;
  };

  var decrease = function () {
    smallScaleBtn.removeEventListener('click', getSmallScale);
    biggerScaleBtn.removeEventListener('click', getBiggerScale);
  };

  window.uploadFormScale = {
    increase: increase,
    decrease: decrease
  };
})();
