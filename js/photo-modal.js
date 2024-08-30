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

//* Импорт функций
// Импортируем функции isEscapeKey и isEnterKey из модуля util.js.
// Эти функции определяют, была ли нажата клавиша Escape или Enter соответственно.
// Это позволяет обрабатывать нажатия клавиш для закрытия модального окна.
import { isEscapeKey, isEnterKey } from './util.js';

// Получаем элементы модального окна
// Сохраняем ссылки на различные элементы модального окна, такие как изображение, описание, количество лайков и комментариев, а также кнопку закрытия.
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialHeader = bigPicture.querySelector('.social__header');
const socialHeaderPicture = socialHeader.querySelector('.social__picture');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsTemplate = bigPicture.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let localComments; // Переменная для хранения локальных комментариев
let currentCommentIndex = 0; // Индекс текущего комментария
const commentsPerPage = 5; // Количество комментариев, загружаемых за раз

//* Обработка нажатий клавиш
// Функция onDocumentKeydown обрабатывает нажатия клавиш.
// Закрывает модальное окно, если нажата клавиша Escape или Enter.
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault(); // Предотвращаем действие по умолчанию
    closeModal(); // Закрываем модальное окно
  }
};

//* Создание комментариев
// Функция createComment создает элемент комментария, клонируя шаблон и заполняя его данными (аватар, имя, сообщение).
const createComment = ({ avatar, name, message }) => {
  const socialCommentElement = socialCommentsTemplate.cloneNode(true); // Клонируем шаблон комментария
  const socialCommentAvatar = socialCommentElement.querySelector('.social__picture'); // Получаем элемент аватара
  socialCommentAvatar.src = avatar; // Устанавливаем источник аватара
  socialCommentAvatar.alt = name; // Устанавливаем альтернативный текст для аватара
  socialCommentElement.querySelector('.social__text').textContent = message; // Устанавливаем текст сообщения
  return socialCommentElement; // Возвращаем созданный элемент комментария
};

//* Отображение комментариев
// Функция renderComments отвечает за отображение всех комментариев, создавая их с помощью createComment и добавляя в контейнер.
const renderComments = () => {
  const fragment = document.createDocumentFragment(); // Создаем фрагмент документа для оптимизации рендеринга
  const commentsToShow = localComments.slice(currentCommentIndex, currentCommentIndex + commentsPerPage); // Получаем комментарии для отображения

  commentsToShow.forEach((comment) => {
    fragment.append(createComment(comment)); // Добавляем каждый комментарий во фрагмент
  });

  socialComments.append(fragment); // Вставляем новые комментарии в конец списка

  const shownCount = currentCommentIndex + commentsToShow.length; // Подсчитываем количество показанных комментариев
  commentCount.querySelector('.social__comment-shown-count').textContent = shownCount; // Обновляем счетчик показанных комментариев
  commentCount.querySelector('.social__comment-total-count').textContent = localComments.length; // Обновляем общий счетчик комментариев

  // Если показано больше или равно количеству комментариев, скрываем кнопку загрузки
  if (shownCount >= localComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

//* Загрузка дополнительных комментариев
// Функция loadMoreComments увеличивает индекс текущего комментария и вызывает renderComments для отображения новых комментариев.
const loadMoreComments = () => {
  currentCommentIndex += commentsPerPage; // Увеличиваем индекс текущего комментария
  renderComments(); // Отображаем новые комментарии
};

//* Отображение модального окна
// Функция renderModal устанавливает изображение, описание и количество лайков, а также вызывает функцию для отображения комментариев.
const renderModal = ({ url, description, likes, avatar, avatarAlt }) => {
  bigPictureImg.src = url; // Устанавливаем источник изображения
  socialCaption.textContent = description; // Устанавливаем текст описания
  likesCount.textContent = likes; // Устанавливаем количество лайков
  socialHeaderPicture.src = avatar; // Устанавливаем аватар автора
  socialHeaderPicture.alt = avatarAlt; // Устанавливаем альтернативный текст для аватара
  currentCommentIndex = 0; // Сбрасываем индекс комментариев
  socialComments.innerHTML = ''; // Очищаем список комментариев
  renderComments(); // Вызываем функцию для отображения комментариев
};

//* Показ модального окна
// Функция showModal убирает класс 'hidden' с модального окна и блокирует прокрутку страницы.
const showModal = () => {
  bigPicture.classList.remove('hidden'); // Показываем модальное окно
  document.body.classList.add('modal-open'); // Блокируем прокрутку страницы
  bigPictureClose.tabIndex = 2; // Устанавливаем tabindex для кнопки закрытия
  bigPicture.tabIndex = 1; // Устанавливаем tabindex для модального окна
  bigPicture.focus(); // Устанавливаем фокус на модальное окно
};

//* Открытие модального окна
// Функция openModal открывает модальное окно, копируя комментарии и добавляя обработчики событий для закрытия окна.
export const openModal = (photo) => {
  localComments = [...photo.comments]; // Копируем комментарии из объекта photo
  renderModal({
    url: photo.url, // URL фотографии
    description: photo.description, // Описание фотографии
    likes: photo.likes, // Количество лайков
    avatar: photo.avatar, // URL аватара
    avatarAlt: photo.avatarAlt // Альтернативный текст для аватара
  });
  showModal(); // Показываем модальное окно

  // Добавляем обработчики событий для загрузки дополнительных комментариев и закрытия окна
  commentsLoader.addEventListener('click', loadMoreComments);
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureClose.addEventListener('click', closeModal);
  bigPictureClose.addEventListener('keydown', onClosePhotoKeydown);
  bigPicture.addEventListener('click', onClosePhotoClick);
};

//* Закрытие модального окна
// Функция closeModal скрывает модальное окно и удаляет обработчики событий.
const closeModal = () => {
  bigPicture.classList.add('hidden'); // Скрываем модальное окно
  document.body.classList.remove('modal-open'); // Разрешаем прокрутку страницы

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', closeModal);
  bigPictureClose.removeEventListener('keydown', onClosePhotoKeydown);
  bigPicture.removeEventListener('click', onClosePhotoClick);
};

//* Обработка событий закрытия
// Функция onClosePhotoKeydown обрабатывает нажатия клавиш для закрытия модального окна при нажатии клавиши Enter.
const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closeModal(); // Закрываем модальное окно
  }
};

// Функция onClosePhotoClick обрабатывает закрытие модального окна при клике вне изображения.
const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closeModal(); // Закрываем модальное окно
  }
};
