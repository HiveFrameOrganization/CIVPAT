import { back, frontPages } from '../../js/api/Rotas/rotas.js';
import alertas from '../../js/feedback.js';

// formatar a data
const hoje = new Date();
const ano = hoje.getFullYear();
let mes = hoje.getMonth() + 1;
let dia = hoje.getDate();

// Garantir que vai ter um 0 em meses que não tem dois números
if (mes < 10) {
    mes = '0' + mes;
};
if (dia < 10) {
    dia = '0' + dia;
};

// Não permitir que marque uma data depois de hoje.
const dataMaxima = `${ano}-${mes}-${dia}`;
document.getElementById('dataInicial').setAttribute('min', dataMaxima);
// document.getElementsByName('dataFinal').setAttribute('max', dataMaxima);

// Seta a data de lançamento para não ser depois de ontem
let diaLancamento = dia > 10 ? `${dia-1}` : `0${dia-1}`
document.getElementById('dataDoLancamento').setAttribute('max', `${ano}-${mes}-${diaLancamento}`);
////////////////////////////////////////////////

const dataInicial = document.getElementById('dataInicial');

dataInicial.addEventListener('change', () => validacaoDataFinal());

async function validacaoDataFinal () {
    // Validação para o input da data final nunca receber uma data antes da data inicial
    const dataInicial = document.getElementById('dataInicial').value;

    document.getElementById('dataFinal').setAttribute('min', dataInicial);

}

// window.addEventListener('load', () => pegarUnidadesCriadoras());

async function carregarTecnicos () {
    const requisicao = await fetch(back + '/cadastroProduto/carregarTecnicos.php', {
        methods : 'GET'
    });

    const resposta = await requisicao.json();

    const opcoesTecnicos = document.getElementById('tecnicos');

    for (var i = 0; i < resposta.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.classList.add('bg-body');
        optionElement.value = resposta[i + 1];
        optionElement.textContent = resposta[i];
        opcoesTecnicos.appendChild(optionElement);

        i += 1;
    }

}
window.addEventListener('load', async function (){
    carregarTecnicos();
    pegarUnidadesCriadoras();
    // lancamentoHoras();

    const produtoSelect = document.getElementById("produto");
    const servicoCategoriaSelect = document.getElementById('servico');
    const unidadeCriadoraSelect = document.getElementById('unidadeRealizadora');

    const dadosProduto = await carregarDetalhesProduto(); 
    

    document.getElementById('produto').value = dadosProduto['NomeProduto'];
    document.getElementById('horaMaquinaInput').value = dadosProduto['HoraMaquina'];
    document.getElementById('horaPessoaInput').value = dadosProduto['HoraPessoa'];
    document.getElementById('dataInicial').value = dadosProduto['DataInicial'];
    document.getElementById('dataFinal').value = dadosProduto['DataFinal'];
    document.getElementById('valor').value = dadosProduto['Valor'];

    // document.getElementById('tempoPessoa').value = dadosProduto['HoraPessoa'];
    // document.getElementById('tempoPessoa').value = dadosProduto['HoraPessoa'];

    // inativar horas maquina se nao houver maquina selecionada
    let tempo = document.getElementById('tempoMaquina')
    if(dadosProduto['fk_idMaquina'] == 1){
        tempo.setAttribute('disabled', 'true')
        // tempo.classList.add()
        localStorage.setItem('maquina', 'Nenhuma')
    }


    console.log(dadosProduto);

    // Percorra as opções do <select> para encontrar a que corresponde ao valor desejado
    for (var i = 0; i < unidadeCriadoraSelect.options.length; i++) {
        if (unidadeCriadoraSelect.options[i].value == dadosProduto.fk_idUnidadeRealizadora) {
            unidadeCriadoraSelect.options[i].selected = true;
            break; // Saia do loop após encontrar a opção desejada
        }
    }

    const idServicoCategoria = dadosProduto.fk_idServicoCategoria; 

    // Percorra as opções do <select> para encontrar a que corresponde ao valor desejado
    for (var i = 0; i < servicoCategoriaSelect.options.length; i++) {
        if (servicoCategoriaSelect.options[i].value == dadosProduto.fk_idServicoCategoria) {
            servicoCategoriaSelect.options[i].selected = true;
            break; // Saia do loop após encontrar a opção desejada
        }
    }
    
    // Excluir as options anteriores
    produtoSelect.innerHTML = "";
    
    try {
        const requisicao = await fetch(back + `/cadastroProduto/carregarProdutos.php?id=${idServicoCategoria}`);

        // dados de todas as propostar recebidas (resposta da api)
        const dados = await requisicao.json();

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);

        // Loop pelos resultados e crie as options
        dados.forEach(function(dado) {
            var option = document.createElement('option');
            option.classList.add('bg-body');
            option.value = dado.idNomeProduto;
            option.text = dado.NomeProduto;
            produtoSelect.appendChild(option);
        });

        selecionarProduto(dadosProduto);
        
    } catch {
        console.log('Error');
    }

    
})

// Quando for selecionado executar 
document.getElementById("servico").addEventListener("change", async function() {
    const idServicoCategoria = document.getElementById('servico').value;
    const produtoSelect = document.getElementById("produto");

    
    // Excluir as options anteriores
    produtoSelect.innerHTML = "";
    
    try {
        const requisicao = await fetch(back + `/cadastroProduto/carregarProdutos.php?id=${idServicoCategoria}`);

        // dados de todas as propostar recebidas (resposta da api)
        const dados = await requisicao.json();

        console.log(dados);

        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);

        // Loop pelos resultados e crie as options
        dados.forEach(function(dado) {
            var option = document.createElement('option');
            option.classList.add('bg-body');
            option.value = dado.idNomeProduto;
            option.text = dado.NomeProduto;
            produtoSelect.appendChild(option);
        });
    } catch {
        console.log('Error');
    }
// Adicionar o Select2
// $(document).ready(function() { 
//     $("#servico").select2();
// });

// $(document).ready(function() { 
//         $("#produto").select2();
//     });
});


async function carregarDetalhesProduto() {
    const idProduto = localStorage.getItem('idProduto');

    const requisicao = await fetch(back + `/lancarHorasEsquecidas/detalhesProduto.php?id=${idProduto}`);

    // dados do produto recebido (resposta da api)
    const dados = await requisicao.json();

    // caso a requisição de um erro, irá exibir uma mensagem de erro
    if (dados.resposta === 'erro') throw new Error(dados.message);

    return dados[0];


}

async function selecionarProduto(dadosProduto) {

    const produtoSelect = document.getElementById("produto");
    // Percorra as opções do <select> para encontrar a que corresponde ao valor desejado
    for (var i = 0; i < produtoSelect.options.length; i++) {
        if (produtoSelect.options[i].value == dadosProduto.fk_idNomeProduto) {
            produtoSelect.options[i].selected = true;
            const titulo = document.getElementById('titulo');
            titulo.innerText = produtoSelect.options[i].text.toUpperCase();

            // console.log(produtoSelect.options[i].value)
            break; // Saia do loop após encontrar a opção desejada
        }
    }

}


async function pegarUnidadesCriadoras() {
    const unidadesSelect = document.getElementById('unidadeRealizadora');

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


}


// async function lancamentoHoras(){
//     const id = localStorage.getItem('idProduto');

//     try{
//         const exibirHoras = await fetch(back + `/detalhesProduto/lancamentoHoras.php?id=${id}`)

//         const resposta = await exibirHoras.json();

//         if (localStorage.getItem('cargo') == 'tec'){
//             document.querySelector('#horasPessoa').value = resposta['horaTotalPessoa'];
//             document.querySelector('#horasMaquina').value = resposta['horaTotalMaquina'];
//             document.querySelector("#horasPessoaAcumuladas").value = resposta['horasAcumuladasPessoa'];
//             document.querySelector("#horasMaquinaAcumuladas").value = resposta['horasAcumuladasMaquina'];
//         } else {
//             if (resposta['horasAcumuladasPessoa'] == undefined){
//                 document.querySelector("#horasPessoaAcumuladasCoor").value = 0;
//             } else {
//                 document.querySelector("#horasPessoaAcumuladasCoor").value = resposta['horasAcumuladasPessoa'];
//             }

//             if (resposta['horasAcumuladasMaquina'] == undefined){
//                 document.querySelector("#horasMaquinaAcumuladasCoor").value = 0;
//             } else {
//                 document.querySelector("#horasMaquinaAcumuladasCoor").value = resposta['horasAcumuladasMaquina'];
//             }
//         }


//         if(localStorage.getItem('cargo') == 'tec'){
//             const horasRestantes = 10 - resposta.horasDiariasPessoas;
//             const horasRestantesMaquina = 10 - resposta.horasDiariasMaquina;
    
//             console.log(resposta.horasDiariasPessoas);
    
//             const opcoesHoraPessoa = document.getElementById('horaPessoaDiaria');
//             const opcoesHoraMaquina = document.getElementById('horaMaquinaDiaria');
    
           
//                 opcoesHoraPessoa.innerHTML = ''; // Limpe as opções existentes em ambos os select
//                 opcoesHoraMaquina.innerHTML = '';
        
//                 if (horasRestantes == 0) {
//                     let option = document.createElement('option');
//                     option.classList.add('bg-body');
//                     option.value = 0;
//                     option.textContent = 0;
//                     opcoesHoraPessoa.appendChild(option);
//                 } else {
//                     for (let i = 0; i < horasRestantes; i++) {
//                         let option = document.createElement('option');
//                         option.classList.add('bg-body');
//                         option.value = i + 1;
//                         option.textContent = i + 1;
//                         opcoesHoraPessoa.appendChild(option);
//                     }
//                 }
        
//                 if (horasRestantesMaquina == 0) {
//                     let option = document.createElement('option');
//                     option.classList.add('bg-body');
//                     option.value = 0;
//                     option.textContent = 0;
//                     opcoesHoraMaquina.appendChild(option);
//                 } else {
//                     if (resposta.horasDiariasMaquina != null) {
//                         for (let i = 0; i < horasRestantesMaquina; i++) {
//                             let option = document.createElement('option');
//                             option.classList.add('bg-body');
//                             option.value = i + 1;
//                             option.textContent = i + 1;
//                             opcoesHoraMaquina.appendChild(option);
//                         }
//                     }
//                 }

//                 if (horasRestantes == 0 && horasRestantesMaquina == 0){
//                     document.querySelector('#salvarHoras').disabled = true;
//                 }
            
//         }


//     }catch (error) {
//         console.error(error)
//     }

// }

// if (localStorage.getItem('cargo') == 'tec'){
//         document.getElementById('lancarHoras').addEventListener('click', async () => {
//             const id = localStorage.getItem('idProduto');
//             const nifPerfil = localStorage.getItem('nifPerfil');

//             const horaPessoaDiaria = document.getElementById('horaPessoaDiaria').value;
//             const horaMaquinaDiaria = document.getElementById('horaMaquinaDiaria').value;



//             console.log(horaMaquinaDiaria + ' horas')

//             const dados = {
//                 nifPerfil: nifPerfil,
//                 id: id,
//                 horaPessoaDiaria: horaPessoaDiaria,
//                 horaMaquinaDiaria: horaMaquinaDiaria
//             };

//             console.log(dados);

//             try {
                 
//                 if (horaPessoaDiaria > horasRestantes || horaMaquinaDiaria > horasRestantesMaquina){
//                     console.log('Horas informadas invalidas')
//                 }
//                 else{
//                     const requisicao = await fetch(back + `/detalhesProduto/salvarLancamentoHoras.php`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(dados)
//                     });

//                     const resposta = await requisicao.json();
//                     // Faça algo com a resposta, se necessário.
//                     console.log(resposta)
//                     localStorage.setItem('status', resposta.status);
//                     localStorage.setItem('mensagem', resposta.mensagem);

//                     if (resposta.status == 'error'){
//                         alertas();
//                     } else {
//                         window.location.href = '/frontend/pages/perfil/index.html';
//                     }
//                 }
            
//             } catch (error) {
//                 console.error(error);
//                 // Trate o erro adequadamente, se necessário.
//             }
// })};





/////////////////////////////


