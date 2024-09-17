// Находим элементы на странице
const slider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

// Создаем слайдер с помощью библиотеки noUiSlider
noUiSlider.create(slider, {
  start: [100], // Устанавливаем начальное значение слайдера
  range: { min: [0], max: [100] }, // Устанавливаем минимальное и максимальное значения диапазона
});

// Добавляем обработчик события на изменение значения слайдера
slider.noUiSlider.on('update', (values) => {
  effectLevelInput.value = values[0]; // Устанавливаем значение инпута в соответствии со значением слайдера
  updateImageEffect(); // Обновляем эффект изображения
});

// Функция для обновления эффекта изображения
function updateImageEffect() {
  const effectType = document.querySelector('.effects__radio:checked').value; // Получаем выбранный тип эффекта
  const effectLevel = parseFloat(effectLevelInput.value) / 100; // Получаем уровень эффекта из значения инпута

  imgPreview.style.filter = ''; // Сбрасываем фильтр изображения

  // Удаляем все классы эффектов изображения
  imgPreview.classList.remove('effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat');

  // Применяем выбранный эффект в зависимости от типа
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

// Добавляем обработчик событий на изменение выбранного типа эффекта
effectsList.addEventListener('change', (event) => {
  const effectType = event.target.value;
  const sliderContainer = document.querySelector('.effect-level');

  // Если выбран эффект "Без эффекта", скрываем слайдер
  if (effectType === 'none') {
    sliderContainer.classList.add('hidden');
    slider.noUiSlider.set(100); // Сбрасываем слайдер до максимального значения
    updateImageEffect(); // Обновляем эффект изображения
  } else {
    sliderContainer.classList.remove('hidden'); // Показываем слайдер
    slider.noUiSlider.set(100); // Устанавливаем слайдер на максимальное значение
    updateImageEffect(); // Обновляем эффект изображения
  }
});
