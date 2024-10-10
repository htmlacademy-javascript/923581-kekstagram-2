import { isEnterKey } from './util.js';
import { renderComments, loadMoreComments, setLocalComments } from './creating-comments.js';
import { setEscapeControl, removeEscapeControl } from './escape-control.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialHeaderPicture = socialComments.querySelector('.social__picture');

const renderModal = ({ url, description, likes, avatar, avatarAlt }) => {
  bigPictureImg.src = url;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  socialHeaderPicture.src = avatar;
  socialHeaderPicture.alt = avatarAlt;
  socialComments.innerHTML = '';
  renderComments();
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureClose.tabIndex = 2;
  bigPicture.tabIndex = 1;
  bigPicture.focus();
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
  setEscapeControl(closeModal);
};

const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closeModal();
    removeEscapeControl();
  }
};

const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
    removeEscapeControl();
  }
};

const onCloseButtonClick = () => {
  closeModal();
  removeEscapeControl();
};

commentsLoader.addEventListener('click', loadMoreComments);
bigPictureClose.addEventListener('click', onCloseButtonClick);
bigPictureClose.addEventListener('keydown', onClosePhotoKeydown);
bigPicture.addEventListener('click', onClosePhotoClick);

export { closeModal };
