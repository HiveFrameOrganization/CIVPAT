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