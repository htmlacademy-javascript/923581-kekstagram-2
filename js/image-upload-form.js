import { isEscapeKey, showAlert } from './util.js';
import { resetSlider } from './effect-level-slider.js';
import { updateScale, initScaleControls } from './image-utils.js';
import { isValid, hashtagInput, descriptionInput } from './image-upload-form-validator.js';
import { sendData } from './api.js';
import { displayErrorMessage } from './error-message.js';

// Инициализация управления масштабом фотографии
initScaleControls();

// Определение элементов формы
const uploadForm = document.querySelector('.img-upload__form');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const uploadFileStart = uploadForm.querySelector('#upload-file');
const imageEditingFormClose = uploadForm.querySelector('#upload-cancel');
const effectLevelControl = uploadForm.querySelector('.img-upload__effect-level');
const submitButton = uploadForm.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

// Обработчик закрытия формы редактирования
const onCloseButtonClick = () => onImageEditingFormClose();

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

  // Удаление обработчиков событий
  removeEventListeners();
}

// Добавление обработчиков событий
function addEventListeners() {
  imageEditingFormClose.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

// Удаление обработчиков событий
function removeEventListeners() {
  document.removeEventListener('keydown', onDocumentKeydown);
  imageEditingFormClose.removeEventListener('click', onCloseButtonClick);
}

// Функция выбора фотографии
const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  imageEditingForm.classList.remove('hidden');
  resetSlider();
  updateScale();

  // Добавляем обработчики событий при открытии формы редактирования
  addEventListeners();
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
        .catch((err) => {
          // Используем заголовок и кнопку из шаблона для отображения ошибки
          const errorMessageData = {
            title: 'Ошибка загрузки файла',
            buttonText: 'Попробовать ещё раз',
            formData: new FormData(evt.target)
          };
          displayErrorMessage(errorMessageData); // Передаем данные для отображения сообщения об ошибке
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSubmit, onImageEditingFormClose };
