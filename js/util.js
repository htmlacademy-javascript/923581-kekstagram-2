import { closeModal } from './photo-modal.js';

// Функция для проверки длины строки
const checkStringLength = (str = '', maxSymbols = 1) => str.length <= maxSymbols;

// Функция для генерации случайного целого числа в заданном диапазоне
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для получения случайного элемента из массива
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// Функция для проверки, была ли нажата клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Функция для проверки, была ли нажата клавиша Enter
const isEnterKey = (evt) => evt.key === 'Enter';

// Обработчик события на нажатие клавиши на всем документе
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

// Функция для склонения числительных
const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 1 && num % 100 !== 11) {
    return nominative;
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 12 || num % 100 > 14)) {
    return genitiveSingular;
  } else {
    return genitivePlural;
  }
};

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {
  getRandomInt,
  getRandomElement,
  checkStringLength,
  isEnterKey,
  isEscapeKey,
  onDocumentKeydown,
  numDecline,
  showAlert
};
