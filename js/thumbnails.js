import { openModal } from './photo-modal.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const bigPictureNode = document.querySelector('.pictures');
const container = document.querySelector('.pictures');
const localData = [];

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);

  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments ? photo.comments.length : 0;

  return thumbnail;
};

const renderCards = (data) => {
  localData.push(...data.slice());

  const fragment = document.createDocumentFragment();

  data.forEach((photo) => {
    const thumbnail = createThumbnail(photo);

    thumbnail.dataset.pictureId = photo.id;

    fragment.appendChild(thumbnail);
  });

  bigPictureNode.appendChild(fragment);
};

container.addEventListener('click', (evt) => {
  const card = evt.target.closest('.picture');

  if (card) {
    const id = Number(card.dataset.pictureId);

    const photoData = localData.find((item) => item.id === id);

    openModal(photoData);
  }
});

export { renderCards };
