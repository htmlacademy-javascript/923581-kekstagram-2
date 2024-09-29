import { isEscapeKey } from './util.js';

const displaySuccessMessage = () => {
  const successTemplate = document.getElementById('success');
  if (!successTemplate) {
    return; // Выход, если шаблон не найден
  }

  const successMessage = successTemplate.content.cloneNode(true);

  // Добавляем сообщение перед закрывающим тегом </body>
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
  const onEscKeyPress = (evt) => {
    if (isEscapeKey(evt)) {
      closeSuccessMessage();
    }
  };

  // Закрытие по клику вне сообщения
  const onOutsideClick = (evt) => {
    if (successMessage && !successMessage.contains(evt.target)) {
      closeSuccessMessage();
    }
  };

  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('click', onOutsideClick);
};

export { displaySuccessMessage };
