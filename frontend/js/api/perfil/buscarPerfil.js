import { back } from '../Rotas/rotas.js'

// Selecionando a tag span para atribuir o nif do usuário a ele
const spanProdutos = document.querySelector('#spanProdutos');

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
        spanProdutos.style.display = 'flex';

        /*
            Salvando o NIF do usuário no span para ser feito a busca dos produtos em que 
            ele esta vinculado...
        */
        spanProdutos.setAttribute('data-value', dados.nif);

    }

    // Exibindo os dados na tela
    const nomeTitulo = document.querySelector('#nomeTitulo');
    const cargoTitulo = document.querySelector('#cargoTitulo');
    const emailTitulo = document.querySelector('#emailTitulo');

    // Selecionando a exibição "menor"
    const nomePequeno = document.querySelector('#nomePequeno');
    const emailPequeno = document.querySelector('#emailPequeno');

    nomeTitulo.innerText = dados.nome + ' ' + dados.sobrenome;
    emailTitulo.innerText = dados.email;
    nomePequeno.innerText = dados.nome + ' ' + dados.sobrenome;
    emailPequeno.innerText = dados.email;

    // Verificando qual é o tipo de cargo para exibir corretamente
    if (dados.cargo === 'coor') {

        cargoTitulo.innerText = 'Coordenador';

    } else if (dados.cargo === 'adm') {

        cargoTitulo.innerText = 'Administrador';

    } else if (dados.cargo === 'ger') {

        cargoTitulo.innerText = 'Gerente';

    } else {

        cargoTitulo.innerText = 'Técnico';

    }

}