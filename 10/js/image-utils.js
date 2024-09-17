// Общие константы для масштабирования
export const SCALE_STEP = 0.25;
export const MIN_SCALE = 0.25;
export const MAX_SCALE = 1;

let currentScale = MAX_SCALE;

// Создание скрытого поля для масштаба
const hiddenScaleInput = document.createElement('input');
hiddenScaleInput.type = 'hidden';
hiddenScaleInput.name = 'scale';
document.querySelector('.img-upload__form').appendChild(hiddenScaleInput);

/**
 * Обновляет масштаб изображения и скрытого поля.
 */
export const updateScale = () => {
  const imgElement = document.querySelector('.img-upload__preview img');

  if (imgElement) {
    imgElement.style.transform = `scale(${currentScale})`;
  }

  const scaleControlValue = document.querySelector('.scale__control--value');
  scaleControlValue.value = `${currentScale * 100}%`;
  hiddenScaleInput.value = currentScale;
};

/**
 * Уменьшает масштаб изображения.
 */
export const onSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

/**
 * Увеличивает масштаб изображения.
 */
export const onBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};
