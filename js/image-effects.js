import { Effects } from './constants.js';
import { onSmallerClick, onBiggerClick } from './image-utils.js';

// Получаем элементы изображения и уровня эффекта
const imgElement = document.querySelector('.img-upload__preview img');
const effectLevelInput = document.querySelector('.effect-level__value');

// Функция для применения эффекта к изображению
const applyEffect = (effect) => {
  imgElement.style.filter = `${effect.filter}(${effectLevelInput.value}${effect.units})`;
};

// Добавляем обработчики событий для кнопок изменения масштаба
document.querySelector('.scale__control--smaller').addEventListener('click', onSmallerClick);
document.querySelector('.scale__control--bigger').addEventListener('click', onBiggerClick);

// Функция для рендеринга изображения с эффектом
export const renderEffectImage = () => {
  const effectType = document.querySelector('.effects__radio:checked').value;
  imgElement.classList = '';
  imgElement.classList.add(`effects__preview--${effectType}`);
  applyEffect(Effects[effectType]);
}

// Функция для сброса изображения к исходному состоянию
export const resetImage = () => {
  imgElement.style.filter = '';
  imgElement.classList = '';
}
