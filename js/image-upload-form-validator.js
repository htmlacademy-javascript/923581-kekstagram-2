import { numDecline } from './util.js';

// Получаем элементы формы загрузки изображения и поля ввода
const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

// Константы для ограничения длины комментариев и хэштегов
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';

// Инициализация библиотеки Pristine для валидации формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Валидатор для проверки длины комментария
const isDescriptionValid = (value) => {
  const isValid = value.length <= MAX_DESCRIPTION_LENGTH;

  if (!isValid) {
    errorMessage = `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов`;
    showErrorMessage(descriptionInput); // Показываем сообщение об ошибке
  } else {
    removeErrorMessage(descriptionInput); // Удаляем сообщение об ошибке, если оно валидно
  }

  return isValid;
};

// Добавляем валидатор для описания с сообщением об ошибке
pristine.addValidator(
  descriptionInput,
  isDescriptionValid,
  () => errorMessage,
);

// Функция для проверки валидности хэштегов
const isHashtagsValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  // Если поле пустое, возвращаем true (валидно)
  if (!inputText) {
    removeErrorMessage(hashtagInput); // Удаляем сообщение об ошибке, если оно есть
    return true;
  }

  const inputArray = inputText.split(/\s+/); // Разделение текста на массив хэштегов

  // Массив правил для проверки валидности хэштегов
  const rules = [
    { check: inputArray.some((item) => item.length === 0), error: 'Не может быть пустых хэштегов' },
    { check: inputArray.some((item) => item.slice(1).includes('#')), error: 'Хэштеги не могут содержать символ \'#\' в середине' },
    { check: inputArray.some((item) => item[0] !== '#'), error: 'Каждый хэштег должен начинаться с символа \'#\'' },
    { check: inputArray.some((item) => item.length === 1), error: 'Хэштег не может состоять только из одного символа \'#\'' },
    { check: new Set(inputArray).size !== inputArray.length, error: 'Хэштеги не могут повторяться' },
    { check: inputArray.some((item) => item.length > MAX_SYMBOLS), error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, пожалуйста, исправьте` },
    { check: inputArray.length > MAX_HASHTAGS, error: `Нельзя использовать больше ${MAX_HASHTAGS} ${numDecline(MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов')}` },
    { check: inputArray.some((item) => !/^#[a-zA-Z0-9éА-Яа-яЁё]{1,19}$/i.test(item)), error: 'Хэштег содержит недопустимые символы' },
  ];

  // Проверяем все правила
  const isValid = rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error; // Запоминаем сообщение об ошибке
      showErrorMessage(hashtagInput); // Показываем сообщение об ошибке
    }
    return !isInvalid;
  });

  // Если нет ошибок, удаляем сообщение об ошибке
  if (isValid) {
    removeErrorMessage(hashtagInput);
  }

  return isValid;
};

// Функция для показа сообщения об ошибке в DOM
const showErrorMessage = (inputElement) => {
  const existingErrorDiv = inputElement.parentElement.querySelector('.pristine-error');

  if (!existingErrorDiv) {
    const newErrorDiv = document.createElement('div');
    newErrorDiv.className = "pristine-error img-upload__field-wrapper--error";
    newErrorDiv.textContent = errorMessage; // Устанавливаем текст ошибки
    inputElement.parentElement.appendChild(newErrorDiv); // Добавляем в DOM
  } else {
    existingErrorDiv.textContent = errorMessage; // Обновляем текст ошибки
    existingErrorDiv.style.display = "block"; // Показываем сообщение об ошибке
  }
};

// Функция для удаления сообщения об ошибке из DOM
const removeErrorMessage = (inputElement) => {
  const errorDiv = inputElement.parentElement.querySelector('.pristine-error');

  if (errorDiv) {
    errorDiv.remove(); // Удаляем элемент с сообщением об ошибке из DOM
  }
};

// Валидация хэштегов с использованием Pristine и добавление валидатора
pristine.addValidator(hashtagInput, isHashtagsValid, () => errorMessage, 2, false);

// Слушаем события ввода и очищаем сообщения об ошибках при изменении поля ввода
hashtagInput.addEventListener('input', () => {
  pristine.validate(); // Запускаем валидацию при каждом вводе
});

descriptionInput.addEventListener('input', () => {
  pristine.validate(); // Запускаем валидацию при каждом вводе в поле описания
});

export const isValid = () => pristine.validate();
export const reset = () => pristine.reset();
export { hashtagInput, descriptionInput };
