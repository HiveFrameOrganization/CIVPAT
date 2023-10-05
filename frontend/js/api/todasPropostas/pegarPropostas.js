// Puxa os dados das propostas (utiliza a API)

import { back } from '../Rotas/rotas.js';
import exibirPropostas from './renderizarProposta.js';

export default async function pegarTodasAsPropostas (filt, pesquisado) {

    document.getElementById('table').innerHTML = `
    <div class='flex flex-col justify-center items-center gap-4'>
        <div class="loading-spinner inline-block w-[50px] h-[50px] border-4 border-[#e6e6e64d] rounded-full border-t-[#3976d1] animate-spin"></div>
        <h2 class='font-bold text-color-text'>CARREGANDO...</h2>
    </div>
    `;

    const filtro = '%' + document.getElementById('hidden-input').value + '%';

    if (sessionStorage.getItem('paginaProposta') == null) {
        sessionStorage.setItem('paginaProposta', 1)
    }
    const paginaProposta = sessionStorage.getItem('paginaProposta');


    let declaradoQtdBotoes
    if (sessionStorage.getItem(`qtdBotoesProposta${filtro}`) == null) {
        declaradoQtdBotoes = -1;
    } else {
        declaradoQtdBotoes = sessionStorage.getItem(`qtdBotoesProposta${filtro}`);
    }
    console.log(declaradoQtdBotoes)
    try{
        // link da requisição
        const resposta = await fetch(back + `/todasPropostas/todasPropostasFiltradas.php?pag=${paginaProposta}
        &qtdBotes=${declaradoQtdBotoes}&filtro=${filtro}&filtroPagina=${filt}&pesquisado=${pesquisado}`);
        
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await resposta.json();

        console.log(dados)
        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.status === 'success') {
            
            if (dados.propostas.length > 0) {

                exibirPropostas(dados.propostas);
                sessionStorage.setItem(`qtdBotoesProposta${filt}`, dados.qtdBotoes);
                
                // Adicionando a quaqntidade de propostas de acordo com os seus status
                document.getElementById('analise').textContent = dados['Em Análise'] ? `# ${dados['Em Análise']}` : '# N/A';
                document.getElementById('aceitos').textContent = dados['Aceito'] ? `# ${dados['Aceito']}` : '# N/A';
                document.getElementById('declinados').textContent = dados['Declinado'] ? `# ${dados['Declinado']}` : '# N/A';
                document.getElementById('concluidos').textContent = dados['Declinado'] ? `# ${dados['Concluido']}` : '# N/A';
            } else {

                document.getElementById('table').innerHTML = `
                <div class='flex flex-col justify-center items-center gap-4'>
                    <svg width="67" height="68" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.5004 67.4168C32.6115 67.4168 31.7643 67.2502 30.9587 66.9168C30.1532 66.5835 29.4171 66.1113 28.7504 65.5002L2.00041 38.7502C1.3893 38.0835 0.917074 37.3474 0.58374 36.5418C0.250407 35.7363 0.0837402 34.8891 0.0837402 34.0002C0.0837402 33.1113 0.250407 32.2502 0.58374 31.4168C0.917074 30.5835 1.3893 29.8613 2.00041 29.2502L28.7504 2.50016C29.4171 1.8335 30.1532 1.34739 30.9587 1.04183C31.7643 0.736274 32.6115 0.583496 33.5004 0.583496C34.3893 0.583496 35.2504 0.736274 36.0837 1.04183C36.9171 1.34739 37.6393 1.8335 38.2504 2.50016L65.0004 29.2502C65.6671 29.8613 66.1532 30.5835 66.4587 31.4168C66.7643 32.2502 66.9171 33.1113 66.9171 34.0002C66.9171 34.8891 66.7643 35.7363 66.4587 36.5418C66.1532 37.3474 65.6671 38.0835 65.0004 38.7502L38.2504 65.5002C37.6393 66.1113 36.9171 66.5835 36.0837 66.9168C35.2504 67.2502 34.3893 67.4168 33.5004 67.4168ZM33.5004 60.7502L60.2504 34.0002L33.5004 7.25016L6.75041 34.0002L33.5004 60.7502ZM30.1671 37.3335H36.8337V17.3335H30.1671V37.3335ZM33.5004 47.3335C34.4449 47.3335 35.2365 47.0141 35.8754 46.3752C36.5143 45.7363 36.8337 44.9446 36.8337 44.0002C36.8337 43.0557 36.5143 42.2641 35.8754 41.6252C35.2365 40.9863 34.4449 40.6668 33.5004 40.6668C32.556 40.6668 31.7643 40.9863 31.1254 41.6252C30.4865 42.2641 30.1671 43.0557 30.1671 44.0002C30.1671 44.9446 30.4865 45.7363 31.1254 46.3752C31.7643 47.0141 32.556 47.3335 33.5004 47.3335Z" fill="#fff"/>
                    </svg>
                    <h2 class='font-bold text-color-text'>NENHUMA PROPOSTA ENCONTRADA</h2>
                </div>
                `;
            }
        } else {

            return false;
        }

    } catch (error){
        console.error(error);

        return false;
    }
}
