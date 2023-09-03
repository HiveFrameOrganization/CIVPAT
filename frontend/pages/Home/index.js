// Modal

const openModalButton = document.querySelector('#open-modal-btn');
const closeModalButton = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');
const modalFade = document.querySelector('#modal-fade');

const toggleModal = () => [modal, modalFade].forEach((el) => el.classList.toggle('hide'));

[openModalButton, closeModalButton, modalFade].forEach((el) => el.addEventListener('click', toggleModal));

// funções da barra de pesquisa

const hiddenInput = document.querySelector('#hidden-input'),
      searchButton = document.querySelector('#search-btn');

// alternar visibilidade do input
function toggleInputVisibility() {

    searchButton.classList.contains('rounded-r-md') ? searchButton.classList.replace('rounded-r-md', 'rounded-md') : searchButton.classList.replace('rounded-md', 'rounded-r-md');
    hiddenInput.classList.toggle('hidden');
}

searchButton.addEventListener('click', () => {

    // Verifica se o input se visível ou não
    if (!hiddenInput.classList.contains('hidden') && hiddenInput.value != '') {
        // Visível e preenchido
        return;
    } else if (!hiddenInput.classList.contains('hidden') && hiddenInput.value == '') {
        // Visível, mas não preenchido
        toggleInputVisibility();
        return;
    }
    // Escondido
    toggleInputVisibility();
});
