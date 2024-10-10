import { Effects } from './constants.js';
import { onSmallerClick, onBiggerClick } from './image-utils.js';
import { initScaleControls } from './image-utils.js';

initScaleControls();

const imgElement = document.querySelector('.img-upload__preview img');
const effectLevelInput = document.querySelector('.effect-level__value');

const applyEffect = (effect) => {
  imgElement.style.filter = `${effect.filter}(${effectLevelInput.value}${effect.units})`;
};

document.querySelector('.scale__control--smaller').addEventListener('click', onSmallerClick);
document.querySelector('.scale__control--bigger').addEventListener('click', onBiggerClick);

export const renderEffectImage = () => {
  const effectType = document.querySelector('.effects__radio:checked').value;

  imgElement.className = '';
  imgElement.classList.add(`effects__preview--${effectType}`);
  applyEffect(Effects[effectType]);
};

export const resetImage = () => {
  imgElement.style.filter = '';
  imgElement.className = '';
};
