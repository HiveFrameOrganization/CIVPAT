import { back } from '../Rotas/rotas.js';
import exibirPropostas from './renderizarProposta.js';

export default async function pegarTodasAsPropostas (filtros) {
    if (sessionStorage.getItem('paginaProposta') == null) {
        sessionStorage.setItem('paginaProposta', 1)
    }
    const paginaProposta = sessionStorage.getItem('paginaProposta');


    let declaradoQtdBotoes
    if (sessionStorage.getItem(`qtdBotoesProposta${filtros}`) == null) {
        declaradoQtdBotoes = -1;
    } else {
        declaradoQtdBotoes = sessionStorage.getItem(`qtdBotoesProposta${filtros}`);;
    }

    try{
        // link da requisição
        const resposta = await fetch(back + `/todasPropostas/todasPropostas.php?pag=${paginaProposta}
        &qtdBotes=${declaradoQtdBotoes}&filtros=${filtros}`);
        
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await resposta.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.status === 'success') {

            exibirPropostas(dados.propostas);
            sessionStorage.setItem(`qtdBotoesProposta${filtros}`, dados.qtdBotoes);
            console.log(dados)
            // Adicionando a quaqntidade de propostas de acordo com os seus status
            document.getElementById('analise').textContent = dados['Em Análise'] ? `# ${dados['Em Análise']}` : '# N/A';
            document.getElementById('aceitos').textContent = dados['Aceito'] ? `# ${dados['Aceito']}` : '# N/A';
            document.getElementById('declinados').textContent = dados['Declinado'] ? `# ${dados['Declinado']}` : '# N/A';
            document.getElementById('concluidos').textContent = dados['Declinado'] ? `# ${dados['Concluido']}` : '# N/A';
        }

    } catch (error){
        console.error(error)
    }
}
