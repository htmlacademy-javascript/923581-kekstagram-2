import { renderCards } from './thumbnails.js';
import { showAlert } from './util.js';
import { setUserFormSubmit, closeImageEditor } from './image-upload-form.js';
import { getData } from './api.js';
import { showFilters, setupFilterButtons } from './filters.js';

getData()
  .then((photos) => {
    renderCards(photos); // Отображаем фотографии
    showFilters(); // Показываем фильтры
    setupFilterButtons(photos); // Передаем загруженные фотографии в функцию настройки фильтров
  })
  .catch(() => {
    showAlert(); // Показываем сообщение об ошибке
  });


setUserFormSubmit(closeImageEditor);
