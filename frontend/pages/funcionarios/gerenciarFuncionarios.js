// funções de filtragem de conteúdo

const botaoTodos = document.querySelector('#botaoTodos');
const botaoAtivos = document.querySelector('#botaoAtivos');
const botaoDesativos = document.querySelector('#botaoDesativos');

// adicionar estilização de botão de filtro ativo

// filtro todos

botaoTodos.addEventListener('click', () => {

    botaoTodos.classList.add('ativo');
    botaoAtivos.classList.remove('ativo');
    botaoDesativos.classList.remove('ativo');

})

botaoTodos.addEventListener('mouseover', () => {

    botaoTodos.classList.add('hovered');

})

botaoTodos.addEventListener('mouseout', () => {

    botaoTodos.classList.remove('hovered');

})

// filtro ativos

botaoAtivos.addEventListener('click', () => {

    botaoTodos.classList.remove('ativo');
    botaoAtivos.classList.add('ativo');
    botaoDesativos.classList.remove('ativo');

})

botaoAtivos.addEventListener('mouseover', () => {

    botaoAtivos.classList.add('hovered');

})

botaoAtivos.addEventListener('mouseout', () => {

    botaoAtivos.classList.remove('hovered');

})

// filtro inativos

botaoDesativos.addEventListener('click', () => {

    botaoTodos.classList.remove('ativo');
    botaoAtivos.classList.remove('ativo');
    botaoDesativos.classList.add('ativo');

})

botaoDesativos.addEventListener('mouseover', () => {

    botaoDesativos.classList.add('hovered');

})

botaoDesativos.addEventListener('mouseout', () => {

    botaoDesativos.classList.remove('hovered');

})


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

function abreModalEdit(){
    let modalEdit = document.querySelector('.edit');

    modalEdit.classList.remove('hidden');
    modalEdit.classList.add('flex');
}

function fechaModalEdit(){
    let modalEdit = document.querySelector('.edit');

    modalEdit.classList.remove('flex');
    modalEdit.classList.add('hidden');
}

