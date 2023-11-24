import { back } from "../Rotas/rotas.js";
import { autenticacao } from "../login/autenticacao.js";

window.addEventListener('load', ()=>{
    // RETORNANDO NADA AO CARREGAR A PAGINA PARA MOSTRAR MENSAGEM NA TELA
    exibirBancoHoras(null)
})

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
    const autenticado = await autenticacao(['adm', 'tec'], false)
    if(!autenticado){
        return;
    }

    try {

        console.log(nif)

        if (!nif) throw new Error(`É nescessário o NIF do funcionário para pesquisar`);

        const requisicao = await fetch(`${back}/relatorio/puxarRelatorio.php?mes=${mes}&ano=${ano}&valor=${nif}&cargo=${cargo}`);

        const resposta = await requisicao.json();

        console.log(resposta);
        exibirBancoHoras(resposta)

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


// FUNÇÃO DE EXIBIR RELATORIO NA TELA
async function exibirBancoHoras(res) {

    exibir.innerHTML = ''

    // console.log(res.dados[0].NomeProduto)

    // QUANDO CARREGAR A PAGINA E NÃO OUVER NENHUM RELATORIO GERADO
    if(res == null){
        
        exibir.innerHTML = `
        <div class='flex flex-col justify-center items-center gap-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#3976d1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        <h2 class='font-bold'>INFORME O MÊS E O ANO PARA GERAR O BANCO DE HORAS TRABALHAS NOS RESPECTIVOS MESES!</h2>
        <p>informe um mês onde você tenha lançado horas em algum produto.</p>
        </div>
        `

    }else if (res.status == 'error') {

        exibir.innerHTML = `
            <div class='flex flex-col justify-center items-center gap-4'>
            <img src="../../img/icon/emergency.svg" alt="emergencia">
            <h2 class='font-bold'>NENHUM RESGISTRO ENCONTRADO!</h2>
            <p>informe um mês onde você tenha lançado horas em algum produto.</p>
            </div>
            `

    } else {

        // CRIANDO ELEMENTO QUE SERAO INSERIDOS OS DADOS
        let cabeçalho = document.createElement('div')
        cabeçalho.classList = 'flex bg-component rounded-t-xl py-8 relative'
        let horas = document.createElement('div')
        horas.classList = 'rounded-b-xl bg-component flex flex-col overflow-y-hidden pb-4 transition-height mb-8'
        let all = document.createElement('div')
        all.classList = 'overflow-y-hidden cursor-pointer h-24 mb-8'
        all.addEventListener('click', () => {
            if (all.classList.contains('h-24')) {
                all.classList.remove('h-24')
                all.classList.toggle('bg-component')
                document.querySelector('#setaDropdown').classList.add('rotate-180')
                cabeçalho.classList.add('bg-body')
                cabeçalho.classList.remove('bg-component')
            } else {
                all.classList.add('h-24')
                all.classList.toggle('bg-component')
                document.querySelector('#setaDropdown').classList.remove('rotate-180')
                cabeçalho.classList.remove('bg-body')
                cabeçalho.classList.add('bg-component')
            }
        })

        for (let i = 0; i < res.dados.length; i++) {

            let nif
            let proposta
            let produto
            let horaTotal = 0

            // CALCULA TODAS AS HORAS FEITAS NO MÊS E SALVA NUMA VARIAVEL
            for (let x = 0; x < res.dados.length; x++) {
                horaTotal += parseInt(res.dados[x].HorasPessoa)
            }

            // VERIFICAR SE AS HORAS CADASTRADAS PERTENCEM AO MESMO TECNICO
            if (nif == null) {
                nif = res.dados[i].NIF

                if (proposta == null && produto == null || proposta != res.dados[i].TituloProposta && res.dados[i].NomeProduto)
                    proposta = res.dados[i].TituloProposta
                produto = res.dados[i].NomeProduto

                cabeçalho.innerHTML = `
                    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2'>
                    <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize'>${localStorage.getItem('nomeLogin')}</p>
                    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1'>Técnico</p>
                    </div>
                    
                    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2'>
                    <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize'>${res.dados[i].NomeProduto}</p>
                    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1'>Produto</p>
                    </div>
                    
                    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2'>
                    <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize'>${res.dados[i].TituloProposta}</p>
                    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1'>Proposta</p>
                    </div>

                    <div class='border-[gray] px-8 flex flex-col gap-2'>
                    <p class='text-color-text whitespace-nowrap font-semibold text-lg leading-4 capitalize'>${horaTotal} Horas</p>
                    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1'>Total de horas no mês</p>
                    </div>

                    <img id='setaDropdown' class='object-contain self-center absolute right-0 transition-all px-8' src="../../img/icon/arrow_back_ios.png" alt="seta para baixo">
                    `

            }

            horas.innerHTML += `
            <div class='bg-body p-4 mx-4 mt-4 flex overflow-x-scroll w-[98,5%] rounded-xl min-h-[4rem]'>
            
                    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2 bg-body'>
                    <p class='text-color-text font-semibold text-lg leading-4 capitalize'>${res.dados[i].Datas}</p>
                    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1 whitespace-nowrap'>Data de lançamento</p>
                    </div>
                    
                    <div class='border-r-2 border-[gray] px-8 flex flex-col gap-2 bg-body'>
                    <p class='text-color-text font-semibold text-lg leading-4 capitalize'>${res.dados[i].HorasPessoa}  Horas</p>
                    <p class='text-color-text-secundary font-semibold text-xs flex flex-wrap justify-between gap-1 whitespace-nowrap'>Horas lançadas</p>
                    </div>

                    </div>
                    `

            all.appendChild(cabeçalho)
            all.appendChild(horas)
            exibir.appendChild(all)
        }
    }
}
