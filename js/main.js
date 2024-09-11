import { generatePhotos } from './data.js';
import { renderCards } from './thumbnails.js';
import { showImageEditingForm } from './image-upload-form.js';


// Генерация массива фотографий
const photos = generatePhotos();
renderCards(photos);
showImageEditingForm();

