// Ao carregar a pagina essa função irá pegar o id do local Storage para verificar no banco e trazer as informações
window.addEventListener('load', () => {
     const idProposta = localStorage.getItem('idProposta');
   

    // Levar o valor do id do local Storage atravez da função para o back end
    verificarBancoProposta(idProposta);
    verificarPdfExistente(idProposta);

})


// Fução para fazer a requisição no back end dos dados
async function verificarBancoProposta(id){
    try{

        // Requisição com parâmetro para buscar a proposta pelo id
        const requisicao = await fetch(`http://localhost:8080/backend/php/detalhesProposta/detalhesProposta.php?id=${id}`)
        

        const resposta = await requisicao.json()
        // console.log(resposta)

        //Enviando para o front end os dados vindos do back end
        const nomeProposta = document.querySelector('#nomeProposta').value = resposta['nomeProposta']; 
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
        const requisicao = await fetch(`../../../backend/php/pdf/verificarPdfExistente.php?id=${idProposta}`)

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

function salvarPdf() {

    // Pegar o id da proposta salvo no localstorage
    identificador = localStorage.getItem('idProposta');

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
    fetch(`../../../backend/php/pdf/salvarPdf.php?id=${identificador}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {

        verificarPdfExistente(identificador);
    })
    .catch(error => {
        console.error('Erro ao salvar o PDF:', error);
    });


}


function baixarPdf (tipoPdf) {

    const idProposta = localStorage.getItem('idProposta');

    // Caminho para o arquivo PHP que busca o PDF no banco de dados.
    const url = `../../../backend/php/pdf/baixarPdf.php?id=${idProposta}&tipoPdf=${tipoPdf}`;

    // Faça a requisição usando fetch.
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
        //Crie um URL temporário para o blob do PDF.
        const urlPdf = URL.createObjectURL(blob);

        console.log(urlPdf);

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
editandoProposta.addEventListener('click', (evento) =>{


    //Pegando os valores dos input's para transformalos em objeto
    const nomeProposta = document.querySelector('#nomeProposta').value;
    const cnpj = document.querySelector('#cnpj').value;
    const uniCriadora= document.querySelector('#uniCriadora').value;
    const empresa = document.querySelector('#empresa').value;
    const statusProposta = document.querySelector('#statusProposta').value;
    const gerenteProposta = document.querySelector('#gerenteProposta').value;
    const numeroSGSET = document.querySelector('#numeroSGSET').value;
    const dataPrimeiroProduto = document.querySelector('#dataPrimeiroProduto').value;
    const dataUltimoProduto = document.querySelector('#dataUltimoProduto').value;
    const valorTotalProdutos = document.querySelector('#valorTotalProdutos').value;



// Criando um objeto com os dados dos input's
    const detalhesProposta = {
        nomeProposta : nomeProposta,
        cnpj :  cnpj,
        uniCriadora :uniCriadora,
        empresa : empresa,
        statusProposta : statusProposta ,
        gerenteProposta : gerenteProposta ,
        numeroSGSET : numeroSGSET,
        dataPrimeiroProduto : dataPrimeiroProduto,
        dataUltimoProduto : dataUltimoProduto,
        valorTotalProdutos : valorTotalProdutos

    }
    
    // Enviando o objeto para o back end
    postarDetalhesBanco(detalhesProposta);

    

});

async function postarDetalhesBanco(postDetalhes){

    try{

        const requisicao = await fetch('http://localhost:8080/backend/php/detalhesProposta/postDetalhesProposta.php',{
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

