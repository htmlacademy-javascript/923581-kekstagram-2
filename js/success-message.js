import { isEscapeKey } from './util.js';

const displaySuccessMessage = () => {
  const successTemplate = document.getElementById('success');
  if (!successTemplate) {
    return; // Если шаблон не найден, просто выходим из функции
  }

  const successMessage = successTemplate.content.cloneNode(true);
  document.body.append(successMessage);

  const closeButton = successMessage.querySelector('.success__button');

  // Функция закрытия сообщения
  const closeSuccessMessage = () => {
    const messageSection = document.querySelector('.success');
    if (messageSection) {
      messageSection.remove();
      document.removeEventListener('keydown', onEscKeyPress);
      document.removeEventListener('click', onOutsideClick);
    }
  };

  if (closeButton) {
    closeButton.addEventListener('click', closeSuccessMessage);
  }

  // Закрытие по клавише Esc
  function onEscKeyPress(evt) {
    if (isEscapeKey(evt)) {
      closeSuccessMessage();
    }
  }

  // Закрытие по клику вне сообщения
  function onOutsideClick(evt) {
    if (successMessage && !successMessage.contains(evt.target)) {
      closeSuccessMessage();
    }
  }

  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('click', onOutsideClick);
};

export { displaySuccessMessage };
