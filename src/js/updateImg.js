// Доступы к элементам
import refs from './refs.js';

// Получаем доступ к шаблону
import template from '../templates/gallery-elm.hbs';

function updateImg(hits) {
  const markup = template(hits);
  // console.log(markup);

  // встраиваем полученные данные в HTML документ
  refs.container.insertAdjacentHTML('beforeend', markup);
}

export default updateImg;
