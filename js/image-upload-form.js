import { isEnterKey, isEscapeKey } from './util.js'; // Импорт функций для проверки нажатия клавиш

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileStart = uploadForm.querySelector('#upload-file');
const imageEditingForm = uploadForm.querySelector('.img-upload__overlay');
const imageEditingFormClose = imageEditingForm.querySelector('#upload-cancel'); // Кнопка закрытия модального окна
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const btnClick = () => {
  closeImageEditingForm();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) || isEnterKey(evt)) { // Проверяем, нажата ли клавиша Escape или Enter
    evt.preventDefault(); // Предотвращаем действие по умолчанию
    closeImageEditingForm(); // Закрываем модальное окно
  }
}

const showImageEditingForm = () => {
  uploadFileStart.addEventListener('change', () => {
    imageEditingForm.classList.remove('hidden'); // Убираем класс 'hidden', чтобы показать модальное окно
    pageBody.classList.add('modal-open'); // Блокируем прокрутку страницы
    imageEditingFormClose.tabIndex = 2; // Устанавливаем tabindex для кнопки закрытия
    imageEditingForm.tabIndex = 1; // Устанавливаем tabindex для модального окна
    imageEditingForm.focus(); // Устанавливаем фокус на модальное окно

    // Добавляем обработчики событий
    imageEditingFormClose.addEventListener('click', btnClick);
    document.addEventListener('keydown', onDocumentKeydown);
    imageEditingForm.addEventListener('click', onCloseFormClick); // Обработчик для клика вне формы
  });
};

// Закрытие модального окна
function closeImageEditingForm() {
  imageEditingForm.classList.add('hidden'); // Добавляем класс 'hidden', чтобы скрыть модальное окно
  pageBody.classList.remove('modal-open'); // Разрешаем прокрутку страницы

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  imageEditingFormClose.removeEventListener('click', btnClick);
  imageEditingForm.removeEventListener('click', onCloseFormClick);
  uploadFileStart.value = '';
}

// Функция обрабатывает закрытие модального окна при клике вне формы.
const onCloseFormClick = (evt) => {
  if (evt.target === imageEditingForm) { // Проверяем, был ли клик вне формы
    closeImageEditingForm(); // Закрываем модальное окно
  }
};

// Добавляем обработчик для нажатия клавиши Enter на кнопке закрытия
imageEditingForm.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) { // Проверяем, нажата ли клавиша Enter
    closeImageEditingForm(); // Закрываем модальное окно
  }
});


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// Проверка хэштегов
pristine.addValidator(hashtagInput, (value) => {
  // Удаляем лишние пробелы в начале и конце строки и заменяем множественные пробелы на один
  const trimmedValue = value.trim().replace(/\s+/g, ' ');
  const hashtags = trimmedValue.split(' ').filter(Boolean); // Разделяем по пробелам и убираем пустые значения

  // Проверка на количество хэштегов
  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэштегов.';
  }

  const uniqueHashtags = new Set();
  for (let hashtag of hashtags) {
    if (!/^#[A-Za-z0-9]+$/.test(hashtag)) return false; // Проверка на корректный формат
    if (hashtag.length > 20) return false; // Проверка на максимальную длину
    // Проверка на уникальность
    const lowerCaseHashtag = hashtag.toLowerCase();
    if (uniqueHashtags.has(lowerCaseHashtag)) {
      return 'Один и тот же хэштег не может быть использован дважды.';
    }
    uniqueHashtags.add(lowerCaseHashtag);
  }

  return true; // Все проверки пройдены
}, 'Хэштеги должны начинаться с #, содержать только буквы и цифры, быть уникальными и не превышать 20 символов. Пробелы между хэштегами должны быть одиночными.');

// Проверка комментариев
pristine.addValidator(descriptionInput, (value) => {
  return value.length <= 140;
}, 'Комментарий не может превышать 140 символов.');




export { showImageEditingForm };


/* 9.16.Открытое занятие.Внешние API и сторонние библиотеки

8:45 - Код получает доступ к различным элементам модального окна
9:12 - upload - file
13:58 - Обработка нажатий клавиш - Функция onDocumentKeydown
15:36 - Напишите код для валидации формы добавления изображения, используя библиотеку Pristine
18:07 - подключение Pristine.JS
48:47 - валидация длины комментария
52:18 - сообщение об ошибке isHashtagsVal id
55:15 - правила написания хэштега (ошибка)
57:20 - функция подбора слова зависимости окончания
1:02 - запрет на закрытие формы когда стоит фокус на инпуте
1:03 - более надёжная проверка  закрытия формы
1:04 - Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.
1:06 - второе задание 9.15. Помощь друга


*/
