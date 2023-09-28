import { back } from '../Rotas/rotas.js';

window.addEventListener('load', () => {
    carregarFotoPerfil();
})

async function carregarFotoPerfil () {
    const nif = localStorage.getItem('nifPerfil');

    const requisicao = await fetch(back + `/perfil/carregarFotoPerfil.php?nif=${nif}`)

    const resposta = await requisicao.blob();

    if (resposta.size > 0) {
        const imagemElement = document.getElementById('profile-trigger');
        const imageUrl = URL.createObjectURL(resposta);
        imagemElement.src = imageUrl;

        if (document.getElementById('perfil-image')) {
            document.getElementById('perfil-image').src = imageUrl;
        }
    }

}