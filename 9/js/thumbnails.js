//*1 Импорт функции: В начале кода импортируется функция openModal, которая используется для открытия модального окна с фотографией.
//*2 Поиск элементов: Код находит шаблон для миниатюры фотографии и контейнер, в который будут добавляться миниатюры. Это делается с помощью querySelector.
//*3 Локальный массив: Создается пустой массив localData, который будет хранить данные о фотографиях, чтобы избежать повторных запросов к данным.
//*4 Создание миниатюры: Функция createThumbnail принимает объект фотографии и создает миниатюру, заполняя ее данными, такими как URL изображения, описание, количество лайков и комментариев.
//*5 Рендеринг карточек: Функция renderCards принимает массив данных о фотографиях, добавляет их в локальный массив и создает миниатюры для каждой фотографии, добавляя их в контейнер.
//*6 Обработчик событий: Добавляется обработчик событий на контейнер, который реагирует на клики по миниатюрам. При клике на миниатюру извлекается идентификатор фотографии, и открывается модальное окно с соответствующими данными.
//*7 Экспорт функции: В конце кода экспортируется функция renderCards, чтобы она могла быть использована в других модулях приложения.

// Импортируем функцию openModal из модуля photo-modal.js
import { openModal } from "./photo-modal.js"; // Импортируем функцию openModal, которая отвечает за открытие модального окна с фотографией.

// Находим шаблон для миниатюры фотографии в HTML
const template = document.querySelector('#picture').content.querySelector('.picture');
// Используем querySelector для поиска элемента с ID 'picture', который содержит шаблон миниатюры фотографии.
// Затем получаем сам элемент миниатюры с классом 'picture' из его контента.

// Находим элемент, в который будут добавляться миниатюры
const bigPictureNode = document.querySelector('.pictures');
// Сохраняем ссылку на контейнер, в который будут добавлены миниатюры фотографий.

// Сохраняем ссылку на контейнер для миниатюр
const container = document.querySelector('.pictures');
// Сохраняем ссылку на контейнер для миниатюр, чтобы использовать его позже для обработки событий.

// Массив для хранения локальных данных о фотографиях
const localData = [];
// Инициализируем пустой массив, который будет хранить данные о фотографиях, загружаемых на страницу.

// Функция для создания миниатюры фотографии
const createThumbnail = (photo) => {
  // Клонируем шаблон для создания новой миниатюры
  const thumbnail = template.cloneNode(true); // Клонируем шаблон миниатюры, чтобы создать новую миниатюру.

  // Находим элемент изображения в миниатюре
  const image = thumbnail.querySelector('.picture__img');
  // Получаем элемент изображения внутри клонированной миниатюры.

  // Устанавливаем источник и альтернативный текст для изображения
  image.src = photo.url; // Устанавливаем URL изображения из объекта photo.
  image.alt = photo.description; // Устанавливаем альтернативный текст для изображения.

  // Устанавливаем количество лайков и комментариев
  thumbnail.querySelector('.picture__likes').textContent = photo.likes; // Устанавливаем количество лайков.
  thumbnail.querySelector('.picture__comments').textContent = photo.comments ? photo.comments.length : 0;
  // Устанавливаем количество комментариев. Если photo.comments существует, берем его длину, иначе устанавливаем 0.

  // Возвращаем созданную миниатюру
  return thumbnail; // Возвращаем клонированную и заполненную миниатюру.
};

// Функция для рендеринга карточек фотографий
const renderCards = (data) => {
  // Добавляем данные в локальный массив
  localData.push(...data.slice()); // Копируем данные фотографий в локальный массив localData.

  // Создаем фрагмент документа для оптимизации рендеринга
  const fragment = document.createDocumentFragment();
  // Создаем фрагмент, чтобы избежать повторных операций с DOM, что улучшает производительность.

  // Проходим по каждому элементу данных и создаем миниатюру
  data.forEach((photo) => {
    const thumbnail = createThumbnail(photo); // Создаем миниатюру для каждой фотографии.

    // Сохраняем идентификатор фотографии в дата-атрибуте
    thumbnail.dataset.pictureId = photo.id; // Устанавливаем идентификатор фотографии в дата-атрибут для дальнейшего использования.

    // Добавляем миниатюру в фрагмент
    fragment.appendChild(thumbnail); // Добавляем миниатюру во фрагмент.
  });

  // Добавляем все миниатюры в контейнер
  bigPictureNode.appendChild(fragment); // Вставляем все миниатюры из фрагмента в контейнер bigPictureNode.
};

// Добавляем обработчик событий на контейнер для клика по миниатюрам
container.addEventListener('click', (evt) => {
  // Находим ближайшую миниатюру к месту клика
  const card = evt.target.closest('.picture'); // Проверяем, был ли клик на миниатюре.

  if (card) {
    // Получаем идентификатор фотографии из дата-атрибута
    const id = Number(card.dataset.pictureId); // Преобразуем идентификатор из строки в число.

    // Находим данные фотографии по идентификатору
    const photoData = localData.find((item) => item.id === id); // Ищем данные о фотографии в локальном массиве по идентификатору.

    // Выводим данные в консоль (для отладки)
    console.log(photoData); // Выводим данные о фотографии в консоль для проверки.

    // Открываем модальное окно с данными фотографии
    openModal(photoData); // Вызываем функцию openModal и передаем ей данные о фотографии для отображения в модальном окне.
  }
});

// Экспортируем функцию renderCards для использования в других модулях
export { renderCards }; // Экспортируем функцию renderCards, чтобы она могла быть использована в других частях приложения.
