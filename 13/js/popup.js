import { setEscapeControl, removeEscapeControl } from './escape-control.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const templates = {
  success: successTemplate,
  error: errorTemplate,
};

const openPopup = (type = 'success') => {
  if (!templates[type]) {
    return;
  }
  const popup = templates[type].cloneNode(true);
  document.body.append(popup);
  setEscapeControl(() => {
    popup.remove();
  });

  popup.addEventListener('click', ({ target }) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      popup.remove();
      removeEscapeControl();
    }
  });
};

export { openPopup };
