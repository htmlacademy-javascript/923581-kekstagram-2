import { renderCards } from './thumbnails.js';
import { showAlert } from './util.js';
import './image-upload-form.js';
import { getData } from './api.js';
import { initFilters } from './filters.js';
import './photo-upload.js';

getData()
  .then((photos) => {
    initFilters(photos);
    renderCards(photos);
  })
  .catch(() => {
    showAlert();
  });

// setUserFormSubmit(closeImageEditor);
