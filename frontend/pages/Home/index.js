// Modal

const openModalButton = document.querySelector('#open-modal-btn');
const closeModalButton = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');
const modalFade = document.querySelector('#modal-fade');

const toggleModal = () => [modal, modalFade].forEach((el) => el.classList.toggle('hide'));

[openModalButton, closeModalButton, modalFade].forEach((el) => el.addEventListener('click', toggleModal));
