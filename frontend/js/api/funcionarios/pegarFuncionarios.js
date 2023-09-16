import { back } from '../Rotas/rotas.js'
import exibir from './renderizarTelaFuncionarios.js';

// Funão para retornar uma lisat de funcionários
async function retornaFuncionarios(filtro) {
    // Caso a quantidade paginas não tenha sido definida, ela é definida para 1
    if (sessionStorage.getItem('paginaFun') == null) {
        sessionStorage.setItem('paginaFun', 1)
    }
    const paginaFun = sessionStorage.getItem('paginaFun');

    // Variável criar para otimização, evitar requisições desnecessárias
    // recalculando a quantidade de botões
    let declaradoqtdBotoesFun
    if (sessionStorage.getItem('qtdBotoesFun') == null) {
        declaradoqtdBotoesFun = -1;
    } else {
        declaradoqtdBotoesFun = sessionStorage.getItem('qtdBotoesFun');
    }
    // Lembrando que essa variável é destruida no cadastro do usuário
    // pois altera a quantidade de funcionarios e possivelmente
    // a quantidade de botões

    try {
        // Fazendo a requisição para buscar os dados
        const resposta = await fetch(back + `/funcionarios/exibirFuncionarios.php?pag=${paginaFun}
        &qtdBotes=${declaradoqtdBotoesFun}&filtros=${filtro}`);

        const dados = await resposta.json();

        // Caso retorne algum erro previsto no back-end
        if (dados.status === 'erro') throw new Error(dados.mensagem);


        // Função específica para exibir o funcionário
        exibir(dados.usuarios);
        // Seta a quantidade de botões
        // necessário desetar no cadastro de usuário
        sessionStorage.setItem('qtdBotoesFun', dados.qtdBotoes);

    } catch (erro) {
        console.error(erro)
    }
}


export default retornaFuncionarios