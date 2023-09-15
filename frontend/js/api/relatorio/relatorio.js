// Importando o arquivo de rotas
import { back } from "../Rotas/rotas.js";

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                PESQUISAR POR DATA E GERAR RELATÓRIO
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

window.addEventListener('load', async () => {

    const data = new Date();

    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    await buscarRelatorio(mes.toString(), ano.toString());

});

// Pegando o evento de click para mandar a data para o back-end
const botaoPesquisar = document.querySelector('#pesquisarData');
botaoPesquisar.addEventListener('click', async () => {

    const data = document.querySelector('#dataMesAno').value;

    const dataArray = dividirData(data);

    // Pegando o ano
    const ano = dataArray[0];

    // Pegando o mês
    const mes = dataArray[1];

    // Conferindo a data mínima
    if (dataMinima(mes, ano)) {

        console.log(`Data Incorreta`);

        return;
    }

    console.log(`Data correta`);
    await buscarRelatorio(mes, ano);


});

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                FUNÇÃO PARA BUSCAR O RELATÓRIO NO BAK-END
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/*
    O terceiro valor da função esta colocando por padrão um valor vazio caso esteja recebendo um valor 
    indefinido. Importante para a lógica do back-end
*/
async function buscarRelatorio(mes, ano, valor = '') {

    try {

        console.log(valor)
        console.log(mes)
        console.log(ano)

        const requisicao = await fetch(`${back}/relatorio/puxarRelatorio.php?mes=${mes}&ano=${ano}&valor=${valor}`);

        const resposta = await requisicao.json();

        console.log(resposta);

    } catch (error) {
        console.error(error);
    }

}

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                FUNÇÕES PARA VALIDAR ANTES DE MANDAR PARA O BACK
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

function dividirData(data) {
    return data.split('-');
}


function dataMinima(mes, ano) {

    const data = new Date();

    // O método getMonth retorna um número de 0 a 11, então para fazer a comparação precisa adicionar + 1
    const mesMin = data.getMonth() + 1;
    const anoMin = data.getFullYear();

    if (Number(ano) > anoMin || Number(mes) > mesMin) {

        console.log(mesMin);
        return true;
    }

    return false;
}

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                PESQUISAR PELO FUNCIONÁRIO: NIF, NOME E SOBRENOME
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

const botaoPesquisarFuncionario = document.querySelector('#botaoPesquisarFuncionario');
botaoPesquisarFuncionario.addEventListener('click', async () => {
    
    // Pegando o valor digitado
    const valor = document.querySelector('#pesquisaFuncionario').value;

    const data = document.querySelector('#dataMesAno').value;

    const dataArray = dividirData(data);

    // Pegando o ano
    const ano = dataArray[0];

    // Pegando o mês
    const mes = dataArray[1];

    // Conferindo a data mínima
    if (dataMinima(mes, ano)) {

        console.log(`Data Incorreta`);

        return;
    }

    console.log(`Data correta`);
    await buscarRelatorio(mes, ano, valor);

});