// Modal

const openModalButton = document.querySelector('#open-modal-btn');
const closeModalButton = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');
const modalFade = document.querySelector('#modal-fade');

const toggleModal = () => [modal, modalFade].forEach((el) => el.classList.toggle('hide'));

[openModalButton, closeModalButton, modalFade].forEach((el) => el.addEventListener('click', toggleModal));

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