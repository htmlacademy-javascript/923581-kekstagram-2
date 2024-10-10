import { resetImage, renderEffectImage } from './image-effects.js';
import { Effects } from './constants.js';

const slider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');

noUiSlider.create(slider, {
  start: 100,
  range: { min: 0, max: 100 },
  connect: 'lower',
  format: {
    to: function (value) {
      return parseFloat(value);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  effectLevelInput.value = slider.noUiSlider.get();
  renderEffectImage();
});

export const resetSlider = () => {
  sliderContainer.classList.add('hidden');
};

const updateSlider = (effect) => {
  const { min, max, step } = Effects[effect];
  slider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step
  });
};

effectsList.addEventListener('change', (event) => {
  const effectType = event.target.value;
  if (effectType === 'none') {
    resetSlider();
    resetImage();
  } else {
    sliderContainer.classList.remove('hidden');
    updateSlider(effectType);
  }
});
