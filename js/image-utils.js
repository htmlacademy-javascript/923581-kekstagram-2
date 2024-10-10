export const SCALE_STEP = 0.25;
export const MIN_SCALE = 0.25;
export const MAX_SCALE = 1;

let currentScale = MAX_SCALE;

export const updateScale = (reset = false) => {
  if (reset) {
    currentScale = MAX_SCALE;
  }

  const imgElement = document.querySelector('.img-upload__preview img');

  if (imgElement) {
    imgElement.style.transform = `scale(${currentScale})`;
  }

  const scaleControlValue = document.querySelector('.scale__control--value');
  scaleControlValue.value = `${currentScale * 100}%`;
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

export const initScaleControls = () => {
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');

  scaleControlSmaller.addEventListener('click', onSmallerClick);
  scaleControlBigger.addEventListener('click', onBiggerClick);
};
