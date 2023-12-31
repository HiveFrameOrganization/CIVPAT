import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';
import { autenticacao } from '../login/autenticacao.js';

async function pegarUnidadesCriadoras() {
    const autenticado = await autenticacao(['adm', 'coor', 'ger'], false)
    if(!autenticado){
        return;
    }

    const unidadesSelect = document.getElementById('unidadeCriadora');

    let error = false;

    try {

        const requisicao = await fetch (back + '/todasPropostas/pegarUnidadesCriadoras.php');
        
        if (!requisicao.ok) {

            error = true;
        }

        // dados de todas as propostar recebidas (resposta da api)
        const dados = await requisicao.json();
        
        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') {

            error = true;
        }

        if (error) {

            localStorage.setItem("status", "error");
            localStorage.setItem("mensagem", "Erro ao buscar as unidades criadoras, tente recarregar a página!");

            alertas();

            return;
        }

        for (let i = 0; i < dados.length; i++) {
            let option = document.createElement('option');
            option.classList.add('bg-body');
            option.value = dados[i].idUnidadeCriadora;
            option.textContent = dados[i].UnidadeCriadora;
            unidadesSelect.appendChild(option);
        }
    } catch(err) {

        localStorage.setItem("status", "error");
        localStorage.setItem("mensagem", "Erro ao buscar as unidades criadoras, tente recarregar a página!");

        alertas();
    }

}

export default pegarUnidadesCriadoras