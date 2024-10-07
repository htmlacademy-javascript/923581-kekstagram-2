// Импорт необходимых функций и констант
import { resetImage, renderEffectImage } from './image-effects.js';
import { Effects } from './constants.js';

// Получение элементов DOM
const slider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');

// Инициализация слайдера noUiSlider
noUiSlider.create(slider, {
  start: 100,
  range: { min: 0, max: 100 },
  connect: 'lower'
});

// Обновление значения эффекта при изменении слайдера
slider.noUiSlider.on('update', () => {
  const value = parseFloat(slider.noUiSlider.get()); // Получаем значение в виде числа
  effectLevelInput.value = Number.isInteger(value) ? value.toString() : value.toFixed(1); // Устанавливаем значение в нужном формате
  renderEffectImage();
});

// Функция сброса слайдера
export const resetSlider = () => {
  sliderContainer.classList.add('hidden');
};

// Функция обновления параметров слайдера в зависимости от выбранного эффекта
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

// Добавляем обработчик событий на изменение выбранного типа эффекта
effectsList.addEventListener('change', (event) => {
  const effectType = event.target.value;
  if (effectType === 'none') {
    resetSlider(); // Сбрасываем слайдер и изображение при выборе "нет эффекта"
    resetImage();
  } else {
    sliderContainer.classList.remove('hidden'); // Показываем слайдер для выбранного эффекта
    updateSlider(effectType); // Обновляем параметры слайдера в зависимости от эффекта
  }
});
