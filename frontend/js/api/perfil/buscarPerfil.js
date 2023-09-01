import { back } from '../Rotas/rotas.js'

const spanProdutos = document.querySelector('#spanProdutos');

const spanInformacoes = document.querySelector('#spanInformacoes');

// Requisição disparada quando a página carregar
window.addEventListener('load', () => {

    // Função para buscar os dados de quem está logado...
    buscarUsuarioLogado();

});


// Função assícrona responsável por fazer a requisição para o back-end e buscar os dados
async function buscarUsuarioLogado() {

    // Tratamento para possíevl erro...
    try {

        console.log(back + '/perfil/perfil.php');

        // Requisição
        const requisicao = await fetch(back + '/perfil/perfil.php');

        // Resposta que veio do servidor
        const resposta = await requisicao.json();

        console.log(resposta);

        // Exibir os dados retornados na tela...
        exibir(resposta.dados)

    } catch (erro) {
        // Exibe algum possível erro...
        console.error(erro);
    }

}

// Função para exibir os dados do usuário na tela
function exibir(dados) {

    // Caso o usuário seja técnico, será habilitado a visualização dos produtos...
    if (dados.cargo === 'tec') {
        
        // Tornando o span visível:
        spanProdutos.classList.remove('hidden');

        /*
            Salvando o NIF do usuário no span para ser feito a busca dos produtos em que 
            ele esta vinculado...
        */
            spanProdutos.setAttribute('data-value', dados.nif);

    }

    // Exibindo os dados na tela
    const nomes = document.querySelectorAll('#nome');
    const cargo = document.querySelector('#cargo');
    const emails = document.querySelectorAll('#email');

    nomes.forEach((nome) => {

        nome.textContent = `${dados.nome} ${dados.sobrenome}`
    });

    emails.forEach((email) => {

        email.textContent = dados.email;
    });

    const cargos = {
        'coor': 'Coordenador',
        'adm': 'Administrador',
        'ger': 'Gerente',
        'tec': 'Técnico',
    };

    // Verificando qual é o tipo de cargo para exibir corretamente
    cargo.textContent = cargos[dados.cargo] ? cargos[dados.cargo] : 'N/A';
}
