import exibir from "./renderizarTelaFuncionarios.js";
import { back } from "../Rotas/rotas.js";

// Função específica para realizar a pesquisa do funcionário
async function pesquisarFuncionario(valor, filtro) {
    const numPagina = sessionStorage.getItem('paginaFun');

    sessionStorage.setItem('paginaFun', 0);

    try {

        // Requisição ao servidor
        const requisicao = await fetch(back + `/funcionarios/pesquisarFuncionario.php?valor=${valor}
        &pag=${numPagina}&filtros=${filtro}`);

        // Convertendo a resposta em json
        const resposta = await requisicao.json();

        // Receber erros personalizados do back-end
        if (resposta.status === 'erro') throw new Error(resposta.mensagem);
        
        exibir(resposta.usuarios);
    } catch (erro) {
        console.error(erro);
    }

}

export default pesquisarFuncionario
