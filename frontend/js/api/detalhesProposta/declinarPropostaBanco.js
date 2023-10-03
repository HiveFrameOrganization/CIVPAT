import { back } from "../Rotas/rotas.js";

export default async function declinarPropostaBanco(){
    const idProposta = localStorage.getItem('idProposta');
    

    // criando uma variável para enviar a lista para o php, transformando o string em objeto json
    const requisicao = await fetch(back + `/detalhesProposta/declinarProposta.php?id=${idProposta}`);

    const resposta = await requisicao.json();

    localStorage.setItem('status', resposta.status);
    localStorage.setItem('mensagem', resposta.mensagem);

    if (resposta.status == 'error'){
        alertas();
    }

    window.location.href = '/frontend/pages/Home/index.html';


}