// Общие константы для масштабирования
export const SCALE_STEP = 0.25;
export const MIN_SCALE = 0.25;
export const MAX_SCALE = 1;

let currentScale = MAX_SCALE;

// Создание скрытого поля для хранения значения масштаба
// const hiddenScaleInput = document.createElement('input');
// hiddenScaleInput.type = 'hidden';
// hiddenScaleInput.name = 'scale';
// document.querySelector('.img-upload__form').appendChild(hiddenScaleInput);

//  Обновляет масштаб изображения и значение скрытого поля.
export const updateScale = (reset = false) => {
  if (reset) {
    currentScale = MAX_SCALE; // Сбрасываем масштаб
  }

  const imgElement = document.querySelector('.img-upload__preview img');

  if (imgElement) {
    imgElement.style.transform = `scale(${currentScale})`;
  }

  const scaleControlValue = document.querySelector('.scale__control--value');
  scaleControlValue.value = `${currentScale * 100}%`;
  // hiddenScaleInput.value = currentScale;
};

// Уменьшает масштаб изображения на заданный шаг.
export const onSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

// Увеличивает масштаб изображения на заданный шаг.
export const onBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

//  Добавляет обработчики событий для кнопок увеличения и уменьшения масштаба.
export const initScaleControls = () => {
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');

  scaleControlSmaller.addEventListener('click', onSmallerClick);
  scaleControlBigger.addEventListener('click', onBiggerClick);
};
