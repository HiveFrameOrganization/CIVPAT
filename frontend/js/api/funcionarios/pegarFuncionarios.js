import { back } from '../Rotas/rotas.js'
import exibir from './renderizarTelaFuncionarios.js';

// Funão para retornar uma lisat de funcionários
async function retornaFuncionarios(filtro, pesquisado) {
    const pesquisa = document.querySelector('#pesquisarUsuario').value;
    // Caso a quantidade paginas não tenha sido definida, ela é definida para 1
    if (sessionStorage.getItem('paginaFun') == null) {
        sessionStorage.setItem('paginaFun', 1)
    }
    const paginaFun = sessionStorage.getItem('paginaFun');

    // Variável criar para otimização, evitar requisições desnecessárias
    // recalculando a quantidade de botões
    let declaradoqtdBotoesFun
    if (sessionStorage.getItem(`qtdBotoesFun${filtro}`) == null) {
        declaradoqtdBotoesFun = -1;
    } else {
        declaradoqtdBotoesFun = sessionStorage.getItem(`qtdBotoesFun${filtro}`);
    }
    // Lembrando que essa variável é destruida no cadastro do usuário
    // pois altera a quantidade de funcionarios e possivelmente
    // a quantidade de botões

    try {
        // Fazendo a requisição para buscar os dados
        const resposta = await fetch(back + `/funcionarios/exibirFuncionarios.php?pag=${paginaFun}
        &qtdBotes=${declaradoqtdBotoesFun}&filtros=${filtro}&pesq=${pesquisa}&pesquisado=${pesquisado}`);

        const dados = await resposta.json();

        // Caso retorne algum erro previsto no back-end
        if (dados.status === 'erro') throw new Error(dados.mensagem);

        console.log(pesquisado)
        console.log(dados)
        // Função específica para exibir o funcionário
        exibir(dados.usuarios);
        // Seta a quantidade de botões
        // necessário desetar no cadastro de usuário
        sessionStorage.setItem(`qtdBotoesFun${filtro}`, dados.qtdBotoes);

    } catch (erro) {
        console.error(erro)
    }
}


export default retornaFuncionarios