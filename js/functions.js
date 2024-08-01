
import { checkStringLength } from './util.js';

//*  =============================================================================
// Функция №1
/*Функция для проверки длины строки.Она принимает строку, которую нужно проверить,
и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
и false, если строка длиннее.*/

// console.log('Функция №1');
// console.log(checkStringLength('видеоплеер', 10));
// console.log(checkStringLength('Функция для проверки длины строк', 30));
// console.log(checkStringLength('', 1));

// Функция №2
/*Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.*/

// console.log('Функция №2');
const isPalindrome = (str) => {

  // Нормализуем строку, приводя её к нижнему регистру и убирая пробельные символы
  const normalizedString = str.toLowerCase().replaceAll(' ', '');

  // Создаём пустую строку для хранения перевернутой строки
  let newString = '';

  // Создаем цикл для перебора символов в обратном порядке
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString.at(i);
  }

  // Сравниваем нормализованную и перевернутую строки
  return newString === normalizedString;
};

// console.log('Лёша на полке клопа нашёл - это палиндром? -', isPalindrome('Лёша на полке клопа нашёл'));
// console.log('ДовОд - это палиндром? -', isPalindrome('ДовОд'));
// console.log('АбраКадАбра - это палиндром? -', isPalindrome('АбраКадАбра'));

// Функция №3
/*Функция принимает строку,
извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN*/

// console.log('Функция №3');
function extractNumbersFromString(str) {
  // Проверяем, является ли аргумент строкой
  if (typeof str !== 'string') {
    // Если аргумент - число, преобразуем его в строку
    if (typeof str === 'number') {
      str = str.toString();
    } else {
      // Если аргумент не является ни строкой, ни числом, возвращаем NaN
      return NaN;
    }
  }

  // Используем регулярное выражение для извлечения цифр из строки
  const result = str.match(/\d+/g);

  // Если в строке нет ни одной цифры, возвращаем NaN
  if (!result) {
    return NaN;
  }

  // Преобразуем массив цифр в строку и затем в число
  return parseInt(result.join(''), 10);
}

// console.log('Ожидаем 2005 -', extractNumbersFromString('год 2005'));
// console.log('Ожидаем 2022 -', extractNumbersFromString('ECMAScript 2022'));
// console.log('Ожидаем 105 -', extractNumbersFromString('1 кефир, 0.5 батона'));
// console.log('Ожидаем 7 -', extractNumbersFromString('агент 007'));
// console.log('Ожидаем 1545454 -', extractNumbersFromString(1545454));

