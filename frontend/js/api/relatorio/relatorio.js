// Importando o arquivo de rotas
import { back } from "../Rotas/rotas.js";

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                PESQUISAR POR DATA E GERAR RELATÓRIO
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/*
    O terceiro valor da função esta colocando por padrão um valor vazio caso esteja recebendo um valor 
    indefinido. Importante para a lógica do back-end
*/

// teste
window.addEventListener('load', ()=>{
    buscarRelatorio(9, 2023, 1234560)
})
// fim teste

async function buscarRelatorio(mes, ano, valor = false) {

    try {
        
        if (!valor) throw new Error(`Digite o NIF do funcionário para pesquisar`);

        const requisicao = await fetch(`${back}/relatorio/puxarRelatorio.php?mes=${mes}&ano=${ano}&valor=${valor}`);

        const resposta = await requisicao.json();

        console.log(resposta);
        exibirRelatorio(resposta)

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

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                PESQUISAR PELO FUNCIONÁRIO: NIF, NOME E SOBRENOME
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

const formularioRelatorio = document.querySelector('#formularioRelatorio');
formularioRelatorio.addEventListener('submit', async evento => {

    evento.preventDefault();
    
    
    // Pegando o valor digitado
    const valor = document.querySelector('#pesquisaFuncionario').value;

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
    await buscarRelatorio(mes, ano, valor);

});

// FUNÇÃO DE EXIBIR RELATORIO NA TELA
async function exibirRelatorio(res){
    let exibir = document.querySelector('#exibir')

    console.log(res.dados[0].NomeProduto)

    for (let i = 0; i < res.dados.length; i++) {
        // console.log(i);
        
        exibir.innerHTML += `
            <div>
                <p class='text-color-text'>${res.dados[i].Nome} ${res.dados[i].Sobrenome}</p>
                <p class='text-color-text'>${res.dados[i].NIF}</p>
                <p class='text-color-text'>${res.dados[i].TituloProposta}</p>
                <p class='text-color-text'>${res.dados[i].NomeProduto}</p>
                <p class='text-color-text'>${res.dados[i].Datas}</p>
                <p class='text-color-text'>${res.dados[i].HorasPessoa}</p>

                ${
                    res.dados[i].Maquina != 'Nenhum' ? 
                        `<p class='text-color-text'>${res.dados[i].Maquina}</p>
                        <p class='text-color-text'>${res.dados[i].HorasMaquina}</p>`:
                        `<p class='text-color-text'>Nenhuma maquina sendo usada</p>`   
                }
            </div>
            <hr>
        `
    }
}