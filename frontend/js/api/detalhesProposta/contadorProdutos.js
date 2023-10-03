// RETORNA QUANTOS PRODUTOS ESTAO CADASTRADOS NA PROPOSTA E QUANTOS ESTÃO CONCLUIDOS
export default function contadorProdutos(e){

    // SE TIVER ALGUM PRODUTO CADASTRADO SERA MOSTRADO A QUANTIDADE DO TOTAL E DOS CONCLUIDOS
    if(e.length > 0){
        document.querySelector('#contadorProdutos').classList.remove('hidden')
        document.querySelector('#contadorProdutos').classList.add('flex')
        document.querySelector('#quantProduto').classList.add('hidden')
    }else{
        document.querySelector('#contadorProdutos').classList.add('hidden')
        document.querySelector('#contadorProdutos').classList.remove('flex')
        document.querySelector('#quantProduto').classList.remove('hidden')
    }
}