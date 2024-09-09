import { generatePhotos } from './data.js';
import { renderCards } from './thumbnails.js';


// Генерация массива фотографий
const photos = generatePhotos();
renderCards(photos);

