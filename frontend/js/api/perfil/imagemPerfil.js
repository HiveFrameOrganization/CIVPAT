import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';


// Controlar o Upload de images

const uploadImageBtn = document.querySelector('#upload-image');
const imageInput = document.querySelector('#image-input');

uploadImageBtn.addEventListener('click', function() {

    imageInput.click();
});

// Exibe uma prévia da foto de perfil, para a página não ter que ser recarregada
function previaFoto() {

    let leitor = new FileReader();

    leitor.onload = () => {

        uploadImageBtn.parentElement.querySelector('#perfil-image').src = leitor.result;

        document.querySelector('#profile-trigger').src = leitor.result;
    }

    leitor.readAsDataURL(imageInput.files[0]);
}


imageInput.addEventListener('change', () => {

    if (imageInput.files.length <= 0) {

        imageInput.value = '';

        return;
    }

    if (imageInput.files[0].size > 1000000) {

        localStorage.setItem('status', 'info');
        localStorage.setItem('mensagem', 'A imagem deve ser menor ou igual a 1MB!');
        alertas();

        imageInput.value = '';

        return;
    }

    if (imageInput.files[0].type != 'image/jpeg') {

        localStorage.setItem('status', 'info');
        localStorage.setItem('mensagem', 'A imagem deve ser no formato JPG/JPEG!');
        alertas();

        imageInput.value = '';

        return;
    }
    
    salvarFotoPerfil();
});

async function salvarFotoPerfil () {
    const nif = localStorage.getItem('nifPerfil');

    const file = imageInput.files[0];

    const nomeImagem = imageInput.files[0]['name'];

    console.log(file);
    const formData = new FormData();
    formData.append('imagem', file);

    try {

        const requisicao = await fetch(back + `/perfil/salvarFotoPerfil.php?nif=${nif}&nomeImagem=${nomeImagem}`, {
            method: 'POST',
            body: formData
        });
    
        const resposta = await requisicao.json();

        previaFoto();
    
        localStorage.setItem('status', resposta.status);
        localStorage.setItem('mensagem', resposta.mensagem);
    } catch (error) {
        
        localStorage.setItem('status', 'error');
        localStorage.setItem('mensagem', 'Erro ao salvar a foto!');
    }

    alertas();
}