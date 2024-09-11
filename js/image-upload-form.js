import { isEnterKey, onDocumentKeydown } from './util.js'; // Импорт функций для проверки нажатия клавиш

const imageEditingForm = document.querySelector('.img-upload__overlay');
const imageEditingFormClose = imageEditingForm.querySelector('.img-upload__cancel'); // Кнопка закрытия модального окна


document.getElementById('upload-select-image').addEventListener('submit', function (event) {
  event.preventDefault(); // Отменяем стандартное поведение отправки формы

  const formData = new FormData(this); // Создаем объект FormData из формы
  const submitButton = document.getElementById('upload-submit');

  // Отключаем кнопку отправки, чтобы предотвратить повторные отправки
  submitButton.disabled = true;

  // Выполняем AJAX-запрос
  fetch(this.action, {
    method: this.method,
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Сетевая ошибка');
      }
      return response.json(); // Предполагаем, что сервер отвечает в формате JSON
    })
    .then(data => {
      console.log('Успех:', data);
      // Обрабатываем успешный ответ (например, показываем сообщение об успехе)
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      // Обрабатываем ошибку (например, показываем сообщение об ошибке)
    })
    .finally(() => {
      // Включаем кнопку отправки после завершения запроса
      submitButton.disabled = false;
    });
});


const showImageEditingForm = () => {
  imageEditingForm.classList.remove('hidden'); // Убираем класс 'hidden', чтобы показать модальное окно
  document.body.classList.add('modal-open'); // Блокируем прокрутку страницы
  imageEditingFormClose.tabIndex = 2; // Устанавливаем tabindex для кнопки закрытия
  imageEditingForm.tabIndex = 1; // Устанавливаем tabindex для модального окна
  imageEditingForm.focus(); // Устанавливаем фокус на модальное окно
  document.addEventListener('keydown', onDocumentKeydown); // Обработчик для нажатий клавиш
};

// Закрытие модального окна
const closeImageEditingForm = () => {
  imageEditingForm.classList.add('hidden'); // Добавляем класс 'hidden', чтобы скрыть модальное окно
  document.body.classList.remove('modal-open'); // Разрешаем прокрутку страницы

  document.removeEventListener('keydown', onDocumentKeydown); // Обработчик для нажатий клавиш
};

// Функция onClosePhotoClick обрабатывает закрытие модального окна при клике вне формы.
const onCloseFormClick = (evt) => {
  if (evt.target === bigPicture) { // Проверяем, был ли клик вне формы
    closeImageEditingForm(); // Закрываем модальное окно
  }
};

// Обработка событий закрытия
// Функция onCloseFormKeydown обрабатывает нажатия клавиш для закрытия модального окна при нажатии клавиши Enter.
const onCloseFormKeydown = (evt) => {
  if (isEnterKey(evt)) { // Проверяем, нажата ли клавиша Enter
    closeImageEditingForm(); // Закрываем модальное окно
  }
};

// Добавляем обработчики событий для закрытия окна
imageEditingForm.addEventListener('click', closeImageEditingForm); // Обработчик для кнопки закрытия
imageEditingForm.addEventListener('keydown', onCloseFormKeydown); // Обработчик для нажатия клавиши Enter на кнопке закрытия
imageEditingForm.addEventListener('click', onCloseFormClick); // Обработчик для клика вне формы

showImageEditingForm();
