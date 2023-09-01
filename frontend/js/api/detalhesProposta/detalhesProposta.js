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
        const TelaNomeProposta = document.querySelector('#nomeProposta').innerHTML = resposta['TituloProposta'] 
        const cnpj = document.querySelector('#cnpj').value = resposta['cnpj'];
        const uniCriadora= document.querySelector('#uniCriadora').value = resposta['uniCriadora'];
        const titleUniCriadora = document.querySelector('#uniCriadora').title = resposta['uniCriadora']
        const empresa = document.querySelector('#empresa').value = resposta['empresa'];
        const statusProposta = document.querySelector('#statusProposta').value = resposta['statusProposta'];
        const criadorProposta = document.querySelector('#criadorProposta').value = resposta['criadorProposta'];
        const numeroSGSET = document.querySelector('#numeroSGSET').value = resposta['numeroSGSET'];
        const dataPrimeiroProduto = document.querySelector('#dataPrimeiroProduto').value = resposta['dataPrimeiroProduto'];
        const dataUltimoProduto = document.querySelector('#dataUltimoProduto').value = resposta['dataUltimoProduto'];
        const valorTotalProdutos = document.querySelector('#valorTotalProdutos').value = resposta['valorTotalProdutos'];
        const primeiroGerente = document.querySelector('#primeiroGerente').value = resposta['Gerentes'][0]['Nome'];  
        const funil = document.querySelector('#funil').value = resposta['funil'];
        const nomeContato = document.querySelector('#nomeContato').value = resposta['nomeContato'];
        const emailContato = document.querySelector('#emailContato').value = resposta['emailContato'];
        const numeroContato = document.querySelector('#numeroContato').value = resposta['numeroContato'];

        // const segundoGerente = resposta['Gerente'][1]['Nome'];

        // if(segundoGerente != null){
        //     document.querySelector('#segundoGerente').value = resposta['Gerentes'][1]['Nome'];
        // } else {
        //     document.querySelector('#segundoGerente').value = 'Por enquanto, não há segundo gerente'

        // }
        const segundoGerente = document.querySelector('#segundoGerente').value = resposta['Gerentes'][1]?.['Nome'] || '';

        
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
    const nomeContato = document.querySelector('#nomeContato').value;
    const emailContato = document.querySelector('#emailContato').value;
    const numeroContato = document.querySelector('#numeroContato').value; 
   
    // validarCNPJ(cnpj)
    
    // // Função para fazer o cálculo do CNPJ
    // function validarCNPJ(cnpj) {

    //     // Verificar se o CNPJ possui 14 dígitos após a remoção dos não numéricos
    //     if (cnpj.length !== 14) {
    //     return false;
    //     }
    
    //     // Calcular o primeiro dígito verificador
    //     for(let digito = 0; digito < 2; digito++) {

    //         let sum = 0; let num = 0;

    //         for (let i = 5 + digito; i > 1; i--) {
    //         sum += parseInt(cnpj[num]) * i;
    //         num++;
    //         }

    //         for (let i = 9; i > 1; i--) {
    //             sum += parseInt(cnpj[num]) * i;
    //             num++;
    //         }

    //         // Definição dos digitos validos
    //         if (digito == 0) {

    //             digito1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    //         } else {

    //             digito2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    //         }
    //     }
        
    //     if (parseInt(cnpj[12]) !== digito1 || parseInt(cnpj[13]) !== digito2) {
    //         console.log("Falhou")
        
    //     } else {
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
    //     }
  
    // }
    
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
