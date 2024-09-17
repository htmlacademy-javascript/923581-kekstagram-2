import { closeModal } from './photo-modal.js';

/**
 * Функция для проверки длины строки.
 * @param {*} str - строка, которую нужно проверить
 * @param {*} maxSymbols - максимальное количество символов
 * @returns {boolean} - возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
 */
const checkStringLength = (str = '', maxSymbols = 1) => str.length <= maxSymbols;

/**
 * Генерирует случайное целое число в заданном диапазоне.
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @returns {number} - случайное целое число
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Возвращает случайный элемент из переданного массива.
 * @param {Array} arr - массив для выбора элемента
 * @returns {*} - случайный элемент массива
 */
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

/**
 * Проверяет, нажата ли клавиша Escape.
 * @param {KeyboardEvent} evt - событие клавиатуры
 * @returns {boolean} - true, если нажата клавиша Escape
 */
const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

/**
 * Проверяет, нажата ли клавиша Enter.
 * @param {KeyboardEvent} evt - событие клавиатуры
 * @returns {boolean} - true, если нажата клавиша Enter
 */
const isEnterKey = (evt) => evt.key === 'Enter';

/**
 * Обрабатывает нажатия клавиш и закрывает модальное окно при нажатии клавиш Escape или Enter.
 * @param {KeyboardEvent} evt - событие клавиатуры
 */
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

/**
 * Склоняет числительное в зависимости от числа.
 * @param {number} num - число для склонения
 * @param {string} nominative - форма именительного падежа
 * @param {string} genitiveSingular - форма родительного падежа единственного числа
 * @param {string} genitivePlural - форма родительного падежа множественного числа
 * @returns {string} - склоненное слово
 */
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
