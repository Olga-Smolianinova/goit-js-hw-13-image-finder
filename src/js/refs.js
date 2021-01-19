// Доступы к элементам

const refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),

  //кнопка "Load more" и спиннер
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  loadMoreBtnLabel: document.querySelector(
    'button[data-action="load-more"] >.label',
  ),
  loadMoreBtnSpinner: document.querySelector(
    'button[data-action="load-more"] >.spinner',
  ),
  // Lightbox Modal window
  modalContainer: document.querySelector('div.lightbox'),
  // доступ к class="lightbox__image" для модалки, куда будем вставлять большое изображение
  modalImg: document.querySelector('.lightbox__image'),
  // закрытие модального окна по клику на элементе галереи.
  closeModal: document.querySelector('button[data-action="close-lightbox"]'),
  // закрытие модального окна по клику на div.lightbox__overlay.
  overlay: document.querySelector('.lightbox__overlay'),
};

export default refs;
