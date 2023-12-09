// DESATIVA BOTÃO DE EDITAR E NOVO PRODUTO QUANDO NAO ESTA MAIS EM ANALISE
export default function desativaBotoes(){

    // Botões 
    const btnPdf = document.querySelector('#botaoSalvarPdf');
    const inputsPdf = document.querySelectorAll('.pdf');
    const btnFollowUp = document.querySelector('#adicionar');
    const editFollowUp = document.querySelectorAll('.fa-edit');
    const btnProduto = document.querySelector('#btnNovoProduto');

    if (localStorage.getItem('statusProposta').toLowerCase() == 'aceito') {

        btnProduto.parentElement.removeChild(btnProduto);

    // REMOVENDO BOTÕES DE PROPOSTA CONCLUÍDAS
    } else if (localStorage.getItem('statusProposta').toLowerCase() == 'concluido') {

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
    } else if (localStorage.getItem('statusProposta').toLowerCase() == 'declinado') {

        btnPdf.parentElement.removeChild(btnPdf);
        btnFollowUp.parentElement.removeChild(btnFollowUp);
        inputsPdf.forEach((input) => {
            input.disabled = true;
        });
        editFollowUp.forEach((icon) => {
            icon.parentElement.removeChild(icon);
        })
        btnProduto.parentElement.removeChild(btnProduto);

    }  else if (localStorage.getItem('statusProposta').toLowerCase() == 'solicitação de aceite') {

        if (localStorage.getItem('cargo').toLowerCase() == 'ger') {

            btnPdf.parentElement.removeChild(btnPdf);
            btnFollowUp.parentElement.removeChild(btnFollowUp);
            inputsPdf.forEach((input) => {
                input.disabled = true;
            });
            editFollowUp.forEach((icon) => {
                icon.parentElement.removeChild(icon);
            })
            btnProduto.parentElement.removeChild(btnProduto);

        }

    } else if (localStorage.getItem('statusProposta').toLowerCase() == 'solicitação de declinio') {

        // REMOVENDO BOTÕES DE PROPOSTAS EM SOLICITAÇÃO DE DECLÍNIO
        if (localStorage.getItem('cargo').toLowerCase() == 'ger') {

            btnPdf.parentElement.removeChild(btnPdf);
            btnFollowUp.parentElement.removeChild(btnFollowUp);
            inputsPdf.forEach((input) => {
                input.disabled = true;
            });
            editFollowUp.forEach((icon) => {
                icon.parentElement.removeChild(icon);
            })
            btnProduto.parentElement.removeChild(btnProduto);

        }
    } else if (localStorage.getItem('statusProposta').toLowerCase() == 'solicitação de conclusão'){
        
        // REMOVENDO BOTÕES DE PROPOSTAS EM SOLICITAÇÃO DE CONCLUSÃO
        if (localStorage.getItem('cargo').toLowerCase() == 'ger') {

            btnPdf.parentElement.removeChild(btnPdf);
            btnFollowUp.parentElement.removeChild(btnFollowUp);
            inputsPdf.forEach((input) => {
                input.disabled = true;
            });
            editFollowUp.forEach((icon) => {
                icon.parentElement.removeChild(icon);
            })
            btnProduto.parentElement.removeChild(btnProduto);

        }
    }
}