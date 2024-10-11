import { closeModal } from './photo-modal.js';
import { ALERT_SHOW_TIME } from './constants.js';

const checkStringLength = (str = '', maxSymbols = 1) => str.length <= maxSymbols;
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];
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

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const titleElement = document.querySelector('#data-error').content.querySelector('.data-error__title');

const showAlert = (message) => {
  if (!dataErrorTemplate) {
    return;
  }

  const popup = dataErrorTemplate.cloneNode(true);
  titleElement.textContent = message;
  document.body.append(popup);

  setTimeout(() => {
    popup.remove();
  }, ALERT_SHOW_TIME);
};

function getRandomImages(imagesArray, count) {
  const shuffled = imagesArray.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomInt,
  getRandomElement,
  checkStringLength,
  isEnterKey,
  isEscapeKey,
  onDocumentKeydown,
  numDecline,
  showAlert,
  getRandomImages,
  titleElement,
  debounce
};
