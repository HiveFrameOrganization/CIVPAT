// DESATIVA BOTÃO DE EDITAR E NOVO PRODUTO QUANDO NAO ESTA MAIS EM ANALISE
export default function desativaBotoes(){

    // Botões 
    const btnDeclinar = document.querySelector('#declinarProposta');
    const btnAceitar = document.querySelector('#aceitarProposta');
    const btnEditar = document.querySelector('#editarProposta');
    const btnConcluir = document.querySelector('#concluirProposta');
    const btnPdf = document.querySelector('#botaoSalvarPdf');
    const inputsPdf = document.querySelectorAll('.pdf');
    const btnFollowUp = document.querySelector('#adicionar');
    const editFollowUp = document.querySelectorAll('.fa-edit');
    const btnProduto = document.querySelector('#btnNovoProduto');

    // REMOVENDO BOTÕES DE PROPOSTA EM ANÁLISE
    if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'em análise'){
        btnConcluir.parentElement.removeChild(btnConcluir);


    // REMOVENDO BOTÕES DE PROPOSTA ACEITAS
    } else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'aceito') {

        btnAceitar.parentElement.removeChild(btnAceitar);
        btnDeclinar.parentElement.removeChild(btnDeclinar);
        btnEditar.parentElement.removeChild(btnEditar);
        btnProduto.parentElement.removeChild(btnProduto);

    // REMOVENDO BOTÕES DE PROPOSTA CONCLUÍDAS
    } else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'concluido') {

        btnAceitar.parentElement.removeChild(btnAceitar);
        btnDeclinar.parentElement.removeChild(btnDeclinar);
        btnEditar.parentElement.removeChild(btnEditar);
        btnConcluir.parentElement.removeChild(btnConcluir);
        btnPdf.parentElement.removeChild(btnPdf);
        btnFollowUp.parentElement.removeChild(btnFollowUp);
        inputsPdf.forEach((input) => {
            input.disabled = true;
        });
        editFollowUp.forEach((icon) => {
            icon.parentElement.removeChild(icon);
        })
        btnProduto.parentElement.removeChild(btnProduto);
    
    // REMOVENDO BOTÕES DE PROPOSTA DECLINADAS
    } else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'declinado') {

        btnAceitar.parentElement.removeChild(btnAceitar);
        btnDeclinar.parentElement.removeChild(btnDeclinar);
        btnEditar.parentElement.removeChild(btnEditar);
        btnConcluir.parentElement.removeChild(btnConcluir);
        btnPdf.parentElement.removeChild(btnPdf);
        btnFollowUp.parentElement.removeChild(btnFollowUp);
        inputsPdf.forEach((input) => {
            input.disabled = true;
        });
        editFollowUp.forEach((icon) => {
            icon.parentElement.removeChild(icon);
        })
        btnProduto.parentElement.removeChild(btnProduto);

    }  else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'solicitação de aceite') {

        if (localStorage.getItem('cargo').toLocaleLowerCase() == 'ger' || localStorage.getItem('cargo').toLocaleLowerCase() == 'tec') {

            btnAceitar.parentElement.removeChild(btnAceitar);
            btnDeclinar.parentElement.removeChild(btnDeclinar);
            btnEditar.parentElement.removeChild(btnEditar);
            btnConcluir.parentElement.removeChild(btnConcluir);
            btnPdf.parentElement.removeChild(btnPdf);
            btnFollowUp.parentElement.removeChild(btnFollowUp);
            inputsPdf.forEach((input) => {
                input.disabled = true;
            });
            editFollowUp.forEach((icon) => {
                icon.parentElement.removeChild(icon);
            })
            btnProduto.parentElement.removeChild(btnProduto);

        } else {
            btnConcluir.parentElement.removeChild(btnConcluir);
        }

    } else if (localStorage.getItem('statusProposta').toLocaleLowerCase() == 'solicitação de declinio') {

        // REMOVENDO BOTÕES DE PROPOSTAS EM SOLICITAÇÃO DE DECLÍNIO
        if (localStorage.getItem('cargo').toLocaleLowerCase() == 'ger' || localStorage.getItem('cargo').toLocaleLowerCase() == 'tec') {

            btnAceitar.parentElement.removeChild(btnAceitar);
            btnDeclinar.parentElement.removeChild(btnDeclinar);
            btnEditar.parentElement.removeChild(btnEditar);
            btnConcluir.parentElement.removeChild(btnConcluir);
            btnPdf.parentElement.removeChild(btnPdf);
            btnFollowUp.parentElement.removeChild(btnFollowUp);
            inputsPdf.forEach((input) => {
                input.disabled = true;
            });
            editFollowUp.forEach((icon) => {
                icon.parentElement.removeChild(icon);
            })
            btnProduto.parentElement.removeChild(btnProduto);

        } else {
            btnConcluir.parentElement.removeChild(btnConcluir);
        }
    }
}