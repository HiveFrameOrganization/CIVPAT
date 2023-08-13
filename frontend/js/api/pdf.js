function salvarPdf() {


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


    // Enviar o formulário como uma solicitação POST usando fetch
    fetch('../../../backend/php/pdf/salvarPdf.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); // Exibir a resposta do servidor (opcional)
    })
    .catch(error => {
        console.error('Erro ao salvar o PDF:', error);
    });


}




function carregarPdf (idProposta) {

       // Caminho para o arquivo PHP que busca o PDF no banco de dados.
       const url = `../../../backend/php/pdf/carregarPdf.php?id=${idProposta}`;

       // Faça a requisição usando fetch.
       fetch(url, {
           method: 'GET'
       })
       .then(response => response.blob())
       .then(blob => {
        //    Crie um URL temporário para o blob do PDF.
           console.log(blob);
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