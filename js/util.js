import { closeModal } from './photo-modal.js';

const checkStringLength = (str = '', maxSymbols = 1) => str.length <= maxSymbols;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterKey = (evt) => evt.key === 'Enter';

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 1 && num % 100 !== 11) {
    return nominative;
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 12 || num % 100 > 14)) {
    return genitiveSingular;
  } else {
    return genitivePlural;
  }
};

export {
  getRandomInt,
  getRandomElement,
  checkStringLength,
  isEnterKey,
  isEscapeKey,
  onDocumentKeydown,
  numDecline
};
