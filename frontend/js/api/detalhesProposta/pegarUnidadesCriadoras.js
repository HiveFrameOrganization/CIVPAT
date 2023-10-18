import { back } from "../Rotas/rotas.js";

export default async function pegarUnidadesCriadoras() {

    const unidadesSelect = document.getElementById('uniCriadora');

    const requisicao = await fetch(back + '/todasPropostas/pegarUnidadesCriadoras.php');

    // dados de todas as propostar recebidas (resposta da api)
    const dados = await requisicao.json();



    // caso a requisição de um erro, irá exibir uma mensagem de erro
    if (dados.resposta === 'erro') throw new Error(dados.message);

    for (let i = 0; i < dados.length; i++) {
        let option = document.createElement('option');
        option.value = dados[i].idUnidadeCriadora;
        option.textContent = dados[i].UnidadeCriadora;
        option.classList.add('bg-[#fff]');
        unidadesSelect.appendChild(option);
    }

    selecionarUnidadeCriadora(localStorage.getItem('idProposta'));
}

async function selecionarUnidadeCriadora(id) {
    // Requisição com parâmetro para buscar a proposta pelo id
    const requisicao = await fetch(back + `/detalhesProposta/detalhesProposta.php?id=${id}`)


    const resposta = await requisicao.json();

    const uniCriadoraDropdown = document.getElementById('uniCriadora');

    // Percorra as opções do <select> para encontrar a que corresponde ao valor desejado
    for (var i = 0; i < uniCriadoraDropdown.options.length; i++) {
        if (uniCriadoraDropdown.options[i].value == resposta['uniCriadora']) {
            uniCriadoraDropdown.options[i].selected = true;
            break; // Saia do loop após encontrar a opção desejada
        }
    }
}
