import contadorProdutos from './contadorProdutos.js';
import exibirProdutos from "./exibirProdutos.js";
import { back } from "../Rotas/rotas.js";

export default async function carregarProdutos(idProposta) {
    try {
        // Cria a requisição 
        const requisicao = await fetch(back + `/detalhesProposta/carregarProdutos.php?id=${idProposta}`)


        // Verificando se deu erro ao fazer a requisição
        if (!requisicao.ok) {
            throw new Error('Erro na requisição');
        }

        // recebe a resposta do servidor
        const resposta = await requisicao.json();

       
        // console.log(resposta.produtos)
        exibirProdutos(resposta.produtos);
        // MOSTRADNDO QUANTOS PRODUTOS ESTAO CADASTRADOS NO TOTAL
        document.querySelector('#produtoTotal').innerHTML = resposta.produtos.length
        contadorProdutos(resposta.produtos)
    
    } catch (error) {
        console.error(error)
    }
}
