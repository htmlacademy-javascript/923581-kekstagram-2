const SCALE_STEP = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;

let currentScale = MAX_SCALE;

const hiddenScaleInput = document.createElement('input');
hiddenScaleInput.type = 'hidden';
hiddenScaleInput.name = 'scale';
document.querySelector('.img-upload__form').appendChild(hiddenScaleInput);

export const updateScale = () => {
  const imgElement = document.querySelector('.img-upload__preview img');

  if (imgElement) {
    imgElement.style.transform = `scale(${currentScale})`;
  }

  const scaleControlValue = document.querySelector('.scale__control--value');

  scaleControlValue.value = `${currentScale * 100}%`;
  hiddenScaleInput.value = currentScale;
};

export const onSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

export const onBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};
