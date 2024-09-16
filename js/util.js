
import { closeModal } from './photo-modal.js';
/*Функция для проверки длины строки.*/
/**
 *
 * @param {*} str - строка, которую нужно проверить
 * @param {*} maxSymbols - максимальное количество символов
 * @returns - возвращает true, если строка меньше или равна указанной длине,
и false, если строка длиннее.
 */
const checkStringLength = (str = '', maxSymbols = 1) => str.length <= maxSymbols;
//  пример вызова функции
// console.log(checkStringLength('Функция для проверки длины строк', 30));
//*  =========================================================================================

// Генерируем случайное целое число в заданном диапазоне.
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Возвращаем случайный элемент из переданного массива.
const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// оформляем проверку нажатой клавиши в утилитарную функцию
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

// Обработка нажатий клавиш
// Функция onDocumentKeydown обрабатывает нажатия клавиш и закрывает модальное окно при нажатии клавиш Escape или Enter.
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) || isEnterKey(evt)) { // Проверяем, нажата ли клавиша Escape или Enter
    evt.preventDefault(); // Предотвращаем действие по умолчанию
    closeModal(); // Закрываем модальное окно
  }
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 1 && num % 100 !== 11) {
    return nominative; // Если число оканчивается на 1, но не на 11
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 12 || num % 100 > 14)) {
    return genitiveSingular; // Если число оканчивается на 2, 3 или 4, но не на 12, 13 или 14
  } else {
    return genitivePlural; // Во всех остальных случаях
  }
};

export { getRandomInt, getRandomElement, checkStringLength, isEnterKey, isEscapeKey, onDocumentKeydown, numDecline };
