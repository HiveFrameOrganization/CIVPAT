import { back } from '../Rotas/rotas.js'

/*

    ------------------------------------------------------------------------------------------
                            CÓDIGO PARA TROCAR A VISUALIZAÇÃO DE CONTEÚDO
    ------------------------------------------------------------------------------------------

*/

// Selecionando a tag span para atribuir o nif do usuário a ele
const spanProdutos = document.querySelector('#spanProdutos');


spanProdutos.addEventListener('click', () => {

    // Trocando o display para exibir coisas diferentes
    const informacoesPerfil = document.querySelector('#informacoesPerfil');
    const informacoesProduto = document.querySelector('#informacoesProduto');
    informacoesPerfil.style.display = 'none';
    informacoesProduto.style.display = 'block';

    // Fazendo a requisição para a buscar os produtos
    buscarProdutos();
    
});

// selecionando o span de informações para exibí-lo de volta
const spanInformacoes = document.querySelector('#spanInformacoes');

spanInformacoes.addEventListener('click', () => {

    // Trocando o display para exibir coisas diferentes
    const informacoesPerfil = document.querySelector('#informacoesPerfil');
    const informacoesProduto = document.querySelector('#informacoesProduto');
    informacoesPerfil.style.display = 'flex';
    informacoesProduto.style.display = 'none';

});



/*

    ------------------------------------------------------------------------------------------
                                CÓDIGO PARA BUSCAR E EXIBIR PRODUTOS
    ------------------------------------------------------------------------------------------

*/

// Função para bsucar todos os produtos relacionados ao técnico
async function buscarProdutos() {

    try {

        // Pegando o nif do usuário e passando como parâmetro para realizar a query la no back
        const nif = spanProdutos.getAttribute('data-value');

        const requisicao = await fetch(back + `/perfil/produtos.php?nif=${nif}`);

        const resposta = await requisicao.json();

        console.log(resposta);

    } catch (erro) {
        console.error(erro);
    }

}
 