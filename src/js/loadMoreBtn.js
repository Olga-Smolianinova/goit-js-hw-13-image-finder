// Доступы к элементам
import refs from './refs.js';

const loadMore = {
  enable() {
    // для варианта работы спиннера через bootstrap, чтобы при выполнении HTTP-запроса кнопка "Load more" была  not disabled
    refs.loadMoreBtn.disabled = false;

    // возвращаем обратно вместо  "Loading..." на "Load more"
    refs.loadMoreBtnLabel.textContent = 'Load more';

    // когда загрузилась страница спиннер добавляем:
    refs.loadMoreBtnSpinner.classList.add('is-hidden');
  },
  disable() {
    // для варианта работы спиннера через bootstrap, чтобы не жонглировать кнопками, снимать-удалять классы, чтобы перед выполнением HTTP-запроса кнопка "Load more" была disabled
    refs.loadMoreBtn.disabled = true;

    // меняем "Load more" на "Loading..."
    refs.loadMoreBtnLabel.textContent = 'Loading...';

    // перед выполнением HTTP-запроса спиннер прячем:
    refs.loadMoreBtnSpinner.classList.remove('is-hidden');
  },
  showBtnLoadMore() {
    // изначально кнопка "Load more" скрыта, показываем ее после первого http-запроса
    refs.loadMoreBtn.classList.remove('is-hidden');
  },
  hideBtnLoadMore() {
    refs.loadMoreBtn.classList.add('is-hidden');
  },
};
export default loadMore;
