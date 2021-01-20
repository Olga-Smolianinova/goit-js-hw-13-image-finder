import refs from './refs.js';

// const basicLightbox = require('basiclightbox');
import * as basicLightbox from 'basiclightbox';
// console.log(basicLightbox);

const instance = basicLightbox.create(refs.modalImg);
// console.log(instance);

// =============================================================
// СЛУШАТЕЛИ СОБЫТИЙ
// для открытия и закрытия модального окна вешаем слушателя событий на родителя li - это ul -refs.container
const onGalleryClick = refs.container.addEventListener('click', onOpenModal);
const closeModalBtn = refs.closeModal.addEventListener('click', onCloseModal);

// 2. Закрытие модального окна по клику на div.lightbox__overlay.
const overlayRef = refs.overlay.addEventListener('click', onCloseModal);

// =============================================================
function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  // в этой переменной получаем ссылку на большое изображение  в img data-source
  const largeImageUrl = event.target.dataset.source;
  // console.log(event.target);
  // console.log(event.target.dataset.source);
  // console.log(largeImageUrl);

  // в этой переменной получаем ссылку на большое изображение  в img alt
  const imageAlt = event.target.alt;
  // console.log(event.target.alt);

  // и теперь ссылка на него будет подставляться в img src, alt
  refs.modalImg.src = largeImageUrl;
  refs.modalImg.alt = imageAlt;
  console.log(refs.modalImg);

  // открытие модального окна из плагина basicLightbox и добавление класса 'is-open'
  instance.show();
  refs.modalContainer.classList.add('is-open');

  //1 Для закрытие модального окна по нажатию клавиши ESC - сначала вешаем слушателя события.
  window.addEventListener('keydown', onPressEscape);
}

function onCloseModal() {
  // Очистка значения атрибутов img
  refs.modalImg.src = '';
  refs.modalImg.alt = '';
  // console.log(refs.modalImg);

  // закрытие модального окна из плагина basicLightbox и снятие класса 'is-open'
  instance.close();
  refs.modalContainer.classList.remove('is-open');

  //1.1. При закрытии модального окна по нажатию клавиши ESC - удаляем слушателя события.
  window.removeEventListener('keydown', onPressEscape);
}

//1.2. Закрытие модального окна по нажатию клавиши ESC.
function onPressEscape(event) {
  // console.log(event.key);
  // console.log(event.code);

  if (event.code === 'Escape') {
    onCloseModal();
  }
}
