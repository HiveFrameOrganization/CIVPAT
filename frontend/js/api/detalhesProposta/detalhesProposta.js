import { back } from '../Rotas/rotas.js'
// Ao carregar a pagina essa função irá pegar o id do local Storage para verificar no banco e trazer as informações
window.addEventListener('load', () => {
     const idProposta = localStorage.getItem('idProposta');
   
    // Levar o valor do id do local Storage atravez da função para o back end
    verificarBancoProposta(idProposta);
    verificarPdfExistente(idProposta);
    carregarProdutos(idProposta);
    carregarTecnicos();

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
} );

const botaoPropostaAssinada = document.getElementById('botaoPropostaAssinada');
botaoPropostaAssinada.addEventListener('click', () => {
    baixarPdf(2)
} );

const botaoRelatorioFinal = document.getElementById('botaoRelatorioFinal');
botaoRelatorioFinal.addEventListener('click', () => {
    baixarPdf(3)
});

const botaoPesquisaDeSatisfacao = document.getElementById('botaoPesquisaDeSatisfacao');
botaoPesquisaDeSatisfacao.addEventListener('click', () => {
    baixarPdf(4)
});

// Fução para fazer a requisição no back-end dos dados
async function verificarBancoProposta(id){
    try{

        // Requisição com parâmetro para buscar a proposta pelo id
        const requisicao = await fetch(back + `/detalhesProposta/detalhesProposta.php?id=${id}`)
        

        const resposta = await requisicao.json()
        console.log(resposta)

        //Enviando para o front-end os dados vindos do back end
        const nomeProposta = document.querySelector('#tituloProposta').value = resposta['TituloProposta']; 
        const TelaNomeProposta = document.querySelector('#nomeProposta').innerHTML = resposta['TituloProposta'] 
        const cnpj = document.querySelector('#cnpj').value = resposta['cnpj'];
        const uniCriadora= document.querySelector('#uniCriadora').value = resposta['uniCriadora'];
        const titleUniCriadora = document.querySelector('#uniCriadora').title = resposta['uniCriadora']
        const empresa = document.querySelector('#empresa').value = resposta['empresa'];
        const statusProposta = document.querySelector('#statusProposta').value = resposta['statusProposta'];
        // const criadorProposta = document.querySelector('#criadorProposta').value = resposta['criadorProposta'];
        const numeroSGSET = document.querySelector('#numeroSGSET').value = resposta['numeroSGSET'];
        const dataPrimeiroProduto = document.querySelector('#dataPrimeiroProduto').value = resposta['dataPrimeiroProduto'];
        const dataUltimoProduto = document.querySelector('#dataUltimoProduto').value = resposta['dataUltimoProduto'];
        const valorTotalProdutos = document.querySelector('#valorTotalProdutos').value = resposta['valorTotalProdutos'];
        const primeiroGerente = document.querySelector('#primeiroGerente').value = resposta['Gerentes'][0]['Nome']; 
        // const segundoGerente = document.querySelector('#segundoGerente').value = resposta['Gerentes'][1]['Nome'];
        const funil = document.querySelector('#funil').value = resposta['funil'];
        const momeContato = document.querySelector('#momeContato').value = resposta['momeContato'];
        const emailContato = document.querySelector('#emailContato').value = resposta['emailContato'];
        const numeroContato = document.querySelector('#numeroContato').value = resposta['numeroContato'];

        
    } catch (error){
        console.error(error)
    } 
}

async function verificarPdfExistente(idProposta){

    try{
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

            if (valor == true){
                // Se o PDF do tipo for encontrado, tirará o disable do botão para baixar
                document.getElementById(chave).disabled = false;
                console.log(chave)
            } else {
                // Se o PDF não for encontrado, o botão ficará em disabled
                document.getElementById(chave).disabled = true;
                console.log(chave)
            }
        }    
    }catch(error){
        console.error(error)
    }

    // sumir o botão se nao ouver pdf no banco
    if(document.querySelector('#botaoOrcamento').disabled){
        document.querySelector('.sumirOrcamento').classList.add('hidden')
    }
    if(document.querySelector('#botaoPropostaAssinada').disabled){
        document.querySelector('.sumirPropostaAssinada').classList.add('hidden')
    }
    if(document.querySelector('#botaoRelatorioFinal').disabled){
        document.querySelector('.sumirRelatorioFinal').classList.add('hidden')
    }
    if(document.querySelector('#botaoPesquisaDeSatisfacao').disabled){
        document.querySelector('.sumirPesquisaDeSatisfacao').classList.add('hidden')
    }
}


function baixarPdf (tipoPdf) {

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
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');
  
    // Verificar se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
      return false;
    }
  
    // Verificar se todos os dígitos são iguais (números repetidos não são válidos)
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }
  
    // Calcular o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * (13 - i);
    }
    soma = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    if (parseInt(cnpj.charAt(12)) !== soma) {
      return false;
    }
  
    // Calcular o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * (14 - i);
    }
    soma = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    if (parseInt(cnpj.charAt(13)) !== soma) {
      return false;
    }
  
    return true;
  }




const editandoProposta = document.querySelector('#editarProposta');
editandoProposta.addEventListener('click', () =>{

    // Mudando estado do botão
    let estadoInput = document.querySelectorAll('.estadoInput')
    if(editandoProposta.value == 'Editar'){
        editandoProposta.value = 'Salvar'

        for (let i = 0; i < estadoInput.length; i++) {
            estadoInput[i].removeAttribute('disabled')
        }
    }else{
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
        const uniCriadora= document.querySelector('#uniCriadora').value;
        const empresa = document.querySelector('#empresa').value;
        const statusProposta = document.querySelector('#statusProposta').value;
        const criadorProposta = document.querySelector('#criadorProposta').value;
        const numeroSGSET = document.querySelector('#numeroSGSET').value;
        const primeiroGerente = document.querySelector('#primeiroGerente').value;
        const segundoGerente = document.querySelector('#segundoGerente').value ;
        const funil = document.querySelector('#funil').value;
        const momeContato = document.querySelector('#momeContato').value;
        const emailContato = document.querySelector('#emailContato').value;
        const numeroContato = document.querySelector('#numeroContato').value; 
        
        const verificacaoDoCnpj = validarCNPJ(cnpj);
        
            
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
                momeContato : momeContato,          
                emailContato : emailContato,        
                numeroContato : numeroContato,          
            }
            
            // Enviando o objeto para o back end
            postarDetalhesBanco(detalhesProposta);
        }
    }
    
});

async function postarDetalhesBanco(postDetalhes){

    try{
        const requisicao = await fetch(back + '/detalhesProposta/postDetalhesProposta.php',{
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
        
    }catch(error){
        console.error(error)
    }
}


async function carregarProdutos(idProposta) {
    try{
        // Cria a requisição 
        const requisicao = await fetch(back + `/detalhesProposta/carregarProdutos.php?id=${idProposta}`)

        // Verificando se deu erro ao fazer a requisição
        if (!requisicao.ok) {
            throw new Error('Erro na requisição');
        }

        // recebe a resposta do servidor
        const resposta = await requisicao.json();

        console.log(resposta);
        
        exibirProdutos(resposta.produtos);

    }catch(error){
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


    const requisicao = await fetch(back + '/cadastroProduto/carregarTecnicos.php', {
        methods : 'GET'
    });

    const resposta = await requisicao.json();

    for (var i = 0; i < resposta.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.value = resposta[i + 1];
        optionElement.textContent = resposta[i];
        gerente1Dropdown.appendChild(optionElement);

        i += 1;
    }

    for (var i = 0; i < resposta.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.value = resposta[i + 1];
        optionElement.textContent = resposta[i];
        gerente2Dropdown.appendChild(optionElement);

        i += 1;
    }
}