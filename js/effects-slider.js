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
  const imgElement = document.querySelector('.img-upload__preview'); // Получаем элемент изображения
  const selectedEffect = evt.target.value; // Получаем выбранный эффект из события

  // Применяем выбранный эффект или сбрасываем фильтр, если эффект не найден
  if (effects[selectedEffect]) {
    applyEffect(imgElement, effects[selectedEffect]);
  } else {
    applyEffect(imgElement, effects.none);
  }
};

export { onEffectChange };
