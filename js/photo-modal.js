//* Импорт функций
// Код начинает с импорта функций isEscapeKey и isEnterKey, которые, вероятно, определяют, была ли нажата клавиша Escape или Enter соответственно. Это позволяет обрабатывать нажатия клавиш для закрытия модального окна.
//* Получение элементов
// Далее, код получает доступ к различным элементам модального окна, таким как изображение, описание, количество лайков и комментариев, а также кнопка закрытия.
//* Обработка нажатий клавиш
// Функция onDocumentKeydown обрабатывает нажатия клавиш и закрывает модальное окно, если нажата клавиша Escape или Enter.
//* Создание комментариев
// Функция createComment создает элемент комментария, клонируя шаблон и заполняя его данными (аватар, имя, сообщение).
//* Отображение комментариев
// Функция renderComments отвечает за отображение всех комментариев, создавая их с помощью createComment и добавляя в контейнер.
//* Отображение модального окна
// Функция renderModal устанавливает изображение, описание и количество лайков, а также вызывает функцию для отображения комментариев.
//* Показ модального окна
// Функция showModal убирает класс 'hidden' с модального окна и блокирует прокрутку страницы.
//* Открытие модального окна
// Функция openModal открывает модальное окно, копируя комментарии и добавляя обработчики событий для закрытия окна.
//* Закрытие модального окна
// Функция closeModal скрывает модальное окно и удаляет обработчики событий.
//* Обработка событий закрытия
// Функции onClosePhotoKeydown и onClosePhotoClick обрабатывают закрытие модального окна при нажатии клавиши Enter или клике вне изображения.
//* Этот код обеспечивает функциональность для отображения изображений с комментариями в модальном окне, а также удобное закрытие окна через клавиатуру или мышь.

// Импортируем необходимые функции для обработки нажатий клавиш и генерации комментариев
import { isEscapeKey, isEnterKey } from './util.js';

// Получаем элементы модального окна
const bigPicture = document.querySelector('.big-picture'); // Модальное окно для отображения большой картинки
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // Элемент изображения внутри модального окна
const socialCaption = bigPicture.querySelector('.social__caption'); // Элемент для отображения описания фотографии
const likesCount = bigPicture.querySelector('.likes-count'); // Элемент для отображения количества лайков
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия модального окна
const socialCommentsTemplate = bigPicture.querySelector('.social__comment'); // Шаблон комментария
const socialComments = bigPicture.querySelector('.social__comments'); // Контейнер для комментариев
const commentCount = bigPicture.querySelector('.social__comment-count'); // Блок счётчика комментариев
const commentsLoader = bigPicture.querySelector('.comments-loader'); // Блок загрузки новых комментариев

let localComments; // Переменная для хранения комментариев

// Функция для обработки нажатий клавиш на документе
const onDocumentKeydown = (evt) => {
  // Проверяем, была ли нажата клавиша Escape или Enter
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault(); // Предотвращаем стандартное поведение
    closeModal(); // Закрываем модальное окно
  }
};

// Функция для создания элемента комментария
const createComment = ({ avatar, name, message }) => {
  const socialCommentElement = socialCommentsTemplate.cloneNode(true); // Клонируем шаблон комментария
  const socialCommentAvatar = socialCommentElement.querySelector('.social__picture'); // Находим элемент аватара
  socialCommentAvatar.src = avatar; // Устанавливаем источник аватара
  socialCommentAvatar.alt = name; // Устанавливаем альтернативный текст для аватара
  socialCommentElement.querySelector('.social__text').textContent = message; // Устанавливаем текст комментария
  return socialCommentElement; // Возвращаем созданный элемент комментария
};

// Функция для отображения комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment(); // Создаем фрагмент документа для оптимизации вставки

  // Проходим по каждому комментарию и добавляем его во фрагмент
  localComments.forEach((comment) => {
    fragment.append(createComment(comment)); // Добавляем каждый комментарий во фрагмент
  });

  socialComments.innerHTML = ''; // Очищаем контейнер комментариев
  socialComments.append(fragment); // Вставляем все комментарии во фрагмент
};

// Функция для отображения модального окна с фотографией
const renderModal = ({ url, description, likes }) => {
  bigPictureImg.src = url; // Устанавливаем источник изображения
  socialCaption.textContent = description; // Устанавливаем текст описания
  likesCount.textContent = likes; // Устанавливаем количество лайков
  renderComments(); // Отображаем комментарии

  // Обновляем отображаемое количество комментариев
  const shownCount = localComments.length; // Количество показанных комментариев
  document.querySelector('.social__comment-shown-count').textContent = shownCount; // Устанавливаем количество показанных комментариев
  document.querySelector('.social__comment-total-count').textContent = localComments.length; // Устанавливаем общее количество комментариев

  // Скрываем блоки счётчика комментариев и загрузки новых комментариев
  commentCount.classList.add('hidden'); // Добавляем класс hidden к блоку счётчика комментариев
  commentsLoader.classList.add('hidden'); // Добавляем класс hidden к блоку загрузки новых комментариев
};

// Функция для показа модального окна
const showModal = () => {
  bigPicture.classList.remove('hidden'); // Убираем класс 'hidden' для отображения модального окна
  document.body.classList.add('modal-open'); // Блокируем прокрутку страницы
  bigPictureClose.tabIndex = 2; // Устанавливаем tabindex для кнопки закрытия
  bigPicture.tabIndex = 1; // Устанавливаем tabindex для модального окна
  bigPicture.focus(); // Устанавливаем фокус на модальное окно
};

// Функция для открытия модального окна с фотографией
export const openModal = (photo) => {
  localComments = [...photo.comments]; // Копируем комментарии из объекта photo
  renderModal(photo); // Отображаем модальное окно с данными фотографии
  showModal(); // Показываем модальное окно

  // Добавляем обработчики событий
  document.addEventListener('keydown', onDocumentKeydown); // Обработка нажатий клавиш
  bigPictureClose.addEventListener('click', closeModal); // Закрытие модального окна по клику на кнопку
  bigPictureClose.addEventListener('keydown', onClosePhotoKeydown); // Закрытие модального окна по нажатию клавиши на кнопке
  bigPicture.addEventListener('click', onClosePhotoClick); // Закрытие модального окна по клику вне изображения
};

// Функция для закрытия модального окна
const closeModal = () => {
  bigPicture.classList.add('hidden'); // Добавляем класс 'hidden' для скрытия модального окна
  document.body.classList.remove('modal-open'); // Разблокируем прокрутку страницы

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown); // Удаляем обработчик нажатий клавиш
  bigPictureClose.removeEventListener('click', closeModal); // Удаляем обработчик клика на кнопку закрытия
  bigPictureClose.removeEventListener('keydown', onClosePhotoKeydown); // Удаляем обработчик нажатий клавиш на кнопке закрытия
  bigPicture.removeEventListener('click', onClosePhotoClick); // Удаляем обработчик клика вне изображения
};

// Функция для обработки нажатий клавиш на кнопке закрытия
const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closeModal(); // Закрываем модальное окно при нажатии Enter
  }
};

// Функция для обработки клика вне изображения
const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closeModal(); // Закрываем модальное окно, если кликнули на область модального окна
  }
};
