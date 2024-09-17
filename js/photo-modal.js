import { isEnterKey, onDocumentKeydown } from './util.js';
import { renderComments, loadMoreComments, setLocalComments } from './creating-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialHeader = bigPicture.querySelector('.social__header');
const socialHeaderPicture = socialHeader.querySelector('.social__picture');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderModal = ({ url, description, likes, avatar, avatarAlt }) => {
  bigPictureImg.src = url;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  socialHeaderPicture.src = avatar;
  socialHeaderPicture.alt = avatarAlt;
  socialComments.innerHTML = '';
  renderComments();
};

const showModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureClose.tabIndex = 2;
  bigPicture.tabIndex = 1;
  bigPicture.focus();

  document.addEventListener('keydown', onDocumentKeydown);

};

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
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closeModal();
  }
};

const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
};

commentsLoader.addEventListener('click', loadMoreComments);
bigPictureClose.addEventListener('click', closeModal);
bigPictureClose.addEventListener('keydown', onClosePhotoKeydown);
bigPicture.addEventListener('click', onClosePhotoClick);

export { closeModal };
