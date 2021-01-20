// apiServise.js - это объект, который отвечает на HTTP-запросы и работает с API-кодом. Хранит в себе данные и методы работы с page и per_page

// из этого файла apiServise.js будем экспортировать объект, в котором находится  метод функция fetchImg(searchQuery), который мы будем переиспользовать в файле fetchPhoto.js для обработки HTTP-запросов как apiServise.(ключ)

export default {
  searchQuery: '',
  page: 1,
  perPage: 12,

  // HTTP-запрос и его обработка
  fetchImg() {
    const apiKey = '19870632-ff45bfcc8dee770edfcb419ec';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${apiKey}`;

    return fetch(url)
      .then(response => {
        // console.log(response.status);
        return response.json();
      })
      .then(({ hits }) => {
        this.page += 1; //для того чтобы при нажатии на кнопку "Load more" подгружалась новая часть запроса на следующей странице

        return hits;
      });
  },

  //   при изменении запроса при input начинает отсчет для вывода данных на страницы с page=1
  resetPage() {
    this.page = 1;
  },

  // для того чтобы записывать данные из input в searchQuery обратимся к свойствам get/set, чтобы из внешнего когда записать заначение в этот ключ(
  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};
