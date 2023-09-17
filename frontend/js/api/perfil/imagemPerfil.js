import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';

window.addEventListener('load', () => {
    alertas();
})

const botaoSalvarImagem = document.getElementById('salvarImagem');

botaoSalvarImagem.addEventListener('click', () => {
    salvarFotoPerfil();
})

async function salvarFotoPerfil () {
    const inputImagem = document.getElementById('image-input');
    const nif = localStorage.getItem('nifPerfil');

    const file = inputImagem.files[0];

    const nomeImagem = inputImagem.files[0]['name'];

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