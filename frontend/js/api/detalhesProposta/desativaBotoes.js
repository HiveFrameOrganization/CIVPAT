import { editandoProposta } from "./detalhesProposta.js"

// DESATIVA BOTÃO DE EDITAR E NOVO PRODUTO QUANDO NAO ESTA MAIS EM ANALISE
export default function desativaBotoes(){

    // Botões 
    const btnDeclinar = document.querySelector('#declinarProposta');
    const btnAceitar = document.querySelector('#aceitarProposta');
    const btnEditar = document.querySelector('#editarProposta');

    if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'em análise') {

        //PASS
    } else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'aceito') {

        btnAceitar.parentElement.removeChild(btnAceitar);
        btnDeclinar.parentElement.removeChild(btnDeclinar);
    } else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'concluido') {

        btnAceitar.parentElement.removeChild(btnAceitar);
        btnDeclinar.parentElement.removeChild(btnDeclinar);
        btnEditar.parentElement.removeChild(btnEditar);
    } else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'declinado') {

        btnAceitar.parentElement.removeChild(btnAceitar);
        btnDeclinar.parentElement.removeChild(btnDeclinar);
        btnEditar.parentElement.removeChild(btnEditar);
    }  else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'solicitação de aceite') {

        if (localStorage.getItem('cargo').toLocaleLowerCase() != 'adm') {

            btnAceitar.parentElement.removeChild(btnAceitar);
            btnDeclinar.parentElement.removeChild(btnDeclinar);
            btnEditar.parentElement.removeChild(btnEditar);
        } else {

            btnDeclinar.parentElement.removeChild(btnDeclinar);
            btnEditar.parentElement.removeChild(btnEditar);
        }
    } else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'solicitação de declinio') {

        if (localStorage.getItem('cargo').toLocaleLowerCase() != 'adm') {

            btnAceitar.parentElement.removeChild(btnAceitar);
            btnDeclinar.parentElement.removeChild(btnDeclinar);
            btnEditar.parentElement.removeChild(btnEditar);
        } else {

            btnEditar.parentElement.removeChild(btnEditar);
            btnAceitar.parentElement.removeChild(btnAceitar);
        }
    }
}