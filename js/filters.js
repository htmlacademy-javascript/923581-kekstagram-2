import { renderCards } from './thumbnails.js';
import { getRandomImages, debounce } from './util.js';
import { Filters } from './constants.js';

const filterForm = document.querySelector('.img-filters__form');

let filter = Filters.DEFAULT;
let localPhotos = [];

const showFilters = () => {
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
};

const setActiveButton = (button) => {
  filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

filterForm.addEventListener('click', ({ target }) => {
  if (target.closest('.img-filters__button')) {
    setActiveButton(target);
  }
});

const filtersSet = {
  [Filters.DEFAULT]: () => localPhotos,
  [Filters.RANDOM]: () => getRandomImages([...localPhotos], 10),
  [Filters.DISCUSSED]: () => [...localPhotos].sort((a, b) => b.comments.length - a.comments.length)
};

filterForm.addEventListener('click', debounce(({ target }) => {
  if (target.closest('.img-filters__button')) {
    filter = target.id;
    renderCards(filtersSet[filter]());
  }
}, 500));

export const initFilters = (photos) => {
  showFilters();
  localPhotos = [...photos];
};
