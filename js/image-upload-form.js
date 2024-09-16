import { isEscapeKey } from './util.js';
import { onEffectChange, updateScale, onSmallerClick, onBiggerClick } from './effects-slider.js';
import { isValid, hashtagInput, descriptionInput } from './validation.js'; // Импортируем функции валидации

const uploadForm = document.querySelector('.img-upload__form'); // Форма загрузки изображения
const imageEditingForm = document.querySelector('.img-upload__overlay'); // Модальное окно редактирования изображения
const uploadFileStart = uploadForm.querySelector('#upload-file'); // Поле для загрузки файла
const imageEditingFormClose = uploadForm.querySelector('#upload-cancel'); // Кнопка закрытия модального окна
const effectLevelControl = uploadForm.querySelector('.img-upload__effect-level'); // Элемент уровня эффекта
const effectsList = uploadForm.querySelector('.effects__list'); // Список эффектов

// Определяем элементы управления масштабом
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller'); // Кнопка уменьшения масштаба
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger'); // Кнопка увеличения масштаба

const btnClick = () => {
  onImageEditingFormClose(); // Закрытие формы редактирования изображения при нажатии на кнопку
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) { // Проверяем, нажата ли клавиша Escape
    evt.preventDefault(); // Предотвращаем действие по умолчанию
    if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation(); // Останавливаем дальнейшую обработку события
    } else {
      onImageEditingFormClose(); // Закрываем форму редактирования изображения
    }
  }
};

function onImageEditingFormClose() {
  document.body.classList.remove('modal-open');
  imageEditingForm.classList.add('hidden');
  effectLevelControl.classList.add('hidden');
  uploadForm.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
  imageEditingFormClose.removeEventListener('click', btnClick);
  document.removeEventListener('click', onOutsideClick);
}

function onOutsideClick(evt) {
  if (evt.target === imageEditingForm) {
    onImageEditingFormClose(); // Закрываем модальное окно при клике вне него
  }
}

const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  imageEditingForm.classList.remove('hidden');
  updateScale(); // Обновляем отображение масштаба
  imageEditingFormClose.addEventListener('click', btnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
};

const onFormSubmit = (evt) => {
  if (!isValid()) { // Используем импортированную функцию валидации
    evt.preventDefault();
  }
};

// Добавляем обработчики событий на элементы формы и кнопки управления масштабом
uploadFileStart.addEventListener('change', onPhotoSelect);
uploadForm.addEventListener('submit', onFormSubmit);
effectsList.addEventListener('change', onEffectChange);
scaleControlSmaller.addEventListener('click', onSmallerClick);
scaleControlBigger.addEventListener('click', onBiggerClick);
