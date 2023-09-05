import { back } from '../Rotas/rotas.js'
// Ao carregar a pagina essa função irá pegar o id do local Storage para verificar no banco e trazer as informações
window.addEventListener('load', () => {
    const idProposta = localStorage.getItem('idProposta');

    // Levar o valor do id do local Storage atravez da função para o back end
    verificarBancoProposta(idProposta);
    verificarPdfExistente(idProposta);
    carregarProdutos(idProposta);
    pegarUnidadesCriadoras();
    
})

const botaoSalvarPdf = document.getElementById('botaoSalvarPdf');

botaoSalvarPdf.addEventListener('click', () => {
    // Pegar o id da proposta salvo no localstorage
    const identificador = localStorage.getItem('idProposta');

    // Obter o arquivo PDF selecionado pelo usuário
    const pdfOrcamento = document.getElementById('orcamento').files[0];
    const pdfPropostaAssinada = document.getElementById('propostaAssinada').files[0];
    const pdfRelatorioFinal = document.getElementById('relatorioFinal').files[0];
    const pdfPesquisaDeSatisfacao = document.getElementById('pesquisaDeSatisfacao').files[0];

    // Criar um objeto FormData e adicionar o arquivo PDF a ele
    //formdata serve para mandar dados e arquivos facilmente por via api
    //usado para enviar dados do cliente para o servidor, especialmente 
    //quando se envia um formulário HTML através de uma requisição AJAX
    var formData = new FormData();

    //inserindo o pdf dentro do objeto formdata
    formData.append('pdfOrcamento', pdfOrcamento);
    formData.append('pdfPropostaAssinada', pdfPropostaAssinada);
    formData.append('pdfRelatorioFinal', pdfRelatorioFinal);
    formData.append('pdfPesquisaDeSatisfacao', pdfPesquisaDeSatisfacao);

    // formData.forEach((valor, chave) => {
    //     console.log(`${chave}: ${valor}`);
    //   });

    // Enviar o formulário como uma solicitação POST usando fetch
    fetch(back + `/pdf/salvarPdf.php?id=${identificador}`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(json => {

            localStorage.setItem('status', json.status);
            localStorage.setItem('mensagem', json.mensagem);
            alertas();

            verificarPdfExistente(identificador);
        })
        .catch(error => {
            console.error('Erro ao salvar o PDF:', error);
        });
})

const botaoOrcamento = document.getElementById('botaoOrcamento');
botaoOrcamento.addEventListener('click', () => {
    baixarPdf(1);
});

const botaoPropostaAssinada = document.getElementById('botaoPropostaAssinada');
botaoPropostaAssinada.addEventListener('click', () => {
    baixarPdf(2)
});

const botaoRelatorioFinal = document.getElementById('botaoRelatorioFinal');
botaoRelatorioFinal.addEventListener('click', () => {
    baixarPdf(3)
});

const botaoPesquisaDeSatisfacao = document.getElementById('botaoPesquisaDeSatisfacao');
botaoPesquisaDeSatisfacao.addEventListener('click', () => {
    baixarPdf(4)
});

async function selecionarGerente(id) {

    // Requisição com parâmetro para buscar a proposta pelo id
    const requisicao = await fetch(back + `/detalhesProposta/detalhesProposta.php?id=${id}`)


    const resposta = await requisicao.json();

    const gerente1 = document.querySelector('#primeiroGerente');
    const gerente2 = document.querySelector('#segundoGerente');
    const gerentes = [gerente1, gerente2]

    // // Percorra as opções do <select> para encontrar a que corresponde ao valor desejado
    // for (var i = 0; i < gerente1.options.length; i++) {
    //     if (gerente1.options[i].value == resposta['Gerentes'][0]['fk_nifGerente']) {
    //         gerente1.options[i].selected = true;
    //         break; // Saia do loop após encontrar a opção desejada
    //     }
    // } 

    // for (var j = 0; j < gerente2.options.length; j++) {
    //     if (gerente2.options[j].value == resposta['Gerentes'][1]['fk_nifGerente']) {
    //         gerente2.options[j].selected = true;
    //         break; // Saia do loop após encontrar a opção desejada
    //     }
    // }

    for (var k = 0; k < resposta['Gerentes'].length; k++) {
        for (var j = 0; j < gerentes[k].options.length; j++) {
            if (gerentes[k].options[j].value == resposta['Gerentes'][k]['fk_nifGerente']) {
                gerentes[k].options[j].selected = true;
                break; // Saia do loop após encontrar a opção desejada
            }
        }
    }
}

// Fução para fazer a requisição no back-end dos dados
async function verificarBancoProposta(id) {
    try {

        // Requisição com parâmetro para buscar a proposta pelo id
        const requisicao = await fetch(back + `/detalhesProposta/detalhesProposta.php?id=${id}`)


        const resposta = await requisicao.json();

        console.log(resposta);

        // loop para criar variáveis no localstorage que guardam os nifs dos gerentes para a comparação
        // na hora do update
        for (var x = 0; x < resposta['Gerentes'].length; x++){
            localStorage.setItem('gerente1', resposta['Gerentes'][x]['NIF']);
        }


        carregarTecnicos();
        
       
        
        //Enviando para o front-end os dados vindos do back end
        const nomeProposta = document.querySelector('#tituloProposta').value = resposta['TituloProposta'];
        const TelaNomeProposta = document.querySelector('#nomeProposta').innerHTML = resposta['TituloProposta']
        const cnpj = document.querySelector('#cnpj').value = resposta['cnpj'];
        const uniCriadora = document.querySelector('#uniCriadora').value = resposta['uniCriadora'];
        const titleUniCriadora = document.querySelector('#uniCriadora').title = resposta['uniCriadora']
        const empresa = document.querySelector('#empresa').value = resposta['empresa'];
        const statusProposta = document.querySelector('#statusProposta').value = resposta['statusProposta'];
        const criadorProposta = document.querySelector('#criadorProposta').value = resposta['criadorProposta'];
        const numeroSGSET = document.querySelector('#numeroSGSET').value = resposta['numeroSGSET'];
        const dataPrimeiroProduto = document.querySelector('#dataPrimeiroProduto').value = resposta['dataPrimeiroProduto'];
        const dataUltimoProduto = document.querySelector('#dataUltimoProduto').value = resposta['dataUltimoProduto'];
        const valorTotalProdutos = document.querySelector('#valorTotalProdutos').value = resposta['valorTotalProdutos'];
        document.querySelector('#funil').value = resposta['StatusFunil'];
        // const primeiroGerente = document.querySelector('#primeiroGerente').value = resposta['Gerentes'][0]['Nome']; 
        const nomeContato = document.querySelector('#nomeContato').value = resposta['nomeContato'];
        const emailContato = document.querySelector('#emailContato').value = resposta['emailContato'];
        const numeroContato = document.querySelector('#numeroContato').value = resposta['numeroContato'];
        // const segundoGerente = document.querySelector('#segundoGerente').value = resposta['Gerentes'][1]?.['Nome'] || '';


    } catch (error) {
        console.error(error)
    }
}

async function verificarPdfExistente(idProposta) {

    try {
        // Cria a requisição 
        const requisicao = await fetch(back + `/PDF/verificarPdfExistente.php?id=${idProposta}`)

        // Verificando se deu erro ao fazer a requisição
        if (!requisicao.ok) {
            throw new Error('Erro na requisição');
        }

        // recebe a resposta do servidor
        const resposta = await requisicao.json();

        // Loop para verificar para cada tipo de PDF se a proposta possui aquele tipo de PDF ja salvo
        for (const chave in resposta) {
            const valor = resposta[chave];

            if (valor == true) {
                // Se o PDF do tipo for encontrado, tirará o disable do botão para baixar
                document.getElementById(chave).disabled = false;
            } else {
                // Se o PDF não for encontrado, o botão ficará em disabled
                document.getElementById(chave).disabled = true;
            }
        }
    } catch (error) {
        console.error(error)
    }

    // sumir o botão se nao ouver pdf no banco
    if (document.querySelector('#botaoOrcamento').disabled) {
        document.querySelector('.sumirOrcamento').classList.add('hidden')
    }
    if (document.querySelector('#botaoPropostaAssinada').disabled) {
        document.querySelector('.sumirPropostaAssinada').classList.add('hidden')
    }
    if (document.querySelector('#botaoRelatorioFinal').disabled) {
        document.querySelector('.sumirRelatorioFinal').classList.add('hidden')
    }
    if (document.querySelector('#botaoPesquisaDeSatisfacao').disabled) {
        document.querySelector('.sumirPesquisaDeSatisfacao').classList.add('hidden')
    }
}


function baixarPdf(tipoPdf) {

    const idProposta = localStorage.getItem('idProposta');

    // Caminho para o arquivo PHP que busca o PDF no banco de dados.
    const url = back + `/pdf/baixarPdf.php?id=${idProposta}&tipoPdf=${tipoPdf}`;

    // Faça a requisição usando fetch.
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            //Crie um URL temporário para o blob do PDF.
            const urlPdf = URL.createObjectURL(blob);

            // Crie um link <a> para abrir o PDF em uma nova guia do navegador.
            const link = document.createElement('a');
            link.href = urlPdf;
            link.target = '_blank';
            link.click();


            // Remova o URL temporário criado para o blob.
            URL.revokeObjectURL(urlPdf);

        })
        .catch(error => {
            console.error('Erro ao obter o PDF:', error);
        });
}


// function validarCNPJ(cnpj) {
//     const cnpjRecebido = cnpj;

//     const cnpjString = cnpjRecebido.toString();

//     const cnpjSemDigitosFinais = cnpjString.slice(0, -2);

//     console.log(cnpjSemDigitosFinais);


// }

function validarCNPJ(cnpj) {
    if (cnpj == ''){
        return true
    }
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');
  
    // Verificar se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
      return false;
    }
  
    // Calcular o primeiro dígito verificador
    let soma = 0;
    let peso = 2;
    for (let i = 11; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
    // Calcular o segundo dígito verificador
    soma = 0;
    peso = 2;
    for (let i = 12; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
    // Verificar se os dígitos verificadores calculados são iguais aos dígitos reais
    if (parseInt(cnpj.charAt(12)) !== digito1 || parseInt(cnpj.charAt(13)) !== digito2) {
      return false;
    }
  
    return true;
  }


const editandoProposta = document.querySelector('#editarProposta');
editandoProposta.addEventListener('click', () => {

    // Mudando estado do botão
    let estadoInput = document.querySelectorAll('.estadoInput')
    if (editandoProposta.value == 'Editar') {
        editandoProposta.value = 'Salvar'

        for (let i = 0; i < estadoInput.length; i++) {
            estadoInput[i].removeAttribute('disabled')
        }
    } else {
        salvarMudancasNaProposta();
        editandoProposta.value = 'Editar'

        for (let i = 0; i < estadoInput.length; i++) {
            estadoInput[i].setAttribute('disabled', 'true')
        }
    }


    
    if(editandoProposta.value == 'Editar'){
        const idProposta = localStorage.getItem('idProposta');
        //Pegando os valores dos input's para transformalos em objeto
        const nomeProposta = document.querySelector('#tituloProposta').value;
        const cnpj = document.querySelector('#cnpj').value;
        const cnpjString = cnpj.toString();
        const uniCriadora= document.querySelector('#uniCriadora').value;
        const empresa = document.querySelector('#empresa').value;
        const statusProposta = document.querySelector('#statusProposta').value;
        const criadorProposta = document.querySelector('#criadorProposta').value;
        const numeroSGSET = document.querySelector('#numeroSGSET').value;
        const primeiroGerente = document.querySelector('#primeiroGerente').value;
        const segundoGerente = document.querySelector('#segundoGerente').value ;
        const funil = document.querySelector('#funil').value;
        const nomeContato = document.querySelector('#nomeContato').value;
        const emailContato = document.querySelector('#emailContato').value;
        const numeroContato = document.querySelector('#numeroContato').value; 
        
        const verificacaoDoCnpj = validarCNPJ(cnpjString);
        
        console.log(verificacaoDoCnpj);
        if (verificacaoDoCnpj == false) {
            alert('CNPJ inválido');
        } else {
        // Criando um objeto com os dados dos input's
            const detalhesProposta = {
                idProposta: idProposta,
                nomeProposta : nomeProposta,
                cnpj :  cnpj,
                uniCriadora :uniCriadora,
                empresa : empresa,
                statusProposta : statusProposta ,
                criadorProposta : criadorProposta ,
                numeroSGSET : numeroSGSET,
                primeiroGerente : primeiroGerente,         
                segundoGerente : segundoGerente,          
                funil : funil,          
                nomeContato : nomeContato,          
                emailContato : emailContato,        
                numeroContato : numeroContato,          
            }
            
            // Enviando o objeto para o back end
            postarDetalhesBanco(detalhesProposta);
        }
    }
    
});

async function postarDetalhesBanco(postDetalhes) {

    try {
        const requisicao = await fetch(back + '/detalhesProposta/postDetalhesProposta.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postDetalhes)

        })

        // Verificando se deu erro ao fazer a requisição
        if (!requisicao.ok) {
            throw new Error('Erro na requisição');
        }

        const resposta = await requisicao.json()

    } catch (error) {
        console.error(error)
    }
}


async function carregarProdutos(idProposta) {
    try {
        // Cria a requisição 
        const requisicao = await fetch(back + `/detalhesProposta/carregarProdutos.php?id=${idProposta}`)

        // Verificando se deu erro ao fazer a requisição
        if (!requisicao.ok) {
            throw new Error('Erro na requisição');
        }

        // recebe a resposta do servidor
        const resposta = await requisicao.json();


        exibirProdutos(resposta.produtos);

    } catch (error) {
        console.error(error)
    }
}


async function exibirProdutos(produtos) {
    // selecionando a div dos botões
    const botoes = document.getElementById('propostas');

    // limpando os possíveis elementos que possam estar na div
    propostas.innerHTML = '';

    for (let produto of produtos) {
        // criando o botão da proposta
        const botao = document.createElement('button');

        // adicionando o valor ao botão da proposta
        botao.value = produto.idProduto;
        botao.innerHTML = produto.NomeProduto;

        botao.onclick = () => {
            localStorage.setItem('idProduto', botao.value);

            window.location.href = '../../pages/detalhesProduto/detalhesProduto.html';
        }

        botoes.appendChild(botao);

        // Adicionando uma quebra de linha entre os botões
        const quebraDeLinha = document.createElement('br');
        botoes.appendChild(quebraDeLinha);
    }
}

async function carregarTecnicos () {

    const gerente1Dropdown = document.getElementById('primeiroGerente');
    const gerente2Dropdown = document.getElementById('segundoGerente');


    const requisicao = await fetch(back + '/detalhesProposta/carregarTecnicos.php', {
        methods : 'GET'
    });

    const resposta = await requisicao.json();

    for (var i = 0; i < resposta.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.value = resposta[i + 1];
        optionElement.textContent = resposta[i];
        optionElement.classList.add("bg-body");
        gerente1Dropdown.appendChild(optionElement);

        i += 1;
    }

    for (var i = 0; i < resposta.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.value = resposta[i + 1];
        optionElement.textContent = resposta[i];
        optionElement.classList.add("bg-body");
        gerente2Dropdown.appendChild(optionElement);

        i += 1;
    }

    selecionarGerente(localStorage.getItem('idProposta'));
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

async function pegarUnidadesCriadoras() {
    
    const unidadesSelect = document.getElementById('uniCriadora');

    const requisicao = await fetch (back + '/todasPropostas/PegarUnidadesCriadoras.php');

    // dados de todas as propostar recebidas (resposta da api)
    const dados = await requisicao.json();
   

    
    // caso a requisição de um erro, irá exibir uma mensagem de erro
    if (dados.resposta === 'erro') throw new Error(dados.message);

    for (let i = 0; i < dados.length; i++) {
        let option = document.createElement('option');
        option.value = dados[i].idUnidadeCriadora;
        option.textContent = dados[i].UnidadeCriadora;
        option.classList.add("bg-body");
        unidadesSelect.appendChild(option);
    }

    selecionarUnidadeCriadora(localStorage.getItem('idProposta'));

}


async function salvarMudancasNaProposta() {
    const idProposta = localStorage.getItem('idProposta');

    //Pegando os valores dos input's para transformalos em objeto
    const nomeProposta = document.querySelector('#tituloProposta').value;
    const statusProposta = document.querySelector('#statusProposta').value;
    const criadorProposta = document.querySelector('#criadorProposta').value;
    const cnpj = document.querySelector('#cnpj').value;
    const cnpjString = cnpj.toString();
    const empresa = document.querySelector('#empresa').value;
    const uniCriadora= document.querySelector('#uniCriadora').value;
    const dataInicio = document.querySelector('#dataPrimeiroProduto').value;
    const dataFim = document.querySelector('#dataUltimoProduto').value;
    const valor = document.querySelector('#valorTotalProdutos').value;
    const funil = document.querySelector('#funil').value;
    const primeiroGerente = document.querySelector('#primeiroGerente').value;
    const segundoGerente = document.querySelector('#segundoGerente').value ;
    const numeroSGSET = document.querySelector('#numeroSGSET').value;
    const nomeContato = document.querySelector('#nomeContato').value;
    const emailContato = document.querySelector('#emailContato').value;
    const numeroContato = document.querySelector('#numeroContato').value; 

    var verificacaoDoCnpj = validarCNPJ(cnpjString);

    if (verificacaoDoCnpj == false) {
        alert('CNPJ inválido');
    } else {
        const dados = {
            idProposta: idProposta,
            nomeProposta :(nomeProposta == '') ? null : nomeProposta,
            statusProposta: (statusProposta == '') ? null : statusProposta,
            criadorProposta: (criadorProposta == '') ? null : criadorProposta,
            cnpj: (cnpjString == '') ? null : cnpjString,
            empresa: (empresa == '') ? null : empresa,
            uniCriadora: (uniCriadora == '') ? null : uniCriadora,
            dataInicio: (dataInicio == '') ? null : dataInicio,
            dataFim: (dataFim == '') ? null : dataFim,
            valor: (valor == '') ? null : valor,
            funil: (funil == '') ? null : funil,
            primeiroGerenteAntigo: localStorage.getItem('gerente1'),
            segundoGerenteAntigo : localStorage.getItem('gerente2'),
            primeiroGerenteNovo : (primeiroGerente == '') ? null : primeiroGerente,
            segundoGerenteNovo : (segundoGerente == '') ? null : segundoGerente,
            numeroSGSET: (numeroSGSET == '') ? null : numeroSGSET,
            nomeContato:(nomeContato== '' )?null:nomeContato ,
            emailContato: (emailContato == '') ? null : emailContato,
            numeroContato: (numeroContato == '') ? null : numeroContato
        }

        const requisicao = await fetch(back + '/detalhesProposta/postDetalhesProposta.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(dados)
        })

        const resposta = await requisicao.json();

        console.log(resposta);
    }
}
