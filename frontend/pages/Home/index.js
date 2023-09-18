// Controlar a Modal de cadastrar propostas


const openModalButton = document.querySelector('#open-modal-btn');
const closeModalButton = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');
const modalFade = document.querySelector('#modal-fade');

const toggleModal = () => [modal, modalFade].forEach((el) => el.classList.toggle('hide'));

[openModalButton, closeModalButton, modalFade].forEach((el) => el.addEventListener('click', toggleModal));

// ----------------------------------------------------------
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

// Feedback de a mostragem de caracteres do resumo do Cadastro de proposta

const tamanhoAtual = document.querySelector('#tamanho-atual');
const textoResumo = document.querySelector('#textoResumo');
const tamanhoMaximo = 500;

textoResumo.setAttribute('maxlength', '500');

textoResumo.addEventListener('keyup', () => {

    if (textoResumo.value.length <= 500) {

        tamanhoAtual.textContent = textoResumo.value.length;
    }

});
