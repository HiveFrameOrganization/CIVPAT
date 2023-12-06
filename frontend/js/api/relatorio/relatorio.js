// Importando o arquivo de rotas
import { back } from "../Rotas/rotas.js";
import { autenticacao } from '../login/autenticacao.js';

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                PESQUISAR POR DATA E GERAR RELATÓRIO
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/*
    O terceiro valor da função esta colocando por padrão um valor vazio caso esteja recebendo um valor 
    indefinido. Importante para a lógica do back-end
*/

window.addEventListener('load', () => {
    // buscarRelatorio(10, 2023, 1234560)
    exibirRelatorio(null)
})

let exibir = document.querySelector('#exibir');

exibir.addEventListener('click', event => {
    const el = event.target;
    const closest = el.closest('.cursor-pointer');
    if (closest){
        const produtos = closest.querySelectorAll('#produto');
        for (let produto of produtos){
            if (produto.classList.contains('hidden')) {
                produto.classList.remove('hidden');
                closest.querySelector('#setaDropdown').classList.add('rotate-180');
            } else {
                produto.classList.add('hidden');
                closest.querySelector('#setaDropdown').classList.remove('rotate-180');
            }
        }
    }
});

async function buscarRelatorio(mes, ano, valor = false) {
    const autenticado = await autenticacao(['adm', 'tec' ], false)
    if(!autenticado){
        return;
    }

    try {

        if (!valor) {

            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Digite o NIF do funcionário para pesquisar');

            return;
        }

        exibir.innerHTML = `
        <div class='flex flex-col justify-center items-center gap-4'>
            <div class="loading-spinner inline-block w-[50px] h-[50px] border-4 border-[#e6e6e64d] rounded-full border-t-[#3976d1] animate-spin"></div>
            <h2 class='font-bold text-color-text text-center'>CARREGANDO...</h2>
        </div>
        `;

        const requisicao = await fetch(`${back}/relatorio/puxarRelatorio.php?mes=${mes}&ano=${ano}&valor=${valor}`);

        if (!requisicao.ok) {

            exibir.innerHTML = `
            <div class='flex flex-col justify-center items-center gap-4'>
                <svg width="67" height="68" viewBox="0 0 67 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.5004 67.4168C32.6115 67.4168 31.7643 67.2502 30.9587 66.9168C30.1532 66.5835 29.4171 66.1113 28.7504 65.5002L2.00041 38.7502C1.3893 38.0835 0.917074 37.3474 0.58374 36.5418C0.250407 35.7363 0.0837402 34.8891 0.0837402 34.0002C0.0837402 33.1113 0.250407 32.2502 0.58374 31.4168C0.917074 30.5835 1.3893 29.8613 2.00041 29.2502L28.7504 2.50016C29.4171 1.8335 30.1532 1.34739 30.9587 1.04183C31.7643 0.736274 32.6115 0.583496 33.5004 0.583496C34.3893 0.583496 35.2504 0.736274 36.0837 1.04183C36.9171 1.34739 37.6393 1.8335 38.2504 2.50016L65.0004 29.2502C65.6671 29.8613 66.1532 30.5835 66.4587 31.4168C66.7643 32.2502 66.9171 33.1113 66.9171 34.0002C66.9171 34.8891 66.7643 35.7363 66.4587 36.5418C66.1532 37.3474 65.6671 38.0835 65.0004 38.7502L38.2504 65.5002C37.6393 66.1113 36.9171 66.5835 36.0837 66.9168C35.2504 67.2502 34.3893 67.4168 33.5004 67.4168ZM33.5004 60.7502L60.2504 34.0002L33.5004 7.25016L6.75041 34.0002L33.5004 60.7502ZM30.1671 37.3335H36.8337V17.3335H30.1671V37.3335ZM33.5004 47.3335C34.4449 47.3335 35.2365 47.0141 35.8754 46.3752C36.5143 45.7363 36.8337 44.9446 36.8337 44.0002C36.8337 43.0557 36.5143 42.2641 35.8754 41.6252C35.2365 40.9863 34.4449 40.6668 33.5004 40.6668C32.556 40.6668 31.7643 40.9863 31.1254 41.6252C30.4865 42.2641 30.1671 43.0557 30.1671 44.0002C30.1671 44.9446 30.4865 45.7363 31.1254 46.3752C31.7643 47.0141 32.556 47.3335 33.5004 47.3335Z" fill="#f54a4c"/>
                </svg>
                <h2 class='font-bold text-color-text'>OPA, UM ERRO ACONTECEU AO GERAR OS RELATÓRIOS</h2>
            </div>
            `;

            return;
        }

        const resposta = await requisicao.json();

        exibirRelatorio(resposta)

    } catch (error) {


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

        // console.log(`Data Incorreta`);

        exibir.innerHTML = `
        <div class='flex flex-col justify-center items-center gap-4'>
            <img src="../../img/icon/emergency.svg" alt="emergencia">
            <h2 class='font-bold text-center'>DATA INVÁLIDA</h2>
            <p class='text-center'>Informe datas anteriores ao mês atual!</p>
        </div>
        `

        return;
    }

    await buscarRelatorio(mes, ano, valor);

});

// FUNÇÃO DE EXIBIR RELATORIO NA TELA
async function exibirRelatorio(res) {

    exibir.innerHTML = ''
    console.log(res)

    // QUANDO CARREGAR A PAGINA E NÃO OUVER NENHUM RELATORIO GERADO
    if (res == null) {

        exibir.innerHTML = `
            <div class='flex flex-col justify-center items-center gap-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#3976d1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <h2 class='font-bold text-center'>PARA GERAR RELATÓRIOS</h2>
            <p class='text-center'>Informe o mês, ano e NIF do técnico para gerar os relatórios.</p>
            </div>
            `

    } else if (res.status == 'error') {
        exibir.innerHTML = `
            <div class='flex flex-col justify-center items-center gap-4'>
            <img src="../../img/icon/emergency.svg" alt="emergencia">
            <h2 class='font-bold text-center'>NENHUM REGISTRO ENCONTRADO!</h2>
            <p class='text-center'>Informe uma data onde o NIF correspondente tenha trabalho.</p>
            </div>
            `
    } else {

        exibir.innerHTML = '';
        let idProduto = '';
        let idProposta = '';
        let cabeçalho;
        let all;
        let horaTotal;

        for (let i = 0; i < res.dados.length; i++) {

            // CRIANDO ELEMENTO QUE SERAO INSERIDOS OS DADOS
            if (idProduto !== res.dados[i].idProduto) {
                idProposta = res.dados[i].idProposta;
                idProduto = res.dados[i].idProduto;
                horaTotal = somaHoraTotalMes(res, idProduto, idProposta);
                cabeçalho = createCabecalho();
                cabeçalho.innerHTML = criarCabecalho(res, i, horaTotal);
                all = createAll();
                all.appendChild(cabeçalho)
                for (let dado of res.dados) {
                    if (idProposta === dado.idProposta && idProduto === dado.idProduto) {
                        if (dado.HorasPessoa !== "0"){
                            let horas = createHoras();
                            horas.innerHTML += criarHoras(dado);
                            all.appendChild(horas);
                        }
                    }
                }
                exibir.appendChild(all)
            }
        }
    }
}

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                FUNÇÃO CRIAR CABEÇALHO.
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

function criarCabecalho(res, i, horaTotal) {
    const cabecalho =
        `
    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2'>
    <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize'>${res.dados[i].Nome} ${res.dados[i].Sobrenome}</p>
    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1'>${res.dados[i].NIF}</p>
    </div>
    
    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2 max-w-[200px]'>
    <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize text-ellipsis overflow-hidden' title='${res.dados[i].NomeProduto}'>${res.dados[i].NomeProduto}</p>
    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1'>Produto</p>
    </div>
    
    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2 max-w-[200px]'>
    <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize text-ellipsis overflow-hidden' title='${res.dados[i].TituloProposta}'>${res.dados[i].TituloProposta}</p>
    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1'>Proposta</p>
    </div>

    <div class='border-[gray] px-8 flex flex-col gap-2'>
    <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize'>${horaTotal} Horas</p>
    <p class='text-color-text-secundary font-semibold text-xs flex whitespace-nowrap justify-between gap-1'>Total de horas no mês</p>
    </div>

    <img id='setaDropdown' class='object-contain self-center absolute right-0 transition-all px-8 hidden lg:block' src="../../img/icon/arrow_back_ios.png" alt="seta para baixo">
    `
    return cabecalho;

}
/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                FUNÇÃO CRIAR HORAS.
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
function criarHoras(dado) {
    const horas = `
    <div class='bg-body p-4 mx-4 mt-4 flex overflow-x-auto rounded-xl min-h-[4rem]'>

    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2 bg-body'>
    <p class='text-color-text font-semibold text-lg leading-4 capitalize'>${dado.Datas}</p>
    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1 whitespace-nowrap'>Data de lançamento</p>
    </div>
    
    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2 bg-body'>
    <p class='text-color-text font-semibold text-lg leading-4 capitalize'>${dado.HorasPessoa}  Horas</p>
    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1 whitespace-nowrap'>Horas lançadas</p>
    </div>

    ${dado.Maquina != 'Nenhum' ?
            `
        <div class='px-8 flex flex-col gap-2 bg-body'>
        <p class='text-color-text font-semibold text-lg leading-4 capitalize whitespace-nowrap text-ellipsis overflow-hidden' title='${dado.Maquina}'>${dado.Maquina}</p>
        <p class='text-color-text font-semibold text-lg leading-4 capitalize'>${dado.HorasMaquina}  Horas</p>
        </div>`
            :
            `<div class='px-8 flex flex-col gap-2 bg-body'>
        <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize'>Não há máquinas</p>
        <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1 whitespace-nowrap'>Nome da máquina utilizada</p>
        </did>`
        }
    </div>
    `
    return horas;
}

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                CRIAR ELEMENTOS DO HTML.
--------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

function createCabecalho() {
    const cabecalho = document.createElement('div');
    cabecalho.classList = 'flex overflow-x-auto bg-component rounded-t-xl py-8 relative';
    return cabecalho;

}

function createHoras() {
    const horas = document.createElement('div');
    horas.classList = 'rounded-b-xl hidden bg-component flex flex-col pb-4 transition-all mb-8';
    horas.id = 'produto';
    return horas;
}

function createAll() {
    const all = document.createElement('div');
    all.classList = 'cursor-pointer mb-8 bg-component';
    return all;
}

function somaHoraTotalMes(res, idProduto, idProposta) {
    let totalHora = 0;
    for (let dado of res.dados) {
        if (idProposta === dado.idProposta && idProduto === dado.idProduto) {
            totalHora += Number(dado.HorasPessoa);
        }
    }
    return totalHora;
}