import { numDecline } from './util.js'; // Импортируем функцию для склонения

const uploadForm = document.querySelector('.img-upload__form'); // Форма загрузки изображения
const hashtagInput = uploadForm.querySelector('.text__hashtags'); // Поле для ввода хэштегов
const descriptionInput = uploadForm.querySelector('.text__description'); // Поле для ввода описания

const MAX_DESCRIPTION_LENGTH = 140; // Максимальная длина комментария
const MAX_HASHTAGS = 5; // Максимальное количество хэштегов
const MAX_SYMBOLS = 20; // Максимальная длина одного хэштега

let errorMessage = ''; // Сообщение об ошибке
const error = () => errorMessage; // Функция для получения сообщения об ошибке

// Инициализация библиотеки Pristine для валидации формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Валидатор для проверки длины комментария
const isDescriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

// Добавляем валидатор для описания
pristine.addValidator(
  descriptionInput,
  isDescriptionValid,
  `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов`
);

// Функция для проверки валидности хэштегов
const isHashtagsValid = (value) => {
  errorMessage = ''; // Сброс сообщения об ошибке
  const inputText = value.toLowerCase().trim(); // Приведение текста к нижнему регистру и удаление пробелов

  // Если ввод пустой, считаем его валидным
  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/); // Разделение текста на массив хэштегов

  const rules = [ // Массив правил для проверки
    {
      check: inputArray.some((item) => item.length === 0), // Проверка на пустые хэштеги
      error: 'Не может быть пустых хэштегов',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')), // Проверка на наличие символа '#' в середине хэштега
      error: 'Хэштеги не могут содержать символ \'#\' в середине',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'), // Проверка, что каждый хэштег начинается с символа '#'
      error: 'Каждый хэштег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item) => item.length === 1), // Проверка, что хэштег не состоит только из одного символа '#'
      error: 'Хэштег не может состоять только из одного символа \'#\'',
    },
    {
      check: new Set(inputArray).size !== inputArray.length, // Проверка на дубликаты
      error: 'Хэштеги не могут повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS), // Проверка длины каждого хэштега
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, пожалуйста, исправьте`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS, // Проверка на количество хэштегов
      error: `Нельзя использовать больше ${MAX_HASHTAGS} ${numDecline(MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов')}`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zA-Z0-9éА-Яа-яЁё]{1,19}$/i.test(item)), // Проверка формата хэштегов с поддержкой кириллицы
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => { // Проверяем все правила
    const isInvalid = rule.check; // Определяем, есть ли ошибка по текущему правилу
    if (isInvalid) {
      errorMessage = rule.error; // Установка сообщения об ошибке
    }
    return !isInvalid; // Возвращаем true, если нет ошибок
  });
};

// Валидация хэштегов с использованием Pristine
pristine.addValidator(hashtagInput, isHashtagsValid, error, 2, false);

// Экспорт функций валидации
export const isValid = () => pristine.validate();
export const reset = () => pristine.reset();
