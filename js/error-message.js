import { isEscapeKey } from './util.js';

const displayErrorMessage = (formData) => {
  const errorTemplate = document.getElementById('error');
  if (!errorTemplate) {
    return; // Если шаблон не найден, просто выходим из функции
  }

  const errorMessage = errorTemplate.content.cloneNode(true); // Клонируем содержимое шаблона
  document.body.append(errorMessage); // Добавляем клонированный элемент в body

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

  // Сохраняем данные формы для повторной отправки
  const saveFormData = () => {
    // Здесь можно сохранить данные формы в локальном хранилище или переменной
    console.log(formData); // Например, выводим данные в консоль
  };

  closeButton.addEventListener('click', () => {
    closeErrorMessage();
    saveFormData(); // Сохраняем данные формы при закрытии сообщения
  });

  // Закрытие по клавише Esc
  const onEscKeyPress = (evt) => {
    if (isEscapeKey(evt)) {
      closeErrorMessage();
      saveFormData(); // Сохраняем данные формы при закрытии сообщения
    }
  };

  // Закрытие по клику вне сообщения
  const onOutsideClick = (evt) => {
    const messageSection = document.querySelector('.error');
    if (messageSection && !messageSection.contains(evt.target)) {
      closeErrorMessage();
      saveFormData(); // Сохраняем данные формы при закрытии сообщения
    }
  };

  document.addEventListener('keydown', onEscKeyPress);
  document.addEventListener('click', onOutsideClick);
};

// Пример использования функции displayErrorMessage
// displayErrorMessage({ name: 'Иван', email: 'ivan@example.com' });

export { displayErrorMessage };
