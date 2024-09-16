// Объект, содержащий эффекты и их соответствующие CSS-фильтры
const effects = {
  none: {
    name: 'none',
    filter: 'none',
  },
  chrome: {
    name: 'chrome',
    filter: 'grayscale(1)',
  },
  sepia: {
    name: 'sepia',
    filter: 'sepia(1)',
  },
  marvin: {
    name: 'marvin',
    filter: 'invert(100%)',
  },
  phobos: {
    name: 'phobos',
    filter: 'blur(3px)',
  },
  heat: {
    name: 'heat',
    filter: 'brightness(3)',
  },
};

// Функция для применения эффекта к изображению
const applyEffect = (imgElement, effect) => {
  imgElement.style.filter = effect.filter;
};

// Функция для обработки изменения эффекта
const onEffectChange = (evt) => {
  const imgElement = document.querySelector('.img-upload__preview img'); // Получаем элемент изображения
  const effectLevelInput = document.querySelector('.effect-level__value'); // Получаем элемент уровня эффекта

  if (!imgElement) return; // Проверяем наличие элемента

  const selectedEffect = evt.target.value; // Получаем выбранный эффект из события

  // Применяем выбранный эффект или сбрасываем фильтр, если эффект не найден
  if (effects[selectedEffect]) {
    applyEffect(imgElement, effects[selectedEffect]);

    // Сбрасываем уровень эффекта до начального состояния (например, до 100)
    effectLevelInput.value = 100; // Установите нужное начальное значение для выбранного эффекта
    updateSliderValue(100); // Обновляем значение слайдера
  } else {
    applyEffect(imgElement, effects.none);

    // Сбрасываем уровень эффекта до начального состояния
    effectLevelInput.value = 0; // Установите нужное начальное значение для отсутствия эффекта
    updateSliderValue(0); // Обновляем значение слайдера
  }
};

// Функция для обновления значения слайдера
const updateSliderValue = (value) => {
  const sliderElement = document.querySelector('.effect-level__slider'); // Получаем элемент слайдера
  if (sliderElement) {
    sliderElement.noUiSlider.set(value); // Устанавливаем новое значение на слайдере
  }
};

// Масштабирование изображения
const SCALE_STEP = 0.25; // Шаг изменения масштаба
const MIN_SCALE = 0.25; // Минимальное значение масштаба
const MAX_SCALE = 1; // Максимальное значение масштаба

let currentScale = MAX_SCALE; // Текущий масштаб

// Скрытое поле для хранения значения масштаба
const hiddenScaleInput = document.createElement('input');
hiddenScaleInput.type = 'hidden';
hiddenScaleInput.name = 'scale';
document.querySelector('.img-upload__form').appendChild(hiddenScaleInput); // Добавляем скрытое поле в форму

// Обновление масштаба изображения и скрытого поля
const updateScale = () => {
  const imgElement = document.querySelector('.img-upload__preview img'); // Получаем элемент изображения

  if (imgElement) {
    imgElement.style.transform = `scale(${currentScale})`; // Применяем масштаб к изображению
  }

  const scaleControlValue = document.querySelector('.scale__control--value'); // Элемент для отображения значения масштаба

  scaleControlValue.value = `${currentScale * 100}%`; // Обновляем значение поля

  hiddenScaleInput.value = currentScale; // Обновляем скрытое поле с текущим масштабом
};

// Уменьшение масштаба при клике на кнопку уменьшения
const onSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

// Увеличение масштаба при клике на кнопку увеличения
const onBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

export { onEffectChange, updateScale, onSmallerClick, onBiggerClick };


// 9.16. Открытое занятие. Внешние API и сторонние библиотеки
// 1:24:57
