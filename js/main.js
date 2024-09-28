// import { generatePhotos } from './data.js';
import { renderCards } from './thumbnails.js';
import './image-upload-form.js';
import './effect-level-slider.js';
import { setUserFormSubmit, onImageEditingFormClose } from './image-upload-form.js';
import { getData } from './api.js';

// Генерация массива фотографий
// const photos = generatePhotos();


getData()
  .then((photos) => {
    console.log(photos);
    renderCards(photos);
  });

setUserFormSubmit(onImageEditingFormClose);


