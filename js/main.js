import { renderCards } from './thumbnails.js';
import { showAlert } from './util.js';
import { setUserFormSubmit, closeImageEditor } from './image-upload-form.js';
import { getData } from './api.js';
import { showFilters, setupFilterButtons } from './filters.js';
import './photo-upload.js';

getData()
  .then((photos) => {
    setupFilterButtons(photos); // Настраиваем кнопки фильтров с загруженными данными
    renderCards(photos); // Отображаем фотографии по умолчанию
    showFilters(); // Показываем фильтры
  })
  .catch(() => {
    showAlert(); // Показываем сообщение об ошибке
  });

setUserFormSubmit(closeImageEditor);
