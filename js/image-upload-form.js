import { onDocumentKeydown } from './util.js';
// import { onEffectChange } from './effects-slider.js';
import { error, isHashtagsValid } from './hashtag-validation.js';

const SCALE_STEP = 6.25;
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadCancel = imgUploadForm.querySelector('#upload-cancel');
const smaller = imgUploadForm.querySelector('.scale__control--smaller');
const bigger = imgUploadForm.querySelector('.scale__control--bigger');
const img = imgUploadForm.querySelector('.img-upload__preview');
const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imgUploadForm.querySelector('.effects__list');
const inputHashtag = imgUploadForm.querySelector('.text__hashtags');
const inputDescription = imgUploadForm.querySelector('.text__description');

// Скрытое поле для отправки значения масштаба
const hiddenScaleInput = document.createElement('input');
hiddenScaleInput.type = 'hidden';
hiddenScaleInput.name = 'scale';
imgUploadForm.appendChild(hiddenScaleInput);

let scale = 1;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Функция проверки длины комментария
const isDescriptionValid = (value) => {
  return value.length <= 140; // Проверка на максимальную длину
};

const btnClick = () => {
  onPhotoSelect();
};

// Добавление валидатора для описания
pristine.addValidator(inputDescription, isDescriptionValid, 'Длина комментария не может превышать 140 символов', 2, false);

function onImgUploadClose() {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  imgUploadCancel.tabIndex = 2; // Устанавливаем tabindex для кнопки закрытия
  uploadOverlay.tabIndex = 1; // Устанавливаем tabindex для модального окна
  uploadOverlay.focus(); // Устанавливаем фокус на модальное окно
  scale = 1;
  updateScale();
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  imgUploadForm.reset();

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutsideClick);
};


function onOutsideClick(evt) {
  if (!uploadOverlay.contains(evt.target)) { // Проверяем, был ли клик вне области формы
    onImgUploadClose();
  }
}

const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');

  // Добавляем обработчики событий
  imgUploadCancel.addEventListener('click', onImgUploadClose);

  document.addEventListener('keydown', onDocumentKeydown); // Используем общий обработчик для всех клавиш
  document.addEventListener('click', onOutsideClick); // Добавляем обработчик клика вне формы
};

const updateScale = () => {
  img.style.transform = `scale(${scale})`;
  scaleControl.value = `${scale * 100}%`;
  hiddenScaleInput.value = scale; // Обновление скрытого поля с масштабом
};

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    updateScale();
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    updateScale();
  }
};

const resetScaleOnEffectChange = () => {
  scale = 1; // Сброс масштаба при смене эффекта
  updateScale();
};

effectsList.addEventListener('change', () => {
  resetScaleOnEffectChange();
});

const onHashtagInput = () => {
  isHashtagsValid(inputHashtag.value);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    inputHashtag.value = inputHashtag.value.trim().replace(/\s+/g, ' ');
    imgUploadForm.submit();
  }
};

pristine.addValidator(inputHashtag, isHashtagsValid, error, 2, false);

uploadFile.addEventListener('change', onPhotoSelect);
smaller.addEventListener('click', onSmallerClick);
bigger.addEventListener('click', onBiggerClick);
// effectsList.addEventListener('change', onEffectChange);
inputHashtag.addEventListener('input', onHashtagInput);
imgUploadForm.addEventListener('submit', onFormSubmit);

// export { showImageEditingForm };


/* 9.16.Открытое занятие.Внешние API и сторонние библиотеки

8:45 - Код получает доступ к различным элементам модального окна
9:12 - upload - file
13:58 - Обработка нажатий клавиш - Функция onDocumentKeydown
15:36 - Напишите код для валидации формы добавления изображения, используя библиотеку Pristine
18:07 - подключение Pristine.JS
48:47 - валидация длины комментария
52:18 - сообщение об ошибке isHashtagsVal id
55:15 - правила написания хэштега (ошибка)
57:20 - функция подбора слова зависимости окончания
1:02 - запрет на закрытие формы когда стоит фокус на инпуте
1:03 - более надёжная проверка  закрытия формы
1:04 - Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.
1:06 - второе задание 9.15. Помощь друга


*/
