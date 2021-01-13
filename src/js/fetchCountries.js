// доступ к debounce, чтобы текст из input появлялся через 500ms после того как пользователь перестал вводить текст
import debounce from 'lodash.debounce';

// получаем доступ к шаблону для отображения 1 страны
import templateOneCountry from '../templates/one-country.hbs';

// получаем доступ к шаблону для отображения списка стран
import templateFewCountries from '../templates/list-countries.hbs';

// доступ к функция showError() и showNotice() из notificaion.js для вывода сообщения о некорректном запросе и уведомлении
import { showError, showNotice } from './notification.js';

// Доступ к элементам
const refs = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.countries'),
};

// Для того чтобы работала поисковая строка, сначала вешаем слушателя событий на форму и получаем доступ к тому, что введет пользователь в input, обратившись к  event.target.value. Также добавляем debounce для того, чтобы текст из input появлялся через 500ms после того как пользователь перестал вводить текст
refs.form.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
  const inputValue = event.target.value;
  // console.log(inputValue);

  // чтобы при добавлении новой информации поиска предыдущий список не показывался и обновлялся прописываем:
  refs.container.innerHTML = '';

  // отправляем запрос по тем данным, которые были введены в строку input
  fetchCountries(inputValue);
}

function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  // если пользователь ввел данные, а потом стер. Чтобы не отправлять данные на бекенд прописываем условие и в дополнение выводим notification:
  if (!searchQuery) {
    showNotice('Please, enter country name!');
    return;
  }
  // обрабатываем ответ с бекенда
  return fetch(url)
    .then(response => {
      // console.log(response.status);
      // throw new Error('Error fetching data');
      // return response.json();

      if (response.status !== 200) {
        throw new Error('Error fetching data'); //прописываем для того чтобы лучше отловить ошибки. В этом случае, если ответ хоть немного не 200, тогда ошибка ловится в catch
        return;
      } else {
        return response.json();
      }
    })
    .then(data => {
      // если бекенд возвращает больше чем 10 стран подошедших под критерий введенный пользователем, в интерфейсе отображается notification о том, что необходимо сделать запрос более специфичным. Для оповещений используем плагин pnotify и переиспользуем функция showError(message) из notificaion.js
      if (data.length > 10) {
        showError(
          'Too many matches found. Please enter a more specific query!',
        );
      }
      // Если бекенд возвращает от 2-х до 10-х стран, под инпутом отображается список имен найденных стран.
      else if (data.length >= 2 && data.length <= 10) {
        updateListOfCountries(data);
      } else {
        // подставляем полученные данные в подготовленный шаблон для отображения одного элемента с помощью функции updateOneCountry
        updateOneCountry(data);
        // console.log(data);
        // console.log(data.length);
      }
    })
    .catch(error => {
      if ((error = 404)) {
        showError('No matches were found! Check your request.');
      } else {
        showError('Oops! Something went wrong. Try again.');
      }
    });
}

// для отрисовки данных одного элемента в шаблон в HTML используем функцию
function updateOneCountry(data) {
  // подставляем данные в шаблон
  const markup = templateOneCountry(data);
  // console.log(markup);

  // встраиваем полученные данные в HTML документ
  refs.container.insertAdjacentHTML('beforeend', markup);
}

// для отрисовки данных нескольких стран через шаблон в HTML используем функцию updateListOfCountries:
function updateListOfCountries(data) {
  const markup = templateFewCountries(data);

  // встраиваем полученные данные в HTML документ
  refs.container.insertAdjacentHTML('beforeend', markup);
}
