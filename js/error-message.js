import { isEscapeKey } from './util.js';

const displayErrorMessage = (formData) => {
  const errorTemplate = document.getElementById('error');
  if (!errorTemplate) {
    console.error("Шаблон ошибки не найден");
    return; // Выход, если шаблон не найден
  }

  // Клонируем содержимое шаблона
  const errorMessage = errorTemplate.content.cloneNode(true);

  // Добавляем сообщение перед закрывающим тегом </body>
  document.body.append(errorMessage);

  // Находим кнопку закрытия
  const closeButton = document.querySelector('.error__button');

  // Функция закрытия сообщения
  const closeErrorMessage = () => {
    const messageSection = document.querySelector('.error');
    if (messageSection) {
      messageSection.remove();
      document.removeEventListener('keydown', onEscKeyPress);
      document.removeEventListener('click', onOutsideClick);
    }
  };

  // Функция сохранения данных формы
  const saveFormData = () => {
    localStorage.setItem('formData', JSON.stringify(Object.fromEntries(formData))); // Сохраняем в localStorage
  };

  // Проверка наличия кнопки
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeErrorMessage();
      saveFormData(); // Сохраняем данные при закрытии сообщения
    });
  } else {
    console.error("Кнопка закрытия сообщения об ошибке не найдена");
  }

  // Закрытие по клавише Esc
  const onEscKeyPress = (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorMessage();
      saveFormData(); // Сохраняем данные при закрытии сообщения
    }
  };

  // Закрытие по клику вне сообщения
  const onOutsideClick = (evt) => {
    // Проверяем, был ли клик вне области сообщения
    if (errorMessage && !errorMessage.contains(evt.target)) {
      closeErrorMessage();
      saveFormData(); // Сохраняем данные при закрытии сообщения
    }
  };

  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('click', onOutsideClick);
};

export { displayErrorMessage };
