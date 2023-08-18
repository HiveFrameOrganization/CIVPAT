

// Fetch o resultado do PHP.
fetch('http://localhost:8080/backend/php/cadastroProduto/carregarServicoCategoria.php')
    .then(response => response.json())
    .then(data => {
        // Seleciona o elemento que será alterado.
        const servicoSelect = document.getElementById('servico');

        // Enche o elemento com o resultado da query
        data.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.idServicoCategoria; // Adicionar os resultados no option.
            optionElement.textContent = option.ServicoCategoria;
            servicoSelect.appendChild(optionElement);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    