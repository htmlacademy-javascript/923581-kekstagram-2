import { resetSlider } from './effect-level-slider.js';
import { updateScale, initScaleControls } from './image-utils.js';
import { isValid, hashtagInput, descriptionInput, reset as resetValidation } from './image-upload-form-validator.js';
import { sendData } from './api.js';
import { openPopup } from './popup.js';
import { setEscapeControl, removeEscapeControl } from './escape-control.js';
import { resetImage } from './image-effects.js';
import { SubmitButtonText } from './constants.js';

initScaleControls();

const uploadForm = document.querySelector('.img-upload__form');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const uploadFileStart = uploadForm.querySelector('#upload-file');
const imageEditingFormClose = uploadForm.querySelector('#upload-cancel');
const effectLevelControl = uploadForm.querySelector('.img-upload__effect-level');
const submitButton = uploadForm.querySelector('#upload-submit');

const onCloseButtonClick = () => {
  closeImageEditor();
  removeEscapeControl();
};

const attachEventListeners = () => {
  imageEditingFormClose.addEventListener('click', onCloseButtonClick);
};

const detachEventListeners = () => {
  imageEditingFormClose.removeEventListener('click', onCloseButtonClick);
};

function closeImageEditor() {
  document.body.classList.remove('modal-open');
  imageEditingForm.classList.add('hidden');
  effectLevelControl.classList.add('hidden');
  uploadForm.reset();
  resetValidation();
  resetImage();
  detachEventListeners();
}

const canCloseForm = () => !(document.activeElement === hashtagInput || document.activeElement === descriptionInput);

const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  imageEditingForm.classList.remove('hidden');
  resetSlider();
  updateScale(true);

  attachEventListeners();
  setEscapeControl(closeImageEditor, canCloseForm);
};

uploadFileStart.addEventListener('change', onPhotoSelect);

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
  submitButton.textContent = isBlocked ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmitButton(true);
    sendData(new FormData(evt.target))
      .then((() => {
        closeImageEditor();
        removeEscapeControl();
        openPopup('success');
      }))
      .catch(() => {
        openPopup('error');
      })
      .finally(() => blockSubmitButton(false));
  }
});

export { closeImageEditor };
