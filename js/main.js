import { renderCards } from './thumbnails.js';
import { showAlert } from './util.js';
import { setUserFormSubmit, closeImageEditor } from './image-upload-form.js';
import { getData } from './api.js';
import { showFilters, setupFilterButtons } from './filters.js';
import './photo-upload.js';

setUserFormSubmit(closeImageEditor);

getData()
  .then((photos) => {
    setupFilterButtons(photos);
    renderCards(photos);
    showFilters();
  })
  .catch(() => {
    showAlert();
  });


