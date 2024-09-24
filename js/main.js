import { generatePhotos } from './data.js';
import { renderCards } from './thumbnails.js';
import './image-upload-form.js';
import './effect-level-slider.js';

// Генерация массива фотографий
const photos = generatePhotos();
renderCards(photos);
