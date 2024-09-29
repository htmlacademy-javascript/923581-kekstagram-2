import { showAlert } from './util.js';
import { displaySuccessMessage } from './success-message.js';

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
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
  ERROR_INVALID_DATA: 'Переданы некорректные данные для отрисовки миниатюр',
  MESSAGE_NO_DATA_FOR_MODAL: 'Не найдены данные для открытия модального окна',
};

const load = (route, errorText = null, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showAlert(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);
const sendData = (body) =>
  load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body)
    .then(() => {
      displaySuccessMessage(); // Показать сообщение об успехе после успешной отправки
    });

export { getData, sendData, ErrorText };
