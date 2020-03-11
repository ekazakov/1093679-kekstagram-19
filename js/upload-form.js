'use strict';

(function () {
  var getUploadFormImg = function () {
    var imgUploadForm = document.querySelector('.img-upload__overlay');
    var imgButtonCancel = document.querySelector('.img-upload__cancel');
    var imgUploadInput = document.querySelector('.img-upload__input');

    var templateError = document.querySelector('#error');
    var error = templateError.content.querySelector('.error');
    var templateSuccess = document.querySelector('#success');
    var success = templateSuccess.content.querySelector('.success');
    var pictures = document.querySelector('.pictures');

    var uploadForm = document.querySelector('.img-upload__form');
    var imgUpload = document.querySelector('.img-upload__preview').querySelector('img');

    function getModalOpen() {
      var modal = document.querySelector('body');
      modal.classList.add('modal-open');
    }
    function getModalClose() {
      var modal = document.querySelector('body');
      modal.classList.remove('modal-open');
    }

    var onPopupEscPress = function (evt) {
      if (window.util.isEscPressed) {
        if (evt.target !== window.util.hashtagInput && evt.target !== window.util.commentInput) {
          uploadFormClose();
        }
      }
    };

    function uploadFormOpen() {
      imgUploadForm.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
      getModalOpen();
      imgButtonCancel.addEventListener('click', uploadFormClose);
      window.uploadFormScale.addScale();
      window.uploadFormEffects.addEffects();
      window.uploadFormHashtags.addHashtags();
      window.uploadFormSlider.addSlider();
      imgUploadInput.removeEventListener('change', uploadFormOpen);
    }

    function uploadFormClose() {
      imgUploadForm.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      getModalClose();
      imgButtonCancel.removeEventListener('click', uploadFormClose);
      window.uploadFormEffects.removeEffects();
      window.uploadFormScale.removeScale();
      window.uploadFormHashtags.removeHashtags();
      window.uploadFormSlider.removeSlider();
      imgUploadInput.addEventListener('change', uploadFormOpen);
    }

    imgUploadInput.addEventListener('change', uploadFormOpen);


    uploadForm.addEventListener('submit', function (evt) {
      window.upload(new FormData(uploadForm), function (response) {
        uploadFormClose();
        uploadForm.reset();
        imgUpload.className = '';
        imgUpload.style = ' ';

        if (response) {
          successMessage();
        } else {
          errorMessage();
        }
      });
      evt.preventDefault();
    });


    pictures.appendChild(error);
    error.classList.add('visually-hidden');

    pictures.appendChild(success);
    success.classList.add('visually-hidden');


    var onClick = function () {
      error.classList.add('visually-hidden');
      success.classList.add('visually-hidden');
      error.removeEventListener('click', onClick);
      success.removeEventListener('click', onClick);
    };

    var onKeyDown = function () {
      if (window.util.isEscPressed) {
        success.classList.add('visually-hidden');
        error.classList.add('visually-hidden');
        document.removeEventListener('keydown', onKeyDown);
      }
    };


    var successMessage = function () {
      success.classList.remove('visually-hidden');
      success.addEventListener('click', onClick);
      document.addEventListener('keydown', onKeyDown);
    };

    var errorMessage = function () {
      error.classList.remove('visually-hidden');
      error.addEventListener('click', onClick);
      document.addEventListener('keydown', onKeyDown);
    };
  };

  window.uploadForm = {
    getUploadFormImg: getUploadFormImg
  };
})();
