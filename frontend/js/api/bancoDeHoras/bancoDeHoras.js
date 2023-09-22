import { back } from "../Rotas/rotas.js";

const formularioBancoHoras = document.querySelector('#formularioBancoHoras');
formularioBancoHoras.addEventListener('submit', async evento => {

    evento.preventDefault();

    const nif = localStorage.getItem('nifPerfil');
    const cargo = localStorage.getItem('cargo');

    const data = document.querySelector('#dataMesAno').value;

    const dataArray = dividirData(data);

    // Pegando o ano
    const ano = dataArray[0];

    // Pegando o mês
    const mes = dataArray[1];

    // Conferindo a data mínima
    if (dataMaxima(mes, ano)) {

        console.log(`Data Incorreta`);

        return;
    }

    console.log(`Data correta`);
    await buscarHoras(mes, ano, nif, cargo);

    

});


async function buscarHoras(mes, ano, nif, cargo) {

    try {

        console.log(nif)
        
        if (!nif) throw new Error(`É nescessário o NIF do funcionário para pesquisar`);

        const requisicao = await fetch(`${back}/relatorio/puxarRelatorio.php?mes=${mes}&ano=${ano}&valor=${nif}&cargo=${cargo}`);

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


function dataMaxima(mes, ano) {

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