const slider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

noUiSlider.create(slider, {
  start: [100],
  range: { min: [0], max: [100] },
});

slider.noUiSlider.on('update', function (values) {
  effectLevelInput.value = values[0];
  updateImageEffect();
});

function updateImageEffect() {
  const effectType = document.querySelector('.effects__radio:checked').value;
  const effectLevel = parseFloat(effectLevelInput.value) / 100;

  imgPreview.style.filter = '';

  // Удаляем все классы эффектов
  imgPreview.classList.remove('effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat');

  switch (effectType) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${effectLevel})`;
      imgPreview.classList.add('effects__preview--chrome');
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${effectLevel})`;
      imgPreview.classList.add('effects__preview--sepia');
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${Math.floor(effectLevel * 100)}%)`;
      imgPreview.classList.add('effects__preview--marvin');
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${effectLevel * 3}px)`;
      imgPreview.classList.add('effects__preview--phobos');
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${1 + effectLevel * 2})`;
      imgPreview.classList.add('effects__preview--heat');
      break;
    case 'none':
      imgPreview.style.filter = '';
      break;
    default:
      break;
  }
}

effectsList.addEventListener('change', (event) => {
  const effectType = event.target.value;

  const sliderContainer = document.querySelector('.effect-level');

  if (effectType === 'none') {
    sliderContainer.classList.add('hidden');
    slider.noUiSlider.set(100); // Сбрасываем до максимума при отсутствии эффекта
    updateImageEffect();
  } else {
    sliderContainer.classList.remove('hidden');
    slider.noUiSlider.set(100); // Устанавливаем максимальное значение при выборе эффекта
    updateImageEffect();
  }
});
