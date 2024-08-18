import { MOCKED_PHOTOS as MOCKED_PHOTOS } from './example.js';
const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThubnail = (photo) => {
  const thambhail = template.cloneNode(true);
  const image = thambhail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thambhail.querySelector('.picture__likes').textContent = photo.likes;
  thambhail.querySelector('.picture__comments').textContent = photo.comments.length;

  return thambhail;
};

// *======== Вариант с циклом for ========

/* for (let i = 0; i < MOCKED_PHOTOS.length; i++) {
  const photo = MOCKED_PHOTOS[i]; // Определяем photo как текущий элемент массива
  const thambhail = createThubnail(photo);
  fragment.appendChild(thambhail);
};
container.appendChild(fragment); */

// *======== Вариант с for of ========

/* for (const photo of MOCKED_PHOTOS) {
  const thambhail = createThubnail(photo);
  fragment.appendChild(thambhail);
};
container.appendChild(fragment); */


// *======== Вариант с forEach ========

MOCKED_PHOTOS.forEach((photo) => {
  const thambhail = createThubnail(photo);
  fragment.appendChild(thambhail);
});
container.appendChild(fragment);

