import { generatePhotos } from './data.js';
import { renderCards } from './thumbnails.js';
import './show-photo.js';

// Генерация массива фотографий
const photos = generatePhotos();
renderCards(photos);


