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

const showAlert = (message) => {
  const errorTemplate = document.getElementById('error');
  if (!errorTemplate) {
    console.error("Шаблон ошибки не найден");
    return; // Выход, если шаблон не найден
  }

  // Клонируем содержимое шаблона
  const errorMessage = errorTemplate.content.cloneNode(true);

  // Находим элемент для вставки сообщения
  const messageContainer = errorMessage.querySelector('.error__message');
  if (messageContainer) {
    messageContainer.textContent = message; // Устанавливаем текст сообщения
  }

  // Добавляем сообщение перед закрывающим тегом </body>
  document.body.append(errorMessage);

  // Находим кнопку закрытия
  const closeButton = document.querySelector('.error__button');

  // Функция закрытия сообщения
  const closeErrorMessage = () => {
    const messageSection = document.querySelector('.error');
    if (messageSection) {
      messageSection.remove();
      document.removeEventListener('keydown', onEscKeyPress);
      document.removeEventListener('click', onOutsideClick);
    }
  };

  // Закрытие по клавише Esc
  const onEscKeyPress = (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorMessage();
    }
  };

  // Закрытие по клику вне сообщения
  const onOutsideClick = (evt) => {
    if (errorMessage && !errorMessage.contains(evt.target)) {
      closeErrorMessage();
    }
  };

  // Проверка наличия кнопки
  if (closeButton) {
    closeButton.addEventListener('click', closeErrorMessage);
  } else {
    console.error("Кнопка закрытия сообщения об ошибке не найдена");
  }

  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('click', onOutsideClick);
};

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
