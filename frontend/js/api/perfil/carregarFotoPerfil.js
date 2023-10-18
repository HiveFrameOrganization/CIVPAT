import { back } from '../Rotas/rotas.js';
import alertas from '../../feedback.js';

window.addEventListener('load', () => {
    carregarFotoPerfil();
})

async function carregarFotoPerfil () {

    try {

        const nif = localStorage.getItem('nifPerfil');

        const requisicao = await fetch(back + `/perfil/carregarFotoPerfil.php?nif=${nif}`)

        if (!requisicao.ok) {

            localStorage.setItem("status", "error");
            localStorage.setItem("mensagem", "Erro ao buscar a foto de perfil!");

            alertas();

            return;
        }

        const resposta = await requisicao.blob();

        if (resposta.size > 0) {
            const imagemElement = document.getElementById('profile-trigger');
            const imageUrl = URL.createObjectURL(resposta);
            imagemElement.src = imageUrl;

            if (document.getElementById('perfil-image')) {
                document.getElementById('perfil-image').src = imageUrl;
            }
        }

    } catch(err) {

        localStorage.setItem("status", "error");
        localStorage.setItem("mensagem", "Erro ao buscar a foto de perfil!");

        alertas();
    }
}