// Импортируем необходимые функции из других модулей
import { isEnterKey } from './util.js';
import { renderComments, loadMoreComments, setLocalComments } from './creating-comments.js';
import { setEscapeControl, removeEscapeControl } from './escape-control.js';

// Находим элементы на странице
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialHeaderPicture = socialComments.querySelector('.social__picture');

// Функция для отображения модального окна с фото
const renderModal = ({ url, description, likes, avatar, avatarAlt }) => {
  bigPictureImg.src = url;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  socialHeaderPicture.src = avatar;
  socialHeaderPicture.alt = avatarAlt;
  socialComments.innerHTML = '';
  renderComments();
};

// Функция для закрытия модального окна
const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Функция для показа модального окна
const showModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureClose.tabIndex = 2;
  bigPicture.tabIndex = 1;
  bigPicture.focus();
};

// Функция для открытия модального окна с фото
export const openModal = (photo) => {
  setLocalComments([...photo.comments]);
  renderModal({
    url: photo.url,
    description: photo.description,
    likes: photo.likes,
    avatar: photo.avatar,
    avatarAlt: photo.avatarAlt
  });
  showModal();
  setEscapeControl(closeModal);
};

// Обработчик события на клик по кнопке закрытия модального окна
const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closeModal();
  }
};

// Обработчик события на нажатие клавиши Enter при фокусе на кнопке закрытия модального окна
const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
};

const onCloseButtonClick = () => {
  closeModal();
  removeEscapeControl();
};

// Добавляем обработчики событий на кнопку "Загрузить еще" и кнопку закрытия модального окна
commentsLoader.addEventListener('click', loadMoreComments);
bigPictureClose.addEventListener('click', onCloseButtonClick);
bigPictureClose.addEventListener('keydown', onClosePhotoKeydown);

// Добавляем обработчик события на клик по модальному окну для закрытия его
bigPicture.addEventListener('click', onClosePhotoClick);

export { closeModal };
