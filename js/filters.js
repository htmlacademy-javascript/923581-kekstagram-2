import { renderCards } from './thumbnails.js';
import { getRandomImages } from './util.js'; // Импорт функции для получения случайных изображений
import { openPopup } from './popup.js';

// Функция для показа фильтров после загрузки изображений
export function showFilters() {
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive'); // Убираем скрывающий класс
}

// Функция для сброса активности кнопок фильтров
function resetFilterButtons() {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
}

// Функция для настройки кнопок фильтров
export function setupFilterButtons(photos) {
  const originalPhotos = [...photos]; // Сохраняем оригинальный массив фотографий
  const defaultButton = document.getElementById('filter-default');
  const randomButton = document.getElementById('filter-random');
  const discussedButton = document.getElementById('filter-discussed');

  // Обработчик события для кнопки "По умолчанию"
  defaultButton.addEventListener('click', () => {
    resetFilterButtons(); // Сбрасываем активные кнопки
    defaultButton.classList.add('img-filters__button--active'); // Добавляем активный класс
    renderCards(originalPhotos); // Отображаем фотографии в исходном порядке
  });

  // Обработчик события для кнопки "Случайные"
  randomButton.addEventListener('click', () => {
    resetFilterButtons(); // Сбрасываем активные кнопки
    randomButton.classList.add('img-filters__button--active'); // Добавляем активный класс
    try {
      const randomImages = getRandomImages(photos, 10);
      renderCards(randomImages); // Отображаем 10 случайных изображений
    } catch (error) {
      openPopup('error'); // Показываем ошибку при возникновении проблемы
    }
  });

  // Обработчик события для кнопки "Обсуждаемые"
  discussedButton.addEventListener('click', () => {
    resetFilterButtons(); // Сбрасываем активные кнопки
    discussedButton.classList.add('img-filters__button--active'); // Добавляем активный класс
    const discussedImages = [...photos].sort((a, b) => b.comments.length - a.comments.length);
    renderCards(discussedImages); // Отображаем изображения, отсортированные по количеству комментариев
  });
}
