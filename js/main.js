import { renderCards } from './thumbnails.js';
import './image-upload-form.js';
import './effect-level-slider.js';
import { setUserFormSubmit, onImageEditingFormClose } from './image-upload-form.js';
import { getData } from './api.js';

getData()
  .then((photos) => {
    renderCards(photos);
  });

setUserFormSubmit(onImageEditingFormClose);


