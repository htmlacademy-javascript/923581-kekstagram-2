import { MOKED_PHOTOS } from './example.js';
const template = document.querySelector('#picture').content.querySelector('.picture')

const photo = MOKED_PHOTOS[0];

const image = template.querySelector('.picture__img');
image.src = photo.url;
image.alt = photo.description;

template.querySelector('.picture__likes').textContent = photo.likes;
template.querySelector('.picture__comments').textContent = photo.comments.length;

const container = document.querySelector('.pictures');
container?.appendChild(template);
