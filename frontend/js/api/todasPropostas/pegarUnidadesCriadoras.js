import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';

async function pegarUnidadesCriadoras() {
    const unidadesSelect = document.getElementById('unidadeCriadora');

    try {

        const requisicao = await fetch (back + '/todasPropostas/pegarUnidadesCriadoras.php');
        // dados de todas as propostar recebidas (resposta da api)
        const dados = await requisicao.json();
        
        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);

        for (let i = 0; i < dados.length; i++) {
            let option = document.createElement('option');
            option.classList.add('bg-body');
            option.value = dados[i].idUnidadeCriadora;
            option.textContent = dados[i].UnidadeCriadora;
            unidadesSelect.appendChild(option);
        }
    } catch(err) {

        localStorage.setItem("status", "error");
        localStorage.setItem("mensagem", "Um erro aconteceu, tente recarregar a página!");

        alertas();
    }

}

export default pegarUnidadesCriadoras