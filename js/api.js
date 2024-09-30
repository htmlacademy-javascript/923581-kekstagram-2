import { ErrorText } from './constants.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, errorText = null, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText || 'Произошла ошибка'); // Используйте errorText, если он задан
      }
      return response.json();
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, null, Method.POST, body);


export { getData, sendData, ErrorText };
