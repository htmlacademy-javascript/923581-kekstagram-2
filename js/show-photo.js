import { isEscapeKey, isEnterKey } from './util.js';
import { generateComments } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsTemplate = bigPicture.querySelector('.social__comment');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

const showPhoto = (evt) => {
  const imgElement = evt.target.closest('.picture__img');
  if (!imgElement) return;

  const imgSrc = imgElement.getAttribute('src');
  bigPictureImg.src = imgSrc;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Обновляем количество лайков
  const likesElement = imgElement.closest('.picture').querySelector('.picture__likes');
  if (likesElement) {
    likesCount.textContent = likesElement.textContent;
  }

  // Генерируем комментарии
  const comments = generateComments();
  renderComments(comments);

  // Добавляем обработчики событий
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureClose.addEventListener('click', closePhoto);
  bigPictureClose.addEventListener('keydown', onClosePhotoKeydown);
  bigPicture.addEventListener('click', onClosePhotoClick);
};

const renderComments = (comments) => {
  // Очищаем предыдущие комментарии
  socialComments.innerHTML = '';

  // Обновляем счетчик комментариев
  const shownCount = comments.length;
  const totalCount = 125; // Общее количество комментариев (можно изменить по необходимости)
  document.querySelector('.social__comment-shown-count').textContent = shownCount;
  document.querySelector('.social__comment-total-count').textContent = totalCount;

  // Добавляем комментарии в разметку
  comments.forEach(comment => {
    const commentElement = socialCommentsTemplate.cloneNode(true);
    const img = commentElement.querySelector('.social__picture');
    const text = commentElement.querySelector('.social__text');

    img.src = comment.avatar;
    img.alt = comment.name;
    text.textContent = comment.message;

    socialComments.appendChild(commentElement);
  });
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', closePhoto);
  bigPictureClose.removeEventListener('keydown', onClosePhotoKeydown);
  bigPicture.removeEventListener('click', onClosePhotoClick);
};

const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closePhoto();
  }
};

const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closePhoto();
  }
};

// Обработчик для открытия фото
bigPictureOpen.addEventListener('click', showPhoto);
bigPictureOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    showPhoto(evt);
  }
});
