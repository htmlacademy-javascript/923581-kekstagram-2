import { isEscapeKey, showAlert } from './util.js';
import { resetSlider } from './effect-level-slider.js';
import { updateScale, initScaleControls } from './image-utils.js';
import { isValid, hashtagInput, descriptionInput } from './image-upload-form-validator.js';
import { sendData } from './api.js';

// Инициализация управления масштабом фотографии
initScaleControls();

// Определение элементов формы
const uploadForm = document.querySelector('.img-upload__form');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const uploadFileStart = uploadForm.querySelector('#upload-file');
const imageEditingFormClose = uploadForm.querySelector('#upload-cancel');
const effectLevelControl = uploadForm.querySelector('.img-upload__effect-level');
const submitButton = uploadForm.querySelector('#upload-submit');

// Обработчик закрытия формы редактирования
const btnClick = () => {
  onImageEditingFormClose();
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
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

// Добавление обработчиков событий к элементам формы
uploadFileStart.addEventListener('change', onPhotoSelect);
// uploadForm.addEventListener('submit', onFormSubmit);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isValid()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            showAlert(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSubmit, onImageEditingFormClose };
