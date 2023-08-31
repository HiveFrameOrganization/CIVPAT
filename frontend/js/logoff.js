async function deslogar () { {
    try {

        // Recuperando o Tema escolhido o usuário
        const tema = localStorage.getItem('theme');

        // Limpando residuos
        localStorage.clear();

        // Salvando novamente o tema, afim de evitar que desapareça ao limpar os residuos do LocalStorage
        localStorage.setItem('theme', tema);

        // Requisição para sair da conta
        const deslogar = await fetch(`http://localhost:8080/backend/php/login/sair.php`);

        const resposta = await deslogar.json();

        console.log(resposta);

        window.location.href = 'http://localhost:8080/';

    } catch (erro) {
        console.error(erro);
    }

};
}