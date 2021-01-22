// Доступы к элементам
import refs from './refs.js';

// доступ к debounce, чтобы текст из input появлялся через 1000ms после того как пользователь перестал вводить текст
// import debounce from 'lodash.debounce';

// Доступ к функции для встраивания данных с бекенда  через шаблон в HTML
import updateImg from './updateImg.js';

// Доступ к файлу servise, который дополнительно будет обрабатывать API-запрос
import apiServise from './apiServise.js';

// Доступ к кнопке "Load More" co спиннером
import loadMore from './loadMoreBtn.js';

// доступ к функция showError() и showNotice() из notificaion.js для вывода сообщения о некорректном запросе и уведомлении
import { showError, showNotice } from './notification.js';

// Для того чтобы работала поисковая строка, сначала вешаем слушателя событий на форму и получаем доступ к тому, что введет пользователь в input, обратившись к  event.target.value. Также добавляем debounce для того, чтобы текст из input появлялся через 1000ms после того как пользователь перестал вводить текст и обрабатываем действия в функции onFormSearch
refs.form.addEventListener('submit', onFormSearch);

function onFormSearch(event) {
  event.preventDefault();

  apiServise.query = event.target.elements.query.value;
  // console.log(apiServise.query);

  // чтобы при добавлении новой информации поиска предыдущий список не показывался и обновлялся прописываем:
  refs.container.innerHTML = '';

  // для того чтобы при вводе нового запроса в input отправлялся новый запрос, а не продолжалось действие page+=1 добавляем метод resetPage, который прописан в файле servise.js :
  apiServise.resetPage();

  // вызов функции для fetch запроса и его обработки
  onFetch();

  // // чтобы очищались данные input:
  // refs.form.reset();
  // или
  // event.target.elements.query.value = '';
}

// для дозагрузки информации (рестпагинация) вешаем слушателя события на кнопку "Load more" и прописываем как обрабатывать HTTP-запрос:
refs.loadMoreBtn.addEventListener('click', onFetch);

// fetch запрос и его обработка
function onFetch() {
  //  перед HTTP-запросом скрываем кнопку "Load more" и запускаем спиннер
  // чтобы пока идет HTTP-запрос и работает спиннер кнопка "Load more" была скрыта
  // при нажатии на кнопку"Load more" запускаем спиннер:
  loadMore.disable();

  //проверка на то, если пользователь ничего не ввел в input выводим notification
  if (!apiServise.query) {
    loadMore.hideBtnLoadMore();
    showNotice('Please, enter your request!');
    return;
  }

  // обрабатваем запрос из input, встраиваем в шаблон и отображаем в HTML с помощью функции fetchImg, работа которой прописана в файле apiServise.js

  apiServise
    .fetchImg()
    .then(hits => {
      //
      if (hits.length !== apiServise.perPage) {
        updateImg(hits);
        showNotice(
          'You have viewed all the images for your request. Please, enter a new search!',
        );
        loadMore.hideBtnLoadMore();

        // console.log('hits.length:', hits.length);
        // console.log('perPage: ', apiServise.perPage);
        return;
      }

      // console.log(hits);
      // обрабатываем данные с бекенда и встраиваем их в шаблон с помощью функции updateImg, работа которой прописана в файле updateImg.js
      updateImg(hits);

      loadMore.showBtnLoadMore(); //изначально кнопка "Load more" скрыта, показываем ее после первого http-запроса:

      loadMore.enable(); //работа спиннера

      // Метод window.scrollTo позволяет сделать плавную прокрутку.
      // когда успешно все загрузилось, чтобы прокрутить до самого низа окно. Это стоит делать  в том случае, если знаем что загрузжается указанное количество элементов на странице. Чтобы прокрутить на всю высоту до самого низа документа:
      window.scrollTo({
        // top: 10000000,
        // чтобы не прописывать рандомное число для корректной прокрутки, указем свойство, которое отвечает за всю высоту документа offsetHeight:
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      loadMore.hideBtnLoadMore();
      showError('No matches were found!');
      return;
    });
}
