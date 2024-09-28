// import { generatePhotos } from './data.js';
import { renderCards } from './thumbnails.js';
import './image-upload-form.js';
import './effect-level-slider.js';
// import './api.js';

// Генерация массива фотографий
// const photos = generatePhotos();


fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    console.log(photos);
    renderCards(photos);
  });



