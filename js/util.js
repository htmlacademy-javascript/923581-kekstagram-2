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

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
// const titleElement = document.querySelector('#data-error').content.querySelector('.data-error__title');

const showAlert = (message) => {
  if (!dataErrorTemplate) {
    return; // Выход, если шаблон не найден
  }

  const popup = dataErrorTemplate.cloneNode(true);
  document.body.append(popup);

  setTimeout(() => {
    popup.remove();
  }, ALERT_SHOW_TIME);
};

// const showAlert = (message) => {
//   if (!dataErrorTemplate) {
//     return; // Выход, если шаблон не найден
//   }

//   const popup = dataErrorTemplate.cloneNode(true);

//   // Добавляем сообщение в элемент
//   const messageElement = popup.querySelector('.data-error__title'); // Предполагается, что у вас есть элемент для сообщения
//   if (messageElement) {
//     messageElement.textContent = message; // Устанавливаем текст сообщения
//   }

//   document.body.append(popup);

//   setTimeout(() => {
//     popup.remove();
//   }, ALERT_SHOW_TIME);
// };


// Функция для получения случайных изображений
function getRandomImages(arr, count) {
  // Перемешивание массива
  const shuffled = arr.sort(() => 0.5 - Math.random());

  // Возврат первых count элементов из перемешанного массива
  return shuffled.slice(0, count);
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
  getRandomImages
};
