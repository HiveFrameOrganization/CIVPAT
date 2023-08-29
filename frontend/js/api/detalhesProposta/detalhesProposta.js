import { back } from '../Rotas/rotas.js'
// Ao carregar a pagina essa função irá pegar o id do local Storage para verificar no banco e trazer as informações
window.addEventListener('load', () => {
     const idProposta = localStorage.getItem('idProposta');
   
    // Levar o valor do id do local Storage atravez da função para o back end
    verificarBancoProposta(idProposta);
    verificarPdfExistente(idProposta);
    carregarProdutos(idProposta);

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
        const cnpj = document.querySelector('#cnpj').value = resposta['cnpj'];
        const uniCriadora= document.querySelector('#uniCriadora').value = resposta['uniCriadora'];
        const empresa = document.querySelector('#empresa').value = resposta['empresa'];
        const statusProposta = document.querySelector('#statusProposta').value = resposta['statusProposta'];
        const gerenteProposta = document.querySelector('#gerenteProposta').value = resposta['gerenteProposta'];
        const numeroSGSET = document.querySelector('#numeroSGSET').value = resposta['numeroSGSET'];
        const dataPrimeiroProduto = document.querySelector('#dataPrimeiroProduto').value = resposta['dataPrimeiroProduto'];
        const dataUltimoProduto = document.querySelector('#dataUltimoProduto').value = resposta['dataUltimoProduto'];
        const valorTotalProdutos = document.querySelector('#valorTotalProdutos').value = resposta['valorTotalProdutos'];
        
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
            } else {
                // Se o PDF não for encontrado, o botão ficará em disabled
                document.getElementById(chave).disabled = true;
            }
        }    
    }catch(error){
        console.error(error)
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


const editandoProposta = document.querySelector('#editarProposta');
editandoProposta.addEventListener('click', () =>{

    const idProposta = localStorage.getItem('idProposta');

    //Pegando os valores dos input's para transformalos em objeto
    const nomeProposta = document.querySelector('#nomeProposta').value;
    const cnpj = document.querySelector('#cnpj').value;
    const uniCriadora= document.querySelector('#uniCriadora').value;
    const empresa = document.querySelector('#empresa').value;
    const statusProposta = document.querySelector('#statusProposta').value;
    const gerenteProposta = document.querySelector('#gerenteProposta').value;
    const numeroSGSET = document.querySelector('#numeroSGSET').value;
   

// Criando um objeto com os dados dos input's
    const detalhesProposta = {
        idProposta: idProposta,
        nomeProposta : nomeProposta,
        cnpj :  cnpj,
        uniCriadora :uniCriadora,
        empresa : empresa,
        statusProposta : statusProposta ,
        gerenteProposta : gerenteProposta ,
        numeroSGSET : numeroSGSET
    }
    
    // Enviando o objeto para o back end
    postarDetalhesBanco(detalhesProposta);
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