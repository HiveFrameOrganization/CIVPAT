import { back } from "../Rotas/rotas.js";
import { autenticacao } from '../login/autenticacao.js';

export default async function selecionarGerente(id) {
    const autenticado = await autenticacao(['adm', 'coor', 'ger'], false)
    if(!autenticado){
        return;
    }

    // Requisição com parâmetro para buscar a proposta pelo id
    const requisicao = await fetch(back + `/detalhesProposta/detalhesProposta.php?id=${id}`)

    const resposta = await requisicao.json();

    // MOSTRA QUANTIDADE DE PRODUTOS CONCLUIDOS
    document.querySelector('#produtoConcluido').innerHTML = resposta.produtosConcluidos
    
    const gerente1 = document.querySelector('#primeiroGerente');
    const gerente2 = document.querySelector('#segundoGerente');
    const gerentes = [gerente1, gerente2]
    
    for (var k = 0; k < resposta['Gerentes'].length; k++) {
        for (var j = 0; j < gerentes[k].options.length; j++) {
            if (gerentes[k].options[j].value == resposta['Gerentes'][k]['fk_nifGerente']) {
                gerentes[k].options[j].selected = true;
                break; // Saia do loop após encontrar a opção desejada
            }
        }
    }
}