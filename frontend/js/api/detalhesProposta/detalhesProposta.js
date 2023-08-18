// Ao carregar a pagina essa função irá pegar o id do local Storage para verificar no banco e trazer as informações
window.addEventListener('load', () => {
     const idProposta = localStorage.getItem('idProposta');
   

    // Levar o valor do id do local Storage atravez da função para o back end
    verificarBancoProposta(idProposta);

})


// Fução para fazer a requisição no back end dos dados
async function verificarBancoProposta(id){6
    try{

        // Requisição com parâmetro para buscar a proposta pelo id
        const requisicao = await fetch(`http://localhost:8080/backend/php/detalhesProposta/detalhesProposta.php?id=${id}`)
        

        const resposta = await requisicao.json()
        console.log(resposta)

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
        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        const resposta = await requisicao.json()
        console.log(resposta)
        
    }catch(error){
        console.error(error)

    }


}

