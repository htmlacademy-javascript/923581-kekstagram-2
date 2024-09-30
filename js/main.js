import { renderCards } from './thumbnails.js';
import { showAlert } from './util.js';
import { setUserFormSubmit, closeImageEditor } from './image-upload-form.js';
import { getData } from './api.js';
import { ErrorText } from './constants.js';

getData()
  .then((photos) => {
    renderCards(photos);
  })
  .catch(() => {
    showAlert(ErrorText.GET_DATA);
  });

setUserFormSubmit(closeImageEditor);


