'use strict';

(function () {
  var MAX_RANDOM_CARDS = 10;
  var MIN_CARDS = 1;
  var ACTIVE_CLASS_FILTER = 'img-filters__button--active';

  window.filtersCardsInitialize = function (cardsArr) {

    var filterDefault = document.querySelector('#filter-default');
    var filterRandom = document.querySelector('#filter-random');
    var filterDiscussed = document.querySelector('#filter-discussed');
    var filtersForm = document.querySelector('.img-filters__form');
    var picturesContainer = document.querySelector('.pictures');

    var filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');

    var filtersMap = {
      default: 'filter-default',
      random: 'filter-random',
      discussed: 'filter-discussed'
    };

    function getArrayRandElement(cards) {
      var randomInt = Math.floor(Math.random() * (cards.length - MIN_CARDS)) + MIN_CARDS;
      return randomInt;
    }

    var deleteCards = function () {
      for (var i = 0; i < picturesContainer.childNodes.length; i++) {
        if (picturesContainer.childNodes[i].nodeName === 'A') {
          picturesContainer.childNodes[i].remove();
        }
      }
    };

    var addActiveFilter = function (evt) {
      if (evt.target.type === 'button') {
        filterDefault.classList.remove(ACTIVE_CLASS_FILTER);
        filterRandom.classList.remove(ACTIVE_CLASS_FILTER);
        filterDiscussed.classList.remove(ACTIVE_CLASS_FILTER);
        evt.target.classList.add(ACTIVE_CLASS_FILTER);
      }
    };


    var getRandomCards = function () {
      var newCards = cardsArr.slice(0, cardsArr.length);
      var randomCards = [];

      for (var i = 0; i < MAX_RANDOM_CARDS; i++) {
        var temp = getArrayRandElement(newCards);
        randomCards.push(newCards[temp]);
        newCards.splice(temp, 1);
      }
      return randomCards;
    };

    var getSortCommentsCards = function () {
      var newCards = cardsArr.slice(0, cardsArr.length);

      var companare = function (a, b) {
        return b.comments.length - a.comments.length;
      };

      newCards.sort(companare);
      return newCards;
    };


    var onFilterChange = window.getDebounce(function (evt) {
      deleteCards();
      var temp;
      if (evt.target.id === filtersMap.default) {
        temp = cardsArr;
      }
      if (evt.target.id === filtersMap.random) {
        temp = getRandomCards();
      }
      if (evt.target.id === filtersMap.discussed) {
        temp = getSortCommentsCards();
      }
      window.renderCardsInitialize(temp);
      window.overlayfindCardUpdate(temp);
    });

    filtersForm.addEventListener('click', onFilterChange);
    filtersForm.addEventListener('click', addActiveFilter);
  };

})();
