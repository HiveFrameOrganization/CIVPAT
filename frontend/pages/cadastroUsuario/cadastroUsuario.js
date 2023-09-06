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

const pesquisa = document.querySelector('#pesquisarUsuario');
const iconePesquisa = document.querySelector('#botaoPesquisar');
const barraPesquisa = document.querySelector('#barraPesquisa');

if(window.screen.width > 422){

    iconePesquisa.addEventListener('click', () => {
        pesquisa.classList.remove('w-[42px]');
        pesquisa.classList.add('w-[300px]');
        pesquisa.style.paddingRight = '42px';
    })
    
    document.addEventListener('click', (event) => {
        if(!barraPesquisa.contains(event.target)){
            pesquisa.classList.remove('w-[300px]');
            pesquisa.classList.add('w-[42px]');
            pesquisa.style.paddingRight = '0px';
        }
    })
} else {
    
    iconePesquisa.addEventListener('click', () => {
        pesquisa.classList.remove('w-[42px]');
        pesquisa.classList.add('w-[200px]');
        pesquisa.style.paddingRight = '42px';
    })
    
    document.addEventListener('click', (event) => {
        if(!barraPesquisa.contains(event.target)){
            pesquisa.classList.remove('w-[200px]');
            pesquisa.classList.add('w-[42px]');
            pesquisa.style.paddingRight = '0px';
        }
    })
}


// funções do ícone de detalhes do funcionário

const optionDropdownTriggers = document.querySelectorAll('.option-dropdown-trigger');

function toggleHide() {

    optionDropdownTriggers.forEach((trigger) => {

        trigger.parentElement.querySelector('.option-dropdown').classList.add('hidden')
        trigger.parentElement.parentElement.parentElement.classList.remove('selected-row');
    });
}

window.addEventListener('click', (event) => {


    if (event.target.matches('.option-dropdown-trigger')) {

        const el = event.target.parentElement.querySelector('.option-dropdown');

        toggleHide();

        el.classList.toggle('hidden');

        event.target.parentElement.parentElement.parentElement.classList.toggle('selected-row');
    } else {

        toggleHide();
    }
});


// funções do modal de edição

function fechaModalEdit(){
    let modalEdit = document.querySelector('.edit');

    modalEdit.classList.remove('flex');
    modalEdit.classList.add('hidden');
}
