// Controlar a Modal de cadastrar propostas


const openModalButton = document.querySelector('#open-modal-btn');
const closeModalButton = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');
const modalFade = document.querySelector('#modal-fade');

const toggleModal = () => [modal, modalFade].forEach((el) => el.classList.toggle('hide'));

[openModalButton, closeModalButton, modalFade].forEach((el) => el.addEventListener('click', toggleModal));

// ----------------------------------------------------------

// Funções para controlar os botões de filtragem
const filterButtons = document.querySelectorAll('.filter-btn');

function removerBotoesSelecionados() {

    filterButtons.forEach((button) => {

        button.classList.remove('text-primary');
        button.classList.remove('border-b-2');
        button.classList.remove('border-primary');
    });
}

filterButtons.forEach((button) => {

    button.addEventListener('click', () => {

        removerBotoesSelecionados();

        button.classList.add('text-primary');
        button.classList.add('border-b-2');
        button.classList.add('border-primary');
    })
});
// ----------------------------------------------------------

