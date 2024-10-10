export const Ranges = {
  PHOTOS: { MIN: 1, MAX: 25 },
  LIKES: { MIN: 15, MAX: 200 },
  COMMENTS: { MIN: 0, MAX: 30 },
  AVATARS: { MIN: 1, MAX: 6 },
};

export const Effects = {
  none: { filter: 'none', units: '' },
  chrome: { filter: 'grayscale', units: '', step: 0.1, min: 0, max: 1 },
  sepia: { filter: 'sepia', units: '', step: 0.1, min: 0, max: 1 },
  marvin: { filter: 'invert', units: '%', step: 1, min: 0, max: 100 },
  phobos: { filter: 'blur', units: 'px', step: 0.1, min: 0, max: 3 },
  heat: { filter: 'brightness', units: '', step: 0.1, min: 1, max: 3 },
};

export const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};


