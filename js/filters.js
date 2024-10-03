// Функция для показа фильтров после загрузки изображений
function showFilters() {
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
}

// Вызовите эту функцию после загрузки изображений
document.getElementById('filter-default').addEventListener('click', () => {
  renderImages(images); // Отобразить изображения в исходном порядке
});

document.getElementById('filter-random').addEventListener('click', () => {
  const randomImages = getRandomImages(images, 10);
  renderImages(randomImages); // Отобразить 10 случайных изображений
});

document.getElementById('filter-discussed').addEventListener('click', () => {
  const discussedImages = [...images].sort((a, b) => b.comments - a.comments);
  renderImages(discussedImages); // Отобразить изображения, отсортированные по количеству комментариев
});

export { showFilters };
