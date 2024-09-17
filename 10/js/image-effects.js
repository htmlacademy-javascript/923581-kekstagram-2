// image-effects.js
import { onSmallerClick, onBiggerClick } from './image-utils.js';

// Объект, содержащий эффекты и их соответствующие CSS-фильтры
const effects = {
  none: { name: 'none', filter: 'none' },
  chrome: { name: 'chrome', filter: 'grayscale(1)' },
  sepia: { name: 'sepia', filter: 'sepia(1)' },
  marvin: { name: 'marvin', filter: 'invert(100%)' },
  phobos: { name: 'phobos', filter: 'blur(3px)' },
  heat: { name: 'heat', filter: 'brightness(3)' },
};

// Функция для применения эффекта к изображению
const applyEffect = (imgElement, effect) => {
  imgElement.style.filter = effect.filter;
};

// Функция для обработки изменения эффекта
const onEffectChange = (evt) => {
  const imgElement = document.querySelector('.img-upload__preview img');
  const effectLevelInput = document.querySelector('.effect-level__value');

  if (!imgElement) {
    return;
  }

  const selectedEffect = evt.target.value;

  if (effects[selectedEffect]) {
    applyEffect(imgElement, effects[selectedEffect]);
    effectLevelInput.value = selectedEffect === 'none' ? 0 : 100; // Устанавливаем значение в зависимости от выбранного эффекта
    updateSliderValue(effectLevelInput.value);
  } else {
    applyEffect(imgElement, effects.none);
    effectLevelInput.value = 0;
    updateSliderValue(0);
  }
};

// Функция для обновления значения слайдера
function updateSliderValue(value) {
  const sliderElement = document.querySelector('.effect-level__slider');
  if (sliderElement) {
    sliderElement.noUiSlider.set(value);
  }
}

// Добавление слушателей событий
document.querySelector('.effects__list').addEventListener('change', onEffectChange);
document.querySelector('.scale__control--smaller').addEventListener('click', onSmallerClick);
document.querySelector('.scale__control--bigger').addEventListener('click', onBiggerClick);

export { onEffectChange };
