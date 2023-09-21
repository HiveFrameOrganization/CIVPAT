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
    LancamentoHoras();

    const produtoSelect = document.getElementById("produto");
    const servicoCategoriaSelect = document.getElementById('servico');
    const unidadeCriadoraSelect = document.getElementById('unidadeRealizadora');

    const dadosProduto = await carregarDetalhesProduto();  

    console.log(dadosProduto);

    document.getElementById('tempoMaquina').value = dadosProduto['HoraMaquina'];
    localStorage.setItem('tempoMaquina', dadosProduto['HoraMaquina']);
    document.getElementById('tempoPessoa').value = dadosProduto['HoraPessoa'];
    localStorage.setItem('tempoPessoa', dadosProduto['HoraPessoa']);
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
    for (var j = 0; j < servicoCategoriaSelect.options.length; j++) {
        if (servicoCategoriaSelect.options[j].value == dadosProduto.fk_idServicoCategoria) {
            servicoCategoriaSelect.options[j].selected = true;
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

    const requisicao = await fetch(back + `/detalhesProduto/detalhesProduto.php?id=${idProduto}`);

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

async function atualizarProduto(dados){

    try{
        const requisicao = await fetch(back + '/detalhesProduto/salvarProdutoModificado.php',{
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

        
    }catch(error){
        console.error(error)
    }
}

if (((localStorage.getItem('cargo') == 'coor') || (localStorage.getItem('cargo') == 'ger') || (localStorage.getItem('cargo') == 'adm')) && ((localStorage.getItem('statusProposta') == 'Em Análise') || (localStorage.getItem('statusProposta') == 'Aceito'))){

    const botaoModificarProduto = document.getElementById('modificarProduto');

    botaoModificarProduto.addEventListener('click', () => {
        const idProduto = localStorage.getItem('idProduto');

        const tempoMaquina = document.getElementById('tempoMaquina').value;
        const tempoPessoa = document.getElementById('tempoPessoa').value;
        const unidadeRealizadora = document.getElementById('unidadeRealizadora').value;
        const dataInicial = document.getElementById('dataInicial').value;
        const dataFinal = document.getElementById('dataFinal').value;
        const area = document.getElementById('area').value;
        const servico = document.getElementById('servico').value;
        const produto = document.getElementById('produto').value;
        const valor = document.getElementById('valor').value;
        const tecnico = document.getElementById('tecnicos').value;


        const dadosParaEnviar = {
            idProduto: idProduto,
            tempoMaquina: tempoMaquina,
            tempoPessoa: tempoPessoa,
            unidadeRealizadora: unidadeRealizadora,
            dataInicial : dataInicial ,
            dataFinal: dataFinal,
            area: area,
            servico: servico,
            produto: produto,
            valor: valor,
            tecnico: tecnico
        }
        
        atualizarProduto(dadosParaEnviar);

})};



document.getElementById('valor').addEventListener('keydown', () => {

    const valorInserido = document.getElementById('valor').value;
    console.log('oi')
    if (valorInserido > 99999999.99){
        alert('Valor Máximo digitado');
        const inputValor = document.getElementById('valor').value = '';
    }


});


// });

async function LancamentoHoras(){

    // Pega o id do produto 
    const id = localStorage.getItem('idProduto');
    console.log(id)

    try{
        const exibirHoras = await fetch(back + `/detalhesProduto/lancamentoHoras.php?id=${id}`)

        const resposta = await exibirHoras.json();

        console.log(resposta)

        if (localStorage.getItem('cargo') == 'tec'){
 // PESSOAS

 if (resposta['horaTotalPessoa'] == undefined){
    document.querySelector('#horasPessoa').value = localStorage.getItem('tempoPessoa');
} else {
    document.querySelector('#horasPessoa').value = resposta['horaTotalPessoa'];
}

// verificando se existem horas acumuladas
if (resposta['horasAcumuladasPessoa'] == undefined){
    document.querySelector("#horasPessoaAcumuladas").value = 0;
} else {
    document.querySelector("#horasPessoaAcumuladas").value = resposta['horasAcumuladasPessoa'];
}

// MAQUINAS

if (localStorage.getItem('tempoMaquina') != 0){
    if (resposta['horaTotalMaquina'] == undefined){
        document.querySelector('#horasMaquina').value = localStorage.getItem('tempoMaquina');
    } else {
        document.querySelector('#horasMaquina').value = resposta['horaTotalMaquina'];
    }

    if(resposta['horasAcumuladasMaquina'] == undefined){
        document.querySelector("#horasMaquinaAcumuladas").value = 0;
    } else {
        document.querySelector("#horasMaquinaAcumuladas").value = resposta['horasAcumuladasMaquina'];
    }
}





        } else {
            if (resposta['horasAcumuladasPessoa'] == undefined){
                document.querySelector("#horasPessoaAcumuladasCoor").value = 0;
            } else {
                document.querySelector("#horasPessoaAcumuladasCoor").value = resposta['horasAcumuladasPessoa'];
            }

            if (resposta['horasAcumuladasMaquina'] == undefined){
                document.querySelector("#horasMaquinaAcumuladasCoor").value = 0;
            } else {
                document.querySelector("#horasMaquinaAcumuladasCoor").value = resposta['horasAcumuladasMaquina'];
            }
        }


        if(localStorage.getItem('cargo') == 'tec'){
            const horasRestantes = 10 - resposta.horasDiariasPessoas;
            const horasRestantesMaquina = 10 - resposta.horasDiariasMaquina;
    
            console.log(resposta.horasDiariasPessoas);
    
            const opcoesHoraPessoa = document.getElementById('horaPessoaDiaria');
            const opcoesHoraMaquina = document.getElementById('horaMaquinaDiaria');
    
            opcoesHoraPessoa.innerHTML = ''; // Limpe as opções existentes em ambos os select
            if (localStorage.getItem('tempoMaquina') != 0){
                opcoesHoraMaquina.innerHTML = '';
            }
    
            if (horasRestantes == 0) {
                let option = document.createElement('option');
                option.classList.add('bg-body');
                option.value = 0;
                option.textContent = 0;
                opcoesHoraPessoa.appendChild(option);
            } else {
                for (let i = -1; i < horasRestantes; i++) {
                    let option = document.createElement('option');
                    option.classList.add('bg-body');
                    option.value = i + 1;
                    option.textContent = i + 1;
                    opcoesHoraPessoa.appendChild(option);
                }
            }
    
            if (localStorage.getItem('tempoMaquina') != 0){
                if (horasRestantesMaquina == 0) {
                    let option = document.createElement('option');
                    option.classList.add('bg-body');
                    option.value = 0;
                    option.textContent = 0;
                    opcoesHoraMaquina.appendChild(option);
                } else {
                    for (let i = -1; i < horasRestantesMaquina; i++) {

            if (horasRestantesMaquina == 0) {
                let option = document.createElement('option');
                option.classList.add('bg-body');
                option.value = 0;
                option.textContent = 0;
                opcoesHoraMaquina.appendChild(option);
            

            } else {
               
                    for (let i = 0; i < horasRestantesMaquina; i++) {
                        let option = document.createElement('option');
                        option.classList.add('bg-body');
                        option.value = i + 1;
                        option.textContent = i + 1;
                        opcoesHoraMaquina.appendChild(option);
                    
                }
                console.log(horasRestantesMaquina)
            }

            if (horasRestantes == 0){
                document.querySelector('#salvarHoras').disabled = true;
            }
        }
    }catch (error) {
        console.error(error)
    }

}

if (localStorage.getItem('cargo') == 'tec'){
    const salvarHoras = document.getElementById('salvarHoras').addEventListener('click', async () => {
        const id = localStorage.getItem('idProduto');
        const nifPerfil = localStorage.getItem('nifPerfil');

        const horaPessoaDiaria = document.getElementById('horaPessoaDiaria').value;
        if(localStorage.getItem('tempoMaquina') != 0){
            var horaMaquinaDiaria = document.getElementById('horaMaquinaDiaria').value;
        } else {
            var horaMaquinaDiaria = 0;
        }

        console.log(horaMaquinaDiaria + ' horas')
        console.log(horaPessoaDiaria + ' horas')

        const dados = {
            nifPerfil: nifPerfil,
            id: id,
            horaPessoaDiaria: horaPessoaDiaria,
            horaMaquinaDiaria: horaMaquinaDiaria
        };

        console.log(dados);

        try {
            const requisicao = await fetch(back + `/detalhesProduto/salvarLancamentoHoras.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });

            const resposta = await requisicao.json();
            // Faça algo com a resposta, se necessário.
            console.log(resposta)
            localStorage.setItem('status', resposta.status);
            localStorage.setItem('mensagem', resposta.mensagem);

            if (resposta.status == 'error'){
                alertas();
            } else {
                window.location.href = '/frontend/pages/perfil/index.html';
            }
        
        
        } catch (error) {
            console.error(error);
            // Trate o erro adequadamente, se necessário.
        }
})};





/////////////////////////////


