import { isEscapeKey, isEnterKey } from './util.js';
// import { onEffectChange } from './effects-slider.js';
import { error, isHashtagsValid } from './hashtag-validation.js';

const SCALE_STEP = 6.25; // Шаг изменения масштаба
const uploadForm = document.querySelector('.img-upload__form'); // Форма загрузки изображения
const imageEditingForm = document.querySelector('.img-upload__overlay'); // Модальное окно редактирования изображения
const uploadFileStart = uploadForm.querySelector('#upload-file'); // Поле для загрузки файла
const imageEditingFormClose = uploadForm.querySelector('#upload-cancel'); // Кнопка закрытия модального окна
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller'); // Кнопка уменьшения масштаба
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger'); // Кнопка увеличения масштаба
const previewImage = uploadForm.querySelector('.img-upload__preview'); // Предпросмотр загружаемого изображения
const scaleControlValue = uploadForm.querySelector('.scale__control--value'); // Элемент для отображения значения масштаба
const effectLevelControl = uploadForm.querySelector('.img-upload__effect-level'); // Элемент уровня эффекта
const effectsList = uploadForm.querySelector('.effects__list'); // Список эффектов
const hashtagInput = uploadForm.querySelector('.text__hashtags'); // Поле для ввода хэштегов
const descriptionInput = uploadForm.querySelector('.text__description'); // Поле для ввода описания

// Скрытое поле для хранения значения масштаба
const hiddenScaleInput = document.createElement('input');
hiddenScaleInput.type = 'hidden';
hiddenScaleInput.name = 'scale';
uploadForm.appendChild(hiddenScaleInput); // Добавляем скрытое поле в форму

let currentScale = 1; // Текущий масштаб

// Инициализация библиотеки Pristine для валидации формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Валидатор для проверки длины комментария
const isDescriptionValid = (value) => {
  return value.length <= 140; // Проверка на максимальную длину комментария
};

const btnClick = () => {
  onPhotoSelect(); // Выбор фотографии
};

// function onDocumentKeydown(evt) {
//   // Проверяем, нажата ли клавиша Escape
//   if (isEscapeKey(evt)) {
//     evt.preventDefault(); // Предотвращаем действие по умолчанию
//     onImageEditingFormClose(); // Закрываем модальное окно
//   }
// }

// const onDocumentKeydown = (evt) => {
//   if (isEscapeKey(evt)) { // Проверяем, нажата ли клавиша Escape
//     evt.preventDefault(); // Предотвращаем действие по умолчанию
//     if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) { // Проверяем, есть ли активный элемент
//       evt.stopPropagation(); // Останавливаем дальнейшую обработку события
//     }
//   } else {
//     uploadForm.reset(); // Сбрасываем форму загрузки
//     onImageEditingFormClose(); // Закрываем форму редактирования изображения
//   }
// }

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) { // Проверяем, нажата ли клавиша Escape
    evt.preventDefault(); // Предотвращаем действие по умолчанию
    // Проверяем, является ли активный элемент одним из целевых полей ввода
    if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation(); // Останавливаем дальнейшую обработку события
    } else {
      // Если активный элемент не является целевым полем ввода,
      // можно выполнить дополнительные действия или просто ничего не делать
      uploadForm.reset(); // Сбрасываем форму загрузки
      onImageEditingFormClose(); // Закрываем форму редактирования изображения
    }
  }
}

// Добавление валидатора для описания
pristine.addValidator(descriptionInput, isDescriptionValid, 'Длина комментария не может превышать 140 символов', 2, false);

function onImageEditingFormClose() {
  document.body.classList.remove('modal-open'); // Убираем класс, блокирующий прокрутку страницы
  imageEditingForm.classList.add('hidden'); // Скрываем модальное окно редактирования изображения
  imageEditingFormClose.tabIndex = 2; // Устанавливаем tabindex для кнопки закрытия
  imageEditingForm.tabIndex = 1; // Устанавливаем tabindex для модального окна
  imageEditingForm.focus(); // Устанавливаем фокус на модальное окно
  currentScale = 1; // Сбрасываем масштаб
  updateScale(); // Обновляем масштаб изображения
  effectLevelControl.classList.add('hidden'); // Скрываем уровень эффекта
  previewImage.style.filter = 'none'; // Убираем фильтр с изображения
  uploadForm.reset(); // Сбрасываем форму

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  imageEditingFormClose.removeEventListener('click', btnClick);
  document.removeEventListener('click', onOutsideClick);
}

function onOutsideClick(evt) {
  // Проверяем, был ли клик вне области модального окна
  if (evt.target === imageEditingForm) {
    // console.log('Клик вне модального окна'); // Для отладки
    onImageEditingFormClose(); // Закрываем модальное окно
  }
};

const onPhotoSelect = () => {
  document.body.classList.add('modal-open'); // Блокируем прокрутку страницы при открытии модального окна
  imageEditingForm.classList.remove('hidden'); // Показываем модальное окно редактирования

  // Добавляем обработчики событий для закрытия окна и нажатия клавиш
  imageEditingFormClose.addEventListener('click', onImageEditingFormClose);
  document.addEventListener('keydown', onDocumentKeydown);
  imageEditingFormClose.addEventListener('click', btnClick);
  document.addEventListener('click', onOutsideClick); // Обработчик для клика вне области
};

const updateScale = () => {
  previewImage.style.transform = `scale(${currentScale})`; // Обновляем масштаб изображения в зависимости от текущего значения
  scaleControlValue.value = `${currentScale * 100}%`; // Обновляем отображение значения масштаба
  hiddenScaleInput.value = currentScale; // Обновляем скрытое поле с масштабом
};

const onSmallerClick = () => {
  if (currentScale > SCALE_STEP) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
}

const onBiggerClick = () => {
  if (currentScale < 1) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

const resetScaleOnEffectChange = () => {
  currentScale = 1; // Сброс масштаба при смене эффекта
  updateScale();
};

effectsList.addEventListener('change', () => {
  resetScaleOnEffectChange();
});

const onHashtagInput = () => {
  isHashtagsValid(hashtagInput.value);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replace(/\s+/g, ' ');
    uploadForm.submit();
  }
};

// Валидация хэштегов с использованием Pristine
pristine.addValidator(hashtagInput, isHashtagsValid, error, 2, false);

// Добавляем обработчики событий на элементы формы и кнопки управления масштабом
uploadFileStart.addEventListener('change', onPhotoSelect);
scaleControlSmaller.addEventListener('click', onSmallerClick);
scaleControlBigger.addEventListener('click', onBiggerClick);
// effectsList.addEventListener('change', onEffectChange);
hashtagInput.addEventListener('input', onHashtagInput);
uploadForm.addEventListener('submit', onFormSubmit);

// export { imageEditingFormClose };


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
1:03 - более надёжная проверка  закрытия формы onDocumentKeydown
1:04 - Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.
1:06 - второе задание 9.15. Помощь друга


*/


// const onDocumentKeydown = (evt): void => {
//   if (isEscapeKey(evt)) { // Исправлено название функции
//     evt.preventDefault(); // Исправлено название метода
//     if (document.activeElement) { // Добавлены отсутствующие фигурные скобки
//       evt.stopPropagation(); // Убедитесь, что этот метод вызывается правильно
//     }
//   } else {
//     uploadForm.reset();
//     closePhotoEditor();
//   }
// }

// // Предполагается, что hashtagInput определен где-то в вашем коде
// if (hashtagInput || document.activeElement) {
//   // Здесь можно добавить дополнительную логику, если необходимо
// }
