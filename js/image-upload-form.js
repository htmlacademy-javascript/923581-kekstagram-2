import { isEscapeKey } from './util.js';
import { resetSlider } from './effect-level-slider.js';
import { updateScale, onSmallerClick, onBiggerClick } from './image-utils.js';
import { isValid, hashtagInput, descriptionInput } from './image-upload-form-validator.js';

// Определение элементов формы
const uploadForm = document.querySelector('.img-upload__form');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const uploadFileStart = uploadForm.querySelector('#upload-file');
const imageEditingFormClose = uploadForm.querySelector('#upload-cancel');
const effectLevelControl = uploadForm.querySelector('.img-upload__effect-level');


// Определяем элементы управления масштабом
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');

// Обработчик закрытия формы редактирования
const btnClick = () => {
  onImageEditingFormClose();
};

// Обработчик нажатий клавиш
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else {
      onImageEditingFormClose();
    }
  }
};

// Функция закрытия формы редактирования
function onImageEditingFormClose() {
  document.body.classList.remove('modal-open');
  imageEditingForm.classList.add('hidden');
  effectLevelControl.classList.add('hidden');
  uploadForm.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
  imageEditingFormClose.removeEventListener('click', btnClick);
}

// Функция выбора фотографии
const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  imageEditingForm.classList.remove('hidden');
  resetSlider();
  updateScale();

  imageEditingFormClose.addEventListener('click', btnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Обработчик отправки формы
const onFormSubmit = (evt) => {
  if (!isValid()) {
    evt.preventDefault();
  }
};

uploadFileStart.addEventListener('change', onPhotoSelect);
uploadForm.addEventListener('submit', onFormSubmit);
scaleControlSmaller.addEventListener('click', onSmallerClick);
scaleControlBigger.addEventListener('click', onBiggerClick);
