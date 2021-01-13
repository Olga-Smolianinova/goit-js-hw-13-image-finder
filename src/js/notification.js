//для более отображения notification установлена предыдущая версия npm: "pnotify": "^4.0.1", соответственно и установка import прописана для этой версии и подключение отличается от версии 5.
// чтобы собрался webpack из пути нужно удалить node_modules

import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import 'pnotify/dist/PNotifyBrightTheme.css'; //дополнительно прописать, чтобы подключились стили к notification

// для переиспользования в fetchCountries.js оборачиваем  notification в функцию showError, showNotice и export их в fetchCountries.js. Добавляем delay(задержку) = 3 сек вместо 10 по умолчанию.

function showError(message) {
  PNotify.error({
    text: message,
    delay: 3000,
  });
}
function showNotice(message) {
  PNotify.notice({
    text: message,
    delay: 3000,
  });
}
export { showError, showNotice };
