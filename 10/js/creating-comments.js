// Импорт элементов из DOM: В начале кода мы получаем ссылки на элементы, которые будут использоваться для отображения комментариев. Это позволяет нам манипулировать DOM без необходимости повторно искать элементы каждый раз.
// Переменные для хранения состояния: Мы создаем переменные для хранения комментариев (localComments), текущего индекса комментария (currentCommentIndex) и количества комментариев на странице (commentsPerPage).
// Создание комментария: Функция createComment принимает объект с данными комментария и создает новый элемент комментария на основе шаблона. Это позволяет динамически генерировать комментарии на основе переданных данных.
// Отображение комментариев: Функция renderComments отвечает за отображение комментариев на странице. Она извлекает нужные комментарии из массива, создает элементы и добавляет их в DOM. Также обновляются счетчики отображаемых и общего количества комментариев.
// Загрузка дополнительных комментариев: Функция loadMoreComments увеличивает индекс текущего комментария и вызывает renderComments, чтобы отобразить следующую порцию комментариев.
// Установка локальных комментариев: Функция setLocalComments позволяет установить массив комментариев и сбросить состояние для их отображения. Это полезно для обновления комментариев при изменении данных.
// Экспорт функций: В конце кода мы экспортируем функции, чтобы их можно было использовать в других модулях, что делает код более модульным и переиспользуемым.

// Импортируем необходимые элементы из DOM
const socialCommentsTemplate = document.querySelector('.social__comment'); // Шаблон комментария
const socialComments = document.querySelector('.social__comments'); // Контейнер для всех комментариев
const commentCount = document.querySelector('.social__comment-count'); // Элемент для отображения количества комментариев
const commentsLoader = document.querySelector('.comments-loader'); // Кнопка или элемент для загрузки дополнительных комментариев

let localComments; // Переменная для хранения локальных комментариев
let currentCommentIndex = 0; // Индекс текущего комментария, который будет отображаться
const commentsPerPage = 5; // Количество комментариев, загружаемых за раз

// Функция для создания комментария
const createComment = ({ avatar, name, message }) => {
  // Клонируем шаблон комментария
  const socialCommentElement = socialCommentsTemplate.cloneNode(true);

  // Устанавливаем аватар комментария
  const socialCommentAvatar = socialCommentElement.querySelector('.social__picture');
  socialCommentAvatar.src = avatar; // Устанавливаем источник изображения
  socialCommentAvatar.alt = name; // Устанавливаем альтернативный текст для изображения

  // Устанавливаем текст комментария
  socialCommentElement.querySelector('.social__text').textContent = message;

  return socialCommentElement; // Возвращаем созданный элемент комментария
};

// Функция для отображения комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment(); // Создаем фрагмент документа для оптимизации вставки
  // Получаем комментарии, которые нужно показать на текущей странице
  const commentsToShow = localComments.slice(currentCommentIndex, currentCommentIndex + commentsPerPage);

  // Проходим по каждому комментарию и добавляем его в фрагмент
  commentsToShow.forEach((comment) => {
    fragment.append(createComment(comment)); // Создаем и добавляем комментарий
  });

  // Вставляем фрагмент в контейнер комментариев
  socialComments.append(fragment);

  // Обновляем счетчик отображаемых комментариев
  const shownCount = currentCommentIndex + commentsToShow.length;
  commentCount.querySelector('.social__comment-shown-count').textContent = shownCount; // Обновляем количество отображаемых комментариев
  commentCount.querySelector('.social__comment-total-count').textContent = localComments.length; // Обновляем общее количество комментариев

  // Проверяем, достигли ли мы конца списка комментариев
  if (shownCount >= localComments.length) {
    commentsLoader.classList.add('hidden'); // Скрываем кнопку загрузки, если комментарии закончились
  } else {
    commentsLoader.classList.remove('hidden'); // Показываем кнопку загрузки, если есть еще комментарии
  }
};

// Функция для загрузки дополнительных комментариев
const loadMoreComments = () => {
  currentCommentIndex += commentsPerPage; // Увеличиваем индекс для загрузки следующих комментариев
  renderComments(); // Вызываем функцию для отображения новых комментариев
};

// Функция для установки локальных комментариев
const setLocalComments = (comments) => {
  localComments = comments; // Сохраняем переданные комментарии в локальную переменную
  currentCommentIndex = 0; // Сбрасываем индекс комментариев для начала с первого
  socialComments.innerHTML = ''; // Очищаем текущий список комментариев
  renderComments(); // Вызываем функцию для отображения комментариев
};

// Экспортируем функции для использования в других модулях
export { renderComments, loadMoreComments, setLocalComments };
