// Funções para controlar os botões
import alertas from "../../js/feedback.js";
window.addEventListener('load', ()=>{
    alertas()
})

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

if(sessionStorage.getItem('paginaProduto') == 0){
    document.querySelector("#voltarPagina").classList.add('hidden')
}else{
    document.querySelector("#voltarPagina").addEventListener('click', ()=>{
        sessionStorage.setItem('paginaProduto', Number(sessionStorage.getItem('paginaProduto')) - 1)
        window.location.reload()
    })    
}

if(Number(sessionStorage.getItem('qtdBotoesProduto')) - 1 == sessionStorage.getItem('paginaProduto')){
    document.querySelector("#avançarPagina").classList.add('hidden')
}else{
    document.querySelector("#avançarPagina").addEventListener('click', ()=>{
        sessionStorage.setItem('paginaProduto', sessionStorage.getItem('avançarPagina') + 1)
        window.location.reload()
    })
}


