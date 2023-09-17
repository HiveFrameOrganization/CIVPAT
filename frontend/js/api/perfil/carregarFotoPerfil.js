import { back } from '../Rotas/rotas.js';

window.addEventListener('load', () => {
    carregarFotoPerfil();
})

async function carregarFotoPerfil () {
    const nif = localStorage.getItem('nifPerfil');

    const requisicao = await fetch(back + `/perfil/carregarFotoPerfil.php?nif=${nif}`)

    const resposta = await requisicao.blob();

    const imagemElement = document.getElementById('perfil-image');
    const imageUrl = URL.createObjectURL(resposta);
    imagemElement.src = imageUrl;

    console.log(resposta);
}