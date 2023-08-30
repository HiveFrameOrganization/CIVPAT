// Modal

const openModalButton = document.querySelector('#open-modal-btn');
const closeModalButton = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');

const toggleModal = () => [modal, fade].forEach((el) => el.classList.toggle('hide'));

[openModalButton, closeModalButton, fade].forEach((el) => el.addEventListener('click', toggleModal));
