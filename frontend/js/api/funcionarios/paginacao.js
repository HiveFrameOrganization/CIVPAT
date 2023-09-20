import retornaFuncionarios from "./pegarFuncionarios.js";

// Criar os botões de paginação e adiciona a função que muda a página
function botoesPaginacao(filtro) {
    // Puxa a quantidade de botões do sessionStorage
    const qtdBotoesFun = sessionStorage.getItem(`qtdBotoesFun${filtro}`);
    // Puxa o elemento que irá receber os botoes
    const containerPaginacao = document.getElementById('paginacao');

    containerPaginacao.innerHTML = `
    <a id="antPagina" href="#df" class="w-4 h-4">
        <img src="../../img/icon/arrow-left.svg" alt="Voltar página" class="w-full">
    </a>
    <a id="proxPagina" href="#df" class="w-4 h-4">
    <img src="../../img/icon/arrow-right.svg" alt="Avançar página" class="w-full">
    </a>`

    if (qtdBotoesFun <= 1 && sessionStorage.getItem('paginaFun') >= qtdBotoesFun) {
        document.getElementById('proxPagina').hidden = true;
    }

    // Criando o primeiro botão
    const priBotao = document.createElement('a');

    if (sessionStorage.getItem('paginaFun') == 1) {
        // pagina selecionado
        priBotao.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
    } else {
        // outros botoes
        priBotao.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
    }

    priBotao.href = '#fd'
    priBotao.textContent = 1
    priBotao.id = `pesquisa${1}`
    priBotao.onclick = () => {
        colocarPagina(1)
        retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'))
        botoesPaginacao(localStorage.getItem('filtroPadraoFuncionario'));
    }

    const setaProxPagina = containerPaginacao.querySelector("a.w-4.h-4:last-child");
    // impedir que botoes apareçam em determinados casos
    if(sessionStorage.getItem(`qtdBotoesFun${filtro}`) == sessionStorage.getItem('paginaFun')){
        setaProxPagina.classList.add('hidden')
    }
    if(sessionStorage.getItem('paginaFun') == 1){
        document.querySelector('#antPagina').classList.add('hidden')
    }
    containerPaginacao.insertBefore(priBotao, setaProxPagina);
    // Final Primeiro Botão

    // adcionar funçoes no botao de ir e voltar
    setaProxPagina.addEventListener('click', ()=>{
        colocarPagina(parseInt(sessionStorage.getItem('paginaFun')) + 1)
        retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'))
        botoesPaginacao(localStorage.getItem('filtroPadraoFuncionario'));
    })
    document.querySelector('#antPagina').addEventListener('click', ()=>{
        colocarPagina(parseInt(sessionStorage.getItem('paginaFun')) - 1)
        retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'))
        botoesPaginacao(localStorage.getItem('filtroPadraoFuncionario'));
    })

    const paginaAtual = sessionStorage.getItem('paginaFun');
    if (paginaAtual > 4 && qtdBotoesFun > 4) {
        const divisor = document.createElement('span');
        divisor.textContent = '...'
        containerPaginacao.insertBefore(divisor, setaProxPagina);
    }

    // Seta a quantidade de botões, caso não exista, evitando requisições extras ao banco
    // necessário desetar no cadastro de usuário !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (let i = paginaAtual - 2; i <= parseInt(paginaAtual) + 2; i++) {
        if (i > 1 && i < qtdBotoesFun  ) {
            const a = document.createElement('a');
    
            if (sessionStorage.getItem('paginaFun') == i) {
                // pagina selecionado
                a.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
            } else {
                // outros botoes
                a.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
            }
    
            a.href = '#fd'
            a.textContent = i
            a.id = `pesquisa${i}`
            a.onclick = () => {
                colocarPagina(i)
                retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'))
                botoesPaginacao(localStorage.getItem('filtroPadraoFuncionario'));
            }
    
            containerPaginacao.insertBefore(a, setaProxPagina);
        }
    }

    if (paginaAtual < 4 && qtdBotoesFun > 4) {
        const divisor2 = document.createElement('span');
        divisor2.textContent = '...'
        containerPaginacao.insertBefore(divisor2, setaProxPagina);
    }

    if (qtdBotoesFun > 1) {
        // Criando o ultimo botão
        const ultBotao = document.createElement('a');

        if (sessionStorage.getItem('paginaFun') == qtdBotoesFun) {
            // pagina selecionado
            ultBotao.classList = 'in-page bg-body text-color-text text-sm px-3 py-1 rounded-md'
        } else {
            // outros botoes
            ultBotao.classList = 'bg-body text-color-text text-sm px-3 py-1 rounded-md'
        }

        ultBotao.href = '#fd'
        ultBotao.textContent = qtdBotoesFun
        ultBotao.id = `pesquisa${qtdBotoesFun}`
        ultBotao.onclick = () => {
            colocarPagina(qtdBotoesFun)
            retornaFuncionarios(localStorage.getItem('filtroPadraoFuncionario'))
            botoesPaginacao(localStorage.getItem('filtroPadraoFuncionario'));
        }

        containerPaginacao.insertBefore(ultBotao, setaProxPagina);
        // Final Ultimo Botão
    }
}

// Seta o número da página no sessionStorage
function colocarPagina(num) {
    sessionStorage.setItem('paginaFun', num);
}

async function mudarAba(filtro) {
    colocarPagina(1);
    localStorage.setItem('filtroPadraoFuncionario', filtro);
    await retornaFuncionarios(filtro);
    botoesPaginacao(filtro);
}

export default botoesPaginacao
export { mudarAba }
