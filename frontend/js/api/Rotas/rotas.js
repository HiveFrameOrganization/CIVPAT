const raiz = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const frontPages = raiz + '/frontend/pages';
const frontApi = raiz + '/frontend/js/api';
const back = raiz + '/backend/php';

export { raiz, frontPages, frontApi, back }