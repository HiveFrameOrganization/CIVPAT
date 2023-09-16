import exibir, { exibirErro } from "./renderizarTelaFuncionarios.js";

// Função específica para realizar a pesquisa do funcionário
async function pesquisarFuncionario(valor, filtro) {
    const numPagina = sessionStorage.getItem('paginaFun');

    sessionStorage.setItem('paginaFun', 0);

    try {

        // Requisição ao servidor
        const requisicao = await fetch(back + `/funcionarios/pesquisarFuncionario.php?valor=${valor}&pag=${numPagina}&filtros=${filtro}`);

        // Convertendo a resposta em json
        const resposta = await requisicao.json();



        // Receber erros personalizados do back-end
        if (resposta.status === 'erro') throw new Error(resposta.mensagem);

        
        exibir(resposta.usuarios);

    } catch (erro) {
        console.error(erro);
        exibirErro(erro);
    }

}

async function usuariosFiltrados(valor) {
    try {

        const numPagina = sessionStorage.getItem('paginaFun');
        // Requisição ao servidor
        const requisicao = await fetch(back + `/funcionarios/pesquisaFiltro.php?valor=${valor}&pag=${numPagina}`);

        // Convertendo a resposta em json
        const resposta = await requisicao.json();

        if (resposta.status === 'erro') throw new Error(resposta.mensagem);

        exibir(resposta.usuarios);

    } catch (erro) {
        console.error(erro);
        exibirErro(erro);
    }
}

export default pesquisarFuncionario
export { usuariosFiltrados }