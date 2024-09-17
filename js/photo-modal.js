// Импорт функций: Мы импортируем необходимые функции из других модулей для обработки событий клавиатуры и работы с комментариями.
// Получение элементов: С помощью document.querySelector мы получаем доступ к элементам модального окна, чтобы управлять их содержимым.
// Отображение модального окна: Функция renderModal отвечает за установку данных в модальном окне, включая изображение, описание и комментарии.
// Показ и закрытие модального окна: Функции showModal и closeModal управляют видимостью модального окна и состоянием прокрутки страницы.
// Обработка событий: Мы добавляем обработчики событий для клавиш и кликов, чтобы обеспечить интерактивность и удобство использования модального окна.

// Импорт функций
// Импортируем функции, которые помогут определить, была ли нажата клавиша Escape или Enter,
// а также функции для работы с комментариями.
import { isEnterKey, onDocumentKeydown } from './util.js'; // Импорт функций для проверки нажатия клавиш
import { renderComments, loadMoreComments, setLocalComments } from './creating-comments.js'; // Импорт функций для работы с комментариями

// Получение элементов модального окна
// Код получает доступ к различным элементам модального окна, чтобы впоследствии изменять их содержимое и управлять отображением.
const bigPicture = document.querySelector('.big-picture'); // Модальное окно
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // Изображение в модальном окне
const socialCaption = bigPicture.querySelector('.social__caption'); // Описание изображения
const socialHeader = bigPicture.querySelector('.social__header'); // Заголовок с информацией о пользователе
const socialHeaderPicture = socialHeader.querySelector('.social__picture'); // Аватар пользователя
const likesCount = bigPicture.querySelector('.likes-count'); // Количество лайков
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия модального окна
const socialComments = bigPicture.querySelector('.social__comments'); // Список комментариев
const commentsLoader = bigPicture.querySelector('.comments-loader'); // Кнопка загрузки дополнительных комментариев

// Отображение модального окна
// Функция renderModal устанавливает содержимое модального окна, включая изображение, описание, количество лайков и комментарии.
const renderModal = ({ url, description, likes, avatar, avatarAlt }) => {
  bigPictureImg.src = url; // Устанавливаем источник изображения
  socialCaption.textContent = description; // Устанавливаем текст описания
  likesCount.textContent = likes; // Устанавливаем количество лайков
  socialHeaderPicture.src = avatar; // Устанавливаем аватар автора
  socialHeaderPicture.alt = avatarAlt; // Устанавливаем альтернативный текст для аватара
  socialComments.innerHTML = ''; // Очищаем список комментариев перед добавлением новых
  renderComments(); // Вызываем функцию для отображения комментариев
};

// Показ модального окна
// Функция showModal делает модальное окно видимым и блокирует прокрутку страницы.
const showModal = () => {
  bigPicture.classList.remove('hidden'); // Убираем класс 'hidden', чтобы показать модальное окно
  document.body.classList.add('modal-open'); // Блокируем прокрутку страницы
  bigPictureClose.tabIndex = 2; // Устанавливаем tabindex для кнопки закрытия
  bigPicture.tabIndex = 1; // Устанавливаем tabindex для модального окна
  bigPicture.focus(); // Устанавливаем фокус на модальное окно

  document.addEventListener('keydown', onDocumentKeydown); // Обработчик для нажатий клавиш

};

// Открытие модального окна
// Функция openModal открывает модальное окно, устанавливает локальные комментарии и добавляет обработчики событий.
export const openModal = (photo) => {
  setLocalComments([...photo.comments]); // Устанавливаем локальные комментарии
  renderModal({ // Устанавливаем содержимое модального окна
    url: photo.url,
    description: photo.description,
    likes: photo.likes,
    avatar: photo.avatar,
    avatarAlt: photo.avatarAlt
  });
  showModal(); // Показываем модальное окно
};

// Закрытие модального окна
// Функция closeModal скрывает модальное окно и удаляет все обработчики событий, чтобы избежать утечек памяти.
const closeModal = () => {
  bigPicture.classList.add('hidden'); // Добавляем класс 'hidden', чтобы скрыть модальное окно
  document.body.classList.remove('modal-open'); // Разрешаем прокрутку страницы

  document.removeEventListener('keydown', onDocumentKeydown); // Обработчик для нажатий клавиш
};

// Функция onClosePhotoClick обрабатывает закрытие модального окна при клике вне изображения.
const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) { // Проверяем, был ли клик вне изображения
    closeModal(); // Закрываем модальное окно
  }
};

// Обработка событий закрытия
// Функция onClosePhotoKeydown обрабатывает нажатия клавиш для закрытия модального окна при нажатии клавиши Enter.
const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) { // Проверяем, нажата ли клавиша Enter
    closeModal(); // Закрываем модальное окно
  }
};

// Добавляем обработчики событий для загрузки дополнительных комментариев и закрытия окна
commentsLoader.addEventListener('click', loadMoreComments); // Обработчик для загрузки дополнительных комментариев
bigPictureClose.addEventListener('click', closeModal); // Обработчик для кнопки закрытия
bigPictureClose.addEventListener('keydown', onClosePhotoKeydown); // Обработчик для нажатия клавиши Enter на кнопке закрытия
bigPicture.addEventListener('click', onClosePhotoClick); // Обработчик для клика вне изображения

export { closeModal };
