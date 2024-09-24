import { isEscapeKey } from './util.js';
import { resetSlider } from './effect-level-slider.js';
import { updateScale, initScaleControls } from './image-utils.js';
import { isValid, hashtagInput, descriptionInput } from './image-upload-form-validator.js';

// Инициализация управления масштабом фотографии
initScaleControls();

// Определение элементов формы
const uploadForm = document.querySelector('.img-upload__form');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const uploadFileStart = uploadForm.querySelector('#upload-file');
const imageEditingFormClose = uploadForm.querySelector('#upload-cancel');
const effectLevelControl = uploadForm.querySelector('.img-upload__effect-level');

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

  // Удаляем обработчики событий при закрытии формы
  document.removeEventListener('keydown', onDocumentKeydown);
  imageEditingFormClose.removeEventListener('click', btnClick);
}

// Функция выбора фотографии
const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  imageEditingForm.classList.remove('hidden');
  resetSlider();
  updateScale();

  // Добавляем обработчики событий при открытии формы редактирования
  imageEditingFormClose.addEventListener('click', btnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Обработчик отправки формы
const onFormSubmit = (evt) => {
  if (!isValid()) {
    evt.preventDefault();
  }
};

// Добавление обработчиков событий к элементам формы
uploadFileStart.addEventListener('change', onPhotoSelect);
uploadForm.addEventListener('submit', onFormSubmit);
