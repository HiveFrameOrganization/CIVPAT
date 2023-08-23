const botaoTodos = document.querySelector('#botaoTodos');
const botaoAtivos = document.querySelector('#botaoAtivos');
const botaoDesativos = document.querySelector('#botaoDesativos');

// adicionar estilização de botão de filtro ativo

botaoTodos.addEventListener('click', () => {

    botaoTodos.classList.add('ativo');
    botaoAtivos.classList.remove('ativo');
    botaoDesativos.classList.remove('ativo');

})

botaoAtivos.addEventListener('click', () => {

    botaoTodos.classList.remove('ativo');
    botaoAtivos.classList.add('ativo');
    botaoDesativos.classList.remove('ativo');

})

botaoDesativos.addEventListener('click', () => {

    botaoTodos.classList.remove('ativo');
    botaoAtivos.classList.remove('ativo');
    botaoDesativos.classList.add('ativo');

})