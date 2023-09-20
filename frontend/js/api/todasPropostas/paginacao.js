import pegarTodasAsPropostas from './pegarPropostas.js';

// Criar os botões de paginação e adiciona a função que muda a página
function botoesPaginacao(filtro) {
    const qtdBotoes = sessionStorage.getItem(`qtdBotoesProposta${filtro}`);
    const containerPaginacao = document.getElementById('inserirPaginacao');

    containerPaginacao.innerHTML = `
    <a id="antPagina" href="#Proposta" class="w-4 h-4">
        <img src="../../img/icon/arrow-left.svg" alt="Voltar página" class="w-full">
    </a>
    <a id="proxPagina" href="#Proposta" class="w-4 h-4">
        <img src="../../img/icon/arrow-right.svg" alt="Avançar página" class="w-full">
    </a>`

    // Criando o primeiro botão
    const priBotao = document.createElement('a');

    if (sessionStorage.getItem('paginaProposta') == 1) {
        // pagina selecionado
        priBotao.classList = 'in-page border border-primary bg-body text-color-text text-sm px-3 py-1 rounded-md'
    } else {
        // outros botoes
        priBotao.classList = 'bg-body border border-[transparent] hover:border-primary text-color-text text-sm px-3 py-1 rounded-md'
    }

    priBotao.href = '#Proposta'
    priBotao.textContent = 1
    priBotao.id = `pesquisa${1}`
    priBotao.onclick = () => {
        colocarPagina(1)
        pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'))
        botoesPaginacao(localStorage.getItem('filtroPadrao'));
    }

    const setaProxPagina = containerPaginacao.querySelector("a.w-4.h-4:last-child");
    // impedir que botoes apareçam em determinados casos
    if(sessionStorage.getItem(`qtdBotoesProposta${filtro}`) == sessionStorage.getItem('paginaProposta')){
        setaProxPagina.classList.add('hidden')
    }
    if(sessionStorage.getItem('paginaProposta') == 1){
        document.querySelector('#antPagina').classList.add('hidden')
    }
    containerPaginacao.insertBefore(priBotao, setaProxPagina);
    // Final Primeiro Botão

    // adcionar funçoes no botao de ir e voltar
    setaProxPagina.addEventListener('click', ()=>{
        colocarPagina(parseInt(sessionStorage.getItem('paginaProposta')) + 1)
        pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'))
        botoesPaginacao(localStorage.getItem('filtroPadrao'));
    })
    document.querySelector('#antPagina').addEventListener('click', ()=>{
        colocarPagina(parseInt(sessionStorage.getItem('paginaProposta')) - 1)
        pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'))
        botoesPaginacao(localStorage.getItem('filtroPadrao'));
    })

    const paginaAtual = sessionStorage.getItem('paginaProposta');
    if (paginaAtual > 4 && qtdBotoes > 4) {
        const divisor = document.createElement('span');
        divisor.textContent = '...'
        containerPaginacao.insertBefore(divisor, setaProxPagina);
    }

    // Seta a quantidade de botões, caso não exista, evitando requisições extras ao banco
    // necessário desetar no cadastro de usuário !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (let i = paginaAtual - 2; i <= parseInt(paginaAtual) + 2; i++) {
        if (i > 1 && i < qtdBotoes) {
            const a = document.createElement('a');
    
            if (sessionStorage.getItem('paginaProposta') == i) {
                // pagina selecionado
                a.classList = 'in-page border border-[transparent] hover:border-primary bg-body text-color-text text-sm px-3 py-1 rounded-md'
            } else {
                // outros botoes
                a.classList = 'bg-body border border-[transparent] hover:border-primary text-color-text text-sm px-3 py-1 rounded-md'
            }
    
            a.href = '#Proposta'
            a.textContent = i
            a.id = `pesquisa${i}`
            a.onclick = () => {
                colocarPagina(i)
                pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'))
                botoesPaginacao(localStorage.getItem('filtroPadrao'));
            }
    
            containerPaginacao.insertBefore(a, setaProxPagina);
        }
    }

    if (paginaAtual < 4 && qtdBotoes > 4) {
        const divisor2 = document.createElement('span');
        divisor2.textContent = '...'
        containerPaginacao.insertBefore(divisor2, setaProxPagina);
    }

    if (qtdBotoes > 1) {
        // Criando o ultimo botão
        const ultBotao = document.createElement('a');
    
        if (sessionStorage.getItem('paginaProposta') == qtdBotoes) {
            // pagina selecionado
            ultBotao.classList = 'in-page border border-[transparent] hover:border-primary bg-body text-color-text text-sm px-3 py-1 rounded-md'
        } else {
            // outros botoes
            ultBotao.classList = 'bg-body border border-[transparent] hover:border-primary text-color-text text-sm px-3 py-1 rounded-md'
        }
    
        ultBotao.href = '#Proposta'
        ultBotao.textContent = qtdBotoes
        ultBotao.id = `pesquisa${qtdBotoes}`
        ultBotao.onclick = () => {
            colocarPagina(qtdBotoes)
            pegarTodasAsPropostas(localStorage.getItem('filtroPadrao'))
            botoesPaginacao(localStorage.getItem('filtroPadrao'));
        }
    
        containerPaginacao.insertBefore(ultBotao, setaProxPagina);
        // Final Ultimo Botão
    }
}

// Seta o número da página no sessionStorage
function colocarPagina(num) {
    sessionStorage.setItem('paginaProposta', num);
}

async function mudarAba(filtro) {
    colocarPagina(1);
    localStorage.setItem('filtroPadrao', filtro);
    await pegarTodasAsPropostas(filtro);
    botoesPaginacao(filtro);
}

export default botoesPaginacao
export { mudarAba }