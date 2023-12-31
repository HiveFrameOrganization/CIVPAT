import { back, frontPages } from '../../js/api/Rotas/rotas.js';
import aceitarProposta from '../../js/api/detalhesProposta/aceitarProposta.js';
import alertas from '../../js/feedback.js';

window.addEventListener('load', async () => {
    alertas();
    await carregarTecnicos();
    await pegarUnidadesCriadoras();
    // LancamentoHoras();

    const produtoSelect = document.getElementById("produto");
    const servicoCategoriaSelect = document.getElementById('servico');
    const unidadeCriadoraSelect = document.getElementById('unidadeRealizadora');

    const dadosProduto = await carregarDetalhesProduto();

    const opcoesTecnicos = document.getElementById('tecnicos');
    // Percorra as opções do <select> para encontrar a que corresponde ao valor desejado
    for (var j = 0; j < opcoesTecnicos.options.length; j++) {
        if (opcoesTecnicos.options[j].value == dadosProduto['fk_nifTecnico']) {
            opcoesTecnicos.options[j].selected = true;
            break; // Saia do loop após encontrar a opção desejada
        }
    }

    document.getElementById('tempoMaquina').value = dadosProduto['HoraMaquina'];
    localStorage.setItem('tempoMaquina', dadosProduto['HoraMaquina']);
    document.getElementById('tempoPessoa').value = dadosProduto['HoraPessoa'];
    localStorage.setItem('tempoPessoa', dadosProduto['HoraPessoa']);
    document.getElementById('dataInicial').value = dadosProduto['DataInicial'];
    document.getElementById('dataFinal').value = dadosProduto['DataFinal'];
    document.getElementById('valor').value = dadosProduto['Valor'];
    document.getElementById('situacaoProduto').value = dadosProduto['Situacao'];
    localStorage.setItem('situacaoProduto', dadosProduto['Situacao']);

    // document.getElementById('tempoPessoa').value = dadosProduto['HoraPessoa'];
    // document.getElementById('tempoPessoa').value = dadosProduto['HoraPessoa'];

    // inativar horas maquina se nao houver maquina selecionada
    let tempo = document.getElementById('tempoMaquina')
    if (dadosProduto['fk_idMaquina'] == 1) {
        tempo.setAttribute('disabled', 'true')
        // tempo.classList.add()
        localStorage.setItem('maquina', 'Nenhuma')
    }


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
        dados.forEach(function (dado) {
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


// async function gerarHora() {

//     // const resposta = await fetch("https://worldtimeapi.org/api/timezone/America/Sao_Paulo");
//     // try {
//     //     const resultado = await resposta.json();

//     //     const dataApi = resultado['datetime'];

//     //     const dataFormatada = dataApi.substring(0, 10);

//     //     return dataFormatada.replace(/T/i, " ");

//     // } catch (error) {
//     //     console.log('Sistema de horas apresentou um erro');

//     //     const data = Date()
//     // }

//     // Obtém a data atual
//     const dataAtual = new Date();

//     // Obtém a data atual em um formato legível
//     const dataAtualFormatada = dataAtual.toLocaleDateString();

//     return dataAtualFormatada;
// }


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

////////////////////////////////////////////////

const dataInicial = document.getElementById('dataInicial');

dataInicial.addEventListener('change', () => validacaoDataFinal());

async function validacaoDataFinal() {
    // Validação para o input da data final nunca receber uma data antes da data inicial
    const dataInicial = document.getElementById('dataInicial').value;

    document.getElementById('dataFinal').setAttribute('min', dataInicial);

}

// window.addEventListener('load', () => pegarUnidadesCriadoras());

async function carregarTecnicos() {
    const requisicao = await fetch(back + '/cadastroProduto/carregarTecnicos.php', {
        methods: 'GET'
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




// window.addEventListener('load', async function () {

// })


// Quando for selecionado executar 
document.getElementById("servico").addEventListener("change", async function () {
    const idServicoCategoria = document.getElementById('servico').value;
    const produtoSelect = document.getElementById("produto");


    // Excluir as options anteriores
    produtoSelect.innerHTML = "";

    try {
        const requisicao = await fetch(back + `/cadastroProduto/carregarProdutos.php?id=${idServicoCategoria}`);

        // dados de todas as propostar recebidas (resposta da api)
        const dados = await requisicao.json();



        // caso a requisição de um erro, irá exibir uma mensagem de erro
        if (dados.resposta === 'erro') throw new Error(dados.message);

        // Loop pelos resultados e crie as options
        dados.forEach(function (dado) {
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

    const requisicao = await fetch(back + `/detalhesProduto/detalhesProduto.php?id=${idProduto}`);

    // dados do produto recebido (resposta da api)
    const dados = await requisicao.json();

    console.log(dados);

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

    const requisicao = await fetch(back + '/todasPropostas/pegarUnidadesCriadoras.php');

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

async function atualizarProduto(dados) {

    try {
        const requisicao = await fetch(back + '/detalhesProduto/salvarProdutoModificado.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados)

        })

        // Verificando se deu erro ao fazer a requisição
        if (!requisicao.ok) {
            throw new Error('Erro na requisição');
        }

        const resposta = await requisicao.json();

        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);

        window.location.href = frontPages + '/detalhesProposta/detalhesProposta.html';


    } catch (error) {
        console.error(error)
    }
}

if (((localStorage.getItem('cargo') == 'coor') || (localStorage.getItem('cargo') == 'ger') || (localStorage.getItem('cargo') == 'adm')) && ((localStorage.getItem('statusProposta') == 'Em Análise') || (localStorage.getItem('statusProposta') == 'Aceito'))) {

    const dataAtual = new Date();
    var dataLimite = new Date('9999-12-31');
    var dataInserida = new Date(document.getElementById('dataInicial').value);

    const botaoModificarProduto = document.getElementById('modificarProduto');

    botaoModificarProduto.addEventListener('click', async () => {
        const dadosBanco = await carregarDetalhesProduto();

        const idProduto = localStorage.getItem('idProduto');

        const tempoMaquina = document.getElementById('tempoMaquina').value;
        const tempoPessoa = document.getElementById('tempoPessoa').value;
        const unidadeRealizadora = document.getElementById('unidadeRealizadora').value;
        const dataInicial = document.getElementById('dataInicial').value;
        const dataFinal = document.getElementById('dataFinal').value;
        const area = document.getElementById('area').value;
        const servico = document.getElementById('servico').value;
        const produto = document.getElementById('produto').value;
        var valor = document.getElementById('valor').value.replace(/\.+/g, '');
        valor = valor.replace(',', '.');
        const tecnico = document.getElementById('tecnicos').value;
        const idProposta = localStorage.getItem('idProposta');

        // Obter a data inserida pelo usuário
        var dataInicialInserida = new Date(dataInicial);
        var dataFinalInserida = new Date(dataFinal);

        if (dataInicialInserida < dataAtual || dataInicialInserida < dataInserida) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Data inicial inserida ja passou');

            alertas();
        } else if (dataFinalInserida < dataInicialInserida) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Data final não pode ser antes da data inicial');

            alertas();
        } else if (dataInicialInserida > dataLimite) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Data inicial fora do limite');

            alertas();
        } else if (dataFinalInserida > dataLimite) {
            localStorage.setItem('status', 'error');
            localStorage.setItem('mensagem', 'Data final fora do limite');

            alertas();
        } else {

            const dadosParaEnviar = {
                idProduto: idProduto,
                tempoMaquina: tempoMaquina,
                tempoPessoa: tempoPessoa,
                unidadeRealizadora: unidadeRealizadora,
                dataInicial: dataInicial,
                dataFinal: dataFinal,
                area: area,
                servico: servico,
                produto: produto,
                valor: valor,
                tecnico: tecnico,
                idProposta: idProposta
            }


            atualizarProduto(dadosParaEnviar);
        }


    })
};



document.getElementById('valor').addEventListener('keydown', () => {

    const valorInserido = document.getElementById('valor').value;

    if (valorInserido > 99999999.99) {
        alert('Valor Máximo digitado');
        const inputValor = document.getElementById('valor').value = '';
    }


});


// });

var horasRestantes;
var horasRestantesMaquina;

// async function LancamentoHoras() {
//     const id = localStorage.getItem('idProduto');

//     try {
//         const exibirHoras = await fetch(back + `/detalhesProduto/lancamentoHoras.php?id=${id}`)

//         const resposta = await exibirHoras.json();


//         if (localStorage.getItem('cargo') == 'tec') {

//             // PESSOAS

//             if (resposta['horaTotalPessoa'] == undefined) {
//                 document.querySelector('#horasPessoa').value = localStorage.getItem('tempoPessoa');
//             } else {
//                 document.querySelector('#horasPessoa').value = resposta['horaTotalPessoa'];
//             }

//             // verificando se existem horas acumuladas
//             if (resposta['horasAcumuladasPessoa'] == undefined) {
//                 document.querySelector("#horasPessoaAcumuladas").value = 0;
//             } else {
//                 document.querySelector("#horasPessoaAcumuladas").value = resposta['horasAcumuladasPessoa'];
//             }

//             // MAQUINAS

//             if (localStorage.getItem('tempoMaquina') != 0) {
//                 if (resposta['horaTotalMaquina'] == undefined) {
//                     setTimeout(renderizaHoraMaquina, 1000)

//                     function renderizaHoraMaquina(){
//                         document.querySelector('#horasMaquina').value = localStorage.getItem('tempoMaquina');
//                     }
//                 } else {
//                     document.querySelector('#horasMaquina').value = resposta['horaTotalMaquina'];
//                 }

//                 if (resposta['horasAcumuladasMaquina'] == undefined) {
//                     document.querySelector("#horasMaquinaAcumuladas").value = 0;
//                 } else {
//                     document.querySelector("#horasMaquinaAcumuladas").value = resposta['horasAcumuladasMaquina'];
//                 }
//             }

//             // adiciona cor diferente se as horas acumuladas estiverem perto de ultrapassar o total

//             if (resposta['horasAcumuladasPessoa'] >= ((resposta['horaTotalPessoa'] * 75) / 100)) {
//                 document.querySelector('#horasPessoaAcumuladas').classList.add('vencendo');
//             }

//             // adiciona cor diferente se as horas acumuladas ultrapassarem o total

//             if (resposta['horasAcumuladasPessoa'] > resposta['horaTotalPessoa']) {
//                 document.querySelector('#horasPessoaAcumuladas').classList.add('vencido');
//             }

//         } else {
//             // inputs do coordenador

//             if (resposta['horasAcumuladasPessoa'] == undefined) {
//                 document.querySelector("#horasPessoaAcumuladasCoor").value = 0;
//             } else {
//                 document.querySelector("#horasPessoaAcumuladasCoor").value = resposta['horasAcumuladasPessoa'];
//             }

//             if (resposta['horasAcumuladasMaquina'] == undefined) {
//                 document.querySelector("#horasMaquinaAcumuladasCoor").value = 0;
//             } else {
//                 document.querySelector("#horasMaquinaAcumuladasCoor").value = resposta['horasAcumuladasMaquina'];
//             }
//         }


//         if (localStorage.getItem('cargo') == 'tec') {


//             //Condicionais para gerar os botões com as opções de lançamento de horas dependendo da hora trabalhada
//             if (resposta.totalHorasPessoaDiarias == undefined) {
//                 horasRestantes = 10 - 0;
//             } else {
//                 horasRestantes = 10 - (resposta.totalHorasPessoaDiarias);
//             }

//             if (resposta.totalHorasMaquinaDiarias == undefined) {
//                 horasRestantesMaquina = 10 - 0;
//             } else {
//                 horasRestantesMaquina = 10 - (resposta.totalHorasMaquinaDiarias);
//             }


//             const opcoesHoraPessoa = document.getElementById('horaPessoaDiaria');
//             const opcoesHoraMaquina = document.getElementById('horaMaquinaDiaria');

//             opcoesHoraPessoa.innerHTML = ''; // Limpe as opções existentes em ambos os select
//             if (localStorage.getItem('tempoMaquina') != 0) {
//                 opcoesHoraMaquina.innerHTML = '';
//             }

//             if (horasRestantes == 0) {
//                 let option = document.createElement('option');
//                 option.classList.add('bg-body');
//                 option.value = 0;
//                 option.textContent = 0;
//                 opcoesHoraPessoa.appendChild(option);
//             } else {
//                 for (let i = 0; i < horasRestantes; i++) {
//                     let option = document.createElement('option');
//                     option.classList.add('bg-body');
//                     option.value = i + 1;
//                     option.textContent = i + 1;
//                     opcoesHoraPessoa.appendChild(option);
//                 }
//             }

//             if (localStorage.getItem('tempoMaquina') != 0) {
//                 if (horasRestantesMaquina == 0) {
//                     let option = document.createElement('option');
//                     option.classList.add('bg-body');
//                     option.value = 0;
//                     option.textContent = 0;
//                     opcoesHoraMaquina.appendChild(option);
//                 } else {
//                     for (let i = -1; i < horasRestantesMaquina; i++) {
//                         let option = document.createElement('option');
//                         option.classList.add('bg-body');
//                         option.value = i + 1;
//                         option.textContent = i + 1;
//                         opcoesHoraMaquina.appendChild(option);
//                     }
//                 }
//             }

//             // desabilita o botao de salvar horas se o tecnico ja tiver terminado suas horas

//             if (horasRestantes == 0) {
//                 document.querySelector('#salvarHoras').disabled = true;
//             }
//         }


//     } catch (error) {
//         console.error(error)
//     }

// }


// if (localStorage.getItem('cargo') == 'tec') {

//     //Ao clicar no botão, sera acionada a função para salvar os dados no back
//     const salvarHoras = document.getElementById('salvarHoras').addEventListener('click', async () => {
//         const id = localStorage.getItem('idProduto');
//         const nifPerfil = localStorage.getItem('nifPerfil');

//         const horaPessoaDiaria = document.getElementById('horaPessoaDiaria').value;

//         if (localStorage.getItem('tempoMaquina') != 0) {
//             var horaMaquinaDiaria = document.getElementById('horaMaquinaDiaria').value;
//         } else {
//             var horaMaquinaDiaria = 0;
//         }

//         const dados = {
//             nifPerfil: nifPerfil,
//             id: id,
//             horaPessoaDiaria: horaPessoaDiaria,
//             horaMaquinaDiaria: horaMaquinaDiaria
//         };



//         try {
//             if (horaPessoaDiaria > horasRestantes || horaMaquinaDiaria > horasRestantesMaquina){

//                 localStorage.setItem('status', 'error');
//                 localStorage.setItem('mensagem', 'Horas informadas invalidas');

//                 alertas();
//             }
//             else{
//                 const requisicao = await fetch(back + `/detalhesProduto/salvarLancamentoHoras.php`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(dados)
//                 });

//                 const resposta = await requisicao.json();



//                 localStorage.setItem('status', resposta.status);
//                 localStorage.setItem('mensagem', resposta.mensagem);

//                 if (resposta.status == 'error') {
//                     alertas();
//                 } else {
//                     window.location.href = '/frontend/pages/perfil/index.html';
//                 }
//             }

//         } catch (error) {
//             console.error(error);

//         }
//     })
// };

// função de finalizar produto

if (localStorage.getItem('cargo') == 'tec') {

    const botaoFinalizarProduto = document.getElementById('concluirProduto');

    botaoFinalizarProduto.addEventListener('click', () => {
        // concluirProduto();
        modalConfirmar()
    })

    async function concluirProduto() {

        const idProduto = localStorage.getItem('idProduto');

        const requisicao = await fetch(back + `/detalhesProduto/concluirProduto.php?id=${idProduto}`, {
            method: 'PUT'
        });

        const resposta = await requisicao.json();

        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);

        if (localStorage.getItem('cargo') == 'tec') {
            window.location.href = frontPages + '/perfil/index.html';
        } else {
            window.location.href = frontPages + '/detalhesProposta/detalhesProposta.html';
        }

    }

    /////////////////////////////

    // MODAL DE CONFIRMAÇÃO PARA FINALIZAR PRODUTO
    function modalConfirmar() {

        Swal.fire({
            title: 'Finalizar produto?',
            icon: 'info',
            text: 'Você não poderá reverter isso!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, finalizar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {

            result.isConfirmed && concluirProduto();
        });



    //     const div = document.createElement('div');
    //     const aside = document.createElement('aside');

    //     div.classList = 'bg-component w-[600px] max-w-[90%] rounded-md py-4 sm:py-8 fixed z-10 right-1/2 left-1/2 -translate-x-1/2 top-1/2 bottom-1/2 -translate-y-1/2 h-max';
    //     aside.classList = 'bg-[black] opacity-50 w-full h-screen fixed top-0'

    //     const templateModalConfirmar = `
    // <div class="modal-header flex justify-between items-start mb-8 px-4 sm:px-8">
    //     <div>
    //         <h2 class="text-2xl font-bold text-color-text">DESEJA FINALIZAR O PRODUTO?</h2>
    //         <h3 class="text-xs font-normal"><strong class="text-color-red">Confirme sua escolha!</strong></h3>
    //     </div>
    //     <button id="close-modal-confirmar" type="button" class="p-1 hover:bg-primary/20 transition-colors rounded-full w-10 h-10"><img src="../../img/icon/x.svg" alt="Fechar" class="w-full"></button>
    // </div>
    // <div class="modal-body">
    //     <div class="px-4 sm:px-8 flex justify-between">
    //         <button id="btn-confirmar" value="yes" type="button" class="bg-color-green py-2 px-6 text-[#fff] rounded-md text-xs font-semibold border border-color-green hover:bg-[transparent] hover:text-color-green transition-colors">CONFIRMAR</button>
    //         <button id="btn-cancelar" value="no" type="button" class="bg-color-red py-2 px-6 text-[#fff] rounded-md text-xs font-semibold border border-color-red hover:bg-[transparent] hover:text-color-red transition-colors">CANCELAR</button>
    //     </div>
    // </div>
    // `;


    //     div.innerHTML = templateModalConfirmar;

    //     document.body.appendChild(div);
    //     document.body.appendChild(aside)

    //     // CHAMA FUNÇAO PARA ACEITAR PROPOSTA OU DECLINAR PROPOSTA
    //     document.querySelector('#btn-confirmar').addEventListener('click', () => {
    //         concluirProduto()
    //     })

    //     // APAGAR ELEMENTOS DE MODAL
    //     aside.addEventListener('click', () => {
    //         document.body.removeChild(div)
    //         document.body.removeChild(aside)
    //     })
    //     document.querySelector('#close-modal-confirmar').addEventListener('click', () => {
    //         document.body.removeChild(div)
    //         document.body.removeChild(aside)
    //     })
    //     document.querySelector('#btn-cancelar').addEventListener('click', () => {
    //         document.body.removeChild(div)
    //         document.body.removeChild(aside)
    //     })
    }
}

var valor = document.getElementById('valor')

valor.addEventListener('input', () => {
    if (valor.value.length > valor.maxLength) {
        valor.value = valor.value.slice(0, valor.maxLength);
    }
})