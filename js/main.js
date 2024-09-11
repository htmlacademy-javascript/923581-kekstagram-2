import { generatePhotos } from './data.js';
import { renderCards } from './thumbnails.js';
import './image-upload-form.js';


// Генерация массива фотографий
const photos = generatePhotos();
renderCards(photos);

