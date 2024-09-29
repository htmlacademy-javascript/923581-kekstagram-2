import { displaySuccessMessage } from './success-message.js';
import { displayErrorMessage } from './error-message.js'; // Импорт функции для отображения сообщения об ошибке
import { showAlert } from './util.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '//',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  ERROR_INVALID_DATA: 'Переданы некорректные данные для отрисовки миниатюр',
  MESSAGE_NO_DATA_FOR_MODAL: 'Не найдены данные для открытия модального окна',
};

const load = (route, errorText = null, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(); // Если ответ не успешен, выбрасываем ошибку
      }
      return response.json();
    })
    .catch(() => {
      showAlert(errorText); // Показать общий алерт при ошибке загрузки данных
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => {
  // Удаляем старые сообщения перед отправкой
  const existingSuccessMessage = document.querySelector('.success');
  const existingErrorMessage = document.querySelector('.error');

  if (existingSuccessMessage) {
    existingSuccessMessage.remove(); // Удаляем сообщение об успехе
  }

  if (existingErrorMessage) {
    existingErrorMessage.remove(); // Удаляем сообщение об ошибке
  }

  return load(Route.SEND_DATA, null, Method.POST, body)
    .then(() => {
      displaySuccessMessage(); // Показать сообщение об успехе
    })
    .catch(() => {
      displayErrorMessage(body); // Показать сообщение об ошибке
    });
};


export { getData, sendData, ErrorText };
