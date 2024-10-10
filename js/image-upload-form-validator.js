import { numDecline } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';

const error = () => errorMessage;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const isDescriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  descriptionInput,
  isDescriptionValid,
  `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов`
);

const isHashtagsValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/); // Разделение текста на массив хэштегов

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

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(hashtagInput, isHashtagsValid, error, 2, false);

export const isValid = () => pristine.validate();
export const reset = () => pristine.reset();
export { hashtagInput, descriptionInput };
