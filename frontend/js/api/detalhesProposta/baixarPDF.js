import { back } from "../Rotas/rotas.js";

export default function baixarPdf(tipoPdf) {

    const idProposta = localStorage.getItem('idProposta');

    // Caminho para o arquivo PHP que busca o PDF no banco de dados.
    const url = back + `/PDF/baixarPdf.php?id=${idProposta}&tipoPdf=${tipoPdf}`;

    // Faça a requisição usando fetch.
    fetch(url)
        .then(response => response.blob())
        .then(blob => {

            //Crie um URL temporário para o blob do PDF.
            const urlPdf = URL.createObjectURL(blob);

            // Crie um link <a> para abrir o PDF em uma nova guia do navegador.
            const link = document.createElement('a');
            link.href = urlPdf;
            link.target = '_blank';
            link.click();
            // windows.open(urlPdf,'_blank')


            // Remova o URL temporário criado para o blob.
            URL.revokeObjectURL(urlPdf);

        })
        .catch(error => {
            console.error('Erro ao obter o PDF:', error);
        });
}