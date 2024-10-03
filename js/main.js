import { renderCards } from './thumbnails.js';
import { showAlert } from './util.js';
import { setUserFormSubmit, closeImageEditor } from './image-upload-form.js';
import { getData } from './api.js';
import { showFilters } from './filters.js';

getData()
  .then((photos) => {
    renderCards(photos);
  })
  .catch(() => {
    showAlert();
  });
  
showFilters();
setUserFormSubmit(closeImageEditor);
