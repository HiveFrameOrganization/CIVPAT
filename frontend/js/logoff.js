async function deslogar () { {
    try {

        localStorage.clear();

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