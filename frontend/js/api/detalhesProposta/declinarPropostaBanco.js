import { back } from "../Rotas/rotas.js";

export default async function declinarPropostaBanco(){
    const botaoDeclinar = document.getElementById('declinarProposta');
    const idProposta = localStorage.getItem('idProposta');
    const tipoDeclinio = (botaoDeclinar.value == 'DECLINAR') ? 'Declinado' : 'Solicitação de Declinio';
    

    // criando uma variável para enviar a lista para o php, transformando o string em objeto json
    const requisicao = await fetch(back + `/detalhesProposta/declinarProposta.php?id=${idProposta}&tipoDeclinio=${tipoDeclinio}`);

    const resposta = await requisicao.json();

    localStorage.setItem('status', resposta.status);
    localStorage.setItem('mensagem', resposta.mensagem);

    if (resposta.status == 'error'){
        alertas();
    }

    window.location.href = '/frontend/pages/Home/index.html';


}