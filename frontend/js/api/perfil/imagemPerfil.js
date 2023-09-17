import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';

window.addEventListener('load', () => {
    alertas();
})

// Controlar o Upload de images

const uploadImageBtn = document.querySelector('#upload-image');
const imageInput = document.querySelector('#image-input');

uploadImageBtn.addEventListener('click', function() {

    imageInput.click();
});

imageInput.addEventListener('change', (event) => {

    if (imageInput.files.length <= 0) {

        return;
    }
    
    let leitor = new FileReader();

    leitor.onload = () => {

        uploadImageBtn.parentElement.querySelector('#perfil-image').src = leitor.result;

        document.querySelector('#profile-trigger').src = leitor.result;
    }

    leitor.readAsDataURL(imageInput.files[0]);

    salvarFotoPerfil();
});

async function salvarFotoPerfil () {
    const nif = localStorage.getItem('nifPerfil');

    const file = imageInput.files[0];

    const nomeImagem = imageInput.files[0]['name'];

    console.log(file);
    const formData = new FormData();
    formData.append('imagem', file);

    const requisicao = await fetch(back + `/perfil/salvarFotoPerfil.php?nif=${nif}&nomeImagem=${nomeImagem}`, {
        method: 'POST',
        body: formData
    });

    const resposta = await requisicao.json();

    localStorage.setItem('status', resposta.status);
    localStorage.setItem('mensagem', resposta.mensagem);

    if (resposta.status == 'error') {
        alertas();
    } else {
        window.location.href = '../../pages/perfil/index.html';
    }
}