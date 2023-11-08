import { back, raiz } from './api/Rotas/rotas.js';

export default async function deslogar() {
    try {

        // Recuperando o Tema escolhido do usuário, caso exista
        const tema = localStorage.getItem('theme') === 'dark' || localStorage.getItem('theme') === 'light' ? localStorage.getItem('theme') : false;

        // Limpando residuos
        localStorage.clear();
        sessionStorage.clear();

        // Salvando novamente o tema, afim de evitar que desapareça ao limpar os residuos do LocalStorage
        tema && localStorage.setItem('theme', tema);

        // Requisição para sair da conta
        const deslogar = await fetch(back + `/login/sair.php`);

        const resposta = await deslogar.json();

        console.log(resposta);

        window.location.href = raiz;

    } catch (erro) {
        console.log(erro);
    }
};