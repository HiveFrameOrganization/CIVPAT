// funções de filtragem de conteúdo

const botaoTodos = document.querySelector('#botaoTodos');
const botaoAtivos = document.querySelector('#botaoAtivos');
const botaoDesativos = document.querySelector('#botaoDesativos');

// Funções para controlar os botões
const navButtons = document.querySelectorAll('.nav-btn');

function removerBotoesSelecionados() {

    navButtons.forEach((button) => {

        button.classList.remove('text-primary');
        button.classList.remove('border-b-2');
        button.classList.remove('border-primary');
    });
}

navButtons.forEach((button) => {

    button.addEventListener('click', () => {

        removerBotoesSelecionados();

        button.classList.add('text-primary');
        button.classList.add('border-b-2');
        button.classList.add('border-primary');
    })
});


// funções da barra de pesquisa
const hiddenInput = document.querySelector('#pesquisarUsuario'),
      searchButton = document.querySelector('#botaoPesquisar');

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

const modalCadastrar = document.querySelector('#modal-cadastrar');
const fecharModalCadastrar = document.querySelector('#close-modal-cad');
const modalCadFade = document.querySelector('#modal-fade-cad');

const openAndCloseModal = () => {

    [modalCadastrar, modalCadFade].forEach((el) => el.classList.toggle('hide'));

};

[fecharModalCadastrar, modalCadFade, document.querySelector('#cadastrar-btn')].forEach((el) => el.addEventListener('click', openAndCloseModal));
