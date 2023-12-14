import { back } from '../Rotas/rotas.js'
import exibir from './renderizarTelaFuncionarios.js';
import { autenticacao } from '../login/autenticacao.js';

// Funão para retornar uma lisat de funcionários
async function retornaFuncionarios(filtro, pesquisado) {
    const autenticado = await autenticacao(['coor'], false)
    if(!autenticado){
        return;
    }

    document.getElementById('exibicao').innerHTML = `
    <div class='flex flex-col justify-center items-center gap-4'>
        <div class="loading-spinner inline-block w-[50px] h-[50px] border-4 border-[#e6e6e64d] rounded-full border-t-[#3976d1] animate-spin"></div>
        <h2 class='font-bold text-color-text text-center'>CARREGANDO...</h2>
    </div>
    `;

    const pesquisa = document.querySelector('#hidden-input').value;
    // Caso a quantidade paginas não tenha sido definida, ela é definida para 1
    if (sessionStorage.getItem('paginaFun') == null) {
        sessionStorage.setItem('paginaFun', 1)
    }
    const paginaFun = sessionStorage.getItem('paginaFun');

    // Variável criar para otimização, evitar requisições desnecessárias
    // recalculando a quantidade de botões
    const declaradoqtdBotoesFun = sessionStorage.getItem(`qtdBotoesFun${filtro}`);

    // Lembrando que essa variável é destruida no cadastro do usuário
    // pois altera a quantidade de funcionarios e possivelmente
    // a quantidade de botões
    
    try {
        // Fazendo a requisição para buscar os dados
        const resposta = await fetch(back + `/funcionarios/exibirFuncionarios.php?pag=${paginaFun}
        &qtdBotes=${declaradoqtdBotoesFun}&filtros=${filtro}&pesq=${pesquisa}&pesquisado=${pesquisado}`);

        if (!resposta.ok) {

            return false;
        }

        const dados = await resposta.json();
            // Caso retorne algum erro previsto no back-end

        if (dados.status === 'success') {

            if (dados.usuarios.length > 0) {

                // Função específica para exibir o funcionário
                exibir(dados.usuarios);

                // Seta a quantidade de botões
                // necessário desetar no cadastro de usuário
                sessionStorage.setItem(`qtdBotoesFun${filtro}`, dados.qtdBotoes);
            } else {

                document.getElementById('exibicao').innerHTML = `
                <div class='flex flex-col justify-center items-center gap-4'>
                    <svg width="67" height="68" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.5004 67.4168C32.6115 67.4168 31.7643 67.2502 30.9587 66.9168C30.1532 66.5835 29.4171 66.1113 28.7504 65.5002L2.00041 38.7502C1.3893 38.0835 0.917074 37.3474 0.58374 36.5418C0.250407 35.7363 0.0837402 34.8891 0.0837402 34.0002C0.0837402 33.1113 0.250407 32.2502 0.58374 31.4168C0.917074 30.5835 1.3893 29.8613 2.00041 29.2502L28.7504 2.50016C29.4171 1.8335 30.1532 1.34739 30.9587 1.04183C31.7643 0.736274 32.6115 0.583496 33.5004 0.583496C34.3893 0.583496 35.2504 0.736274 36.0837 1.04183C36.9171 1.34739 37.6393 1.8335 38.2504 2.50016L65.0004 29.2502C65.6671 29.8613 66.1532 30.5835 66.4587 31.4168C66.7643 32.2502 66.9171 33.1113 66.9171 34.0002C66.9171 34.8891 66.7643 35.7363 66.4587 36.5418C66.1532 37.3474 65.6671 38.0835 65.0004 38.7502L38.2504 65.5002C37.6393 66.1113 36.9171 66.5835 36.0837 66.9168C35.2504 67.2502 34.3893 67.4168 33.5004 67.4168ZM33.5004 60.7502L60.2504 34.0002L33.5004 7.25016L6.75041 34.0002L33.5004 60.7502ZM30.1671 37.3335H36.8337V17.3335H30.1671V37.3335ZM33.5004 47.3335C34.4449 47.3335 35.2365 47.0141 35.8754 46.3752C36.5143 45.7363 36.8337 44.9446 36.8337 44.0002C36.8337 43.0557 36.5143 42.2641 35.8754 41.6252C35.2365 40.9863 34.4449 40.6668 33.5004 40.6668C32.556 40.6668 31.7643 40.9863 31.1254 41.6252C30.4865 42.2641 30.1671 43.0557 30.1671 44.0002C30.1671 44.9446 30.4865 45.7363 31.1254 46.3752C31.7643 47.0141 32.556 47.3335 33.5004 47.3335Z" fill="#f54a4c"/>
                    </svg>
                    <h2 class='font-bold text-color-text text-center'>NENHUM FUNCIONÁRIO ENCONTRADO</h2>
                </div>
                `;
            }

        } else {

            return false;
        }

    } catch (erro) {
        console.error(erro);

        return false;
    }
}


export default retornaFuncionarios