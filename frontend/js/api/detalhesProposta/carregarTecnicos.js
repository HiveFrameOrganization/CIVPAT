import { back } from '../Rotas/rotas.js';
import selecionarGerente from './selecionarGerente.js';

export default async function carregarTecnicos() {
    setTimeout(1000);
    const gerente1Dropdown = document.getElementById('primeiroGerente');
    const gerente2Dropdown = document.getElementById('segundoGerente');


    const requisicao = await fetch(back + '/detalhesProposta/carregarTecnicos.php', {
        methods: 'GET'
    });

    const resposta = await requisicao.json();

    for (var i = 0; i < resposta.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.value = resposta[i + 1];
        optionElement.textContent = resposta[i];
        optionElement.classList.add("bg-body");
        gerente1Dropdown.appendChild(optionElement);

        i += 1;
    }

    for (var i = 0; i < resposta.length; i++) {
        var optionElement = document.createElement("option");
        optionElement.value = resposta[i + 1];
        optionElement.textContent = resposta[i];
        optionElement.classList.add("bg-body");
        gerente2Dropdown.appendChild(optionElement);

        i += 1;
    }

    selecionarGerente(localStorage.getItem('idProposta'));
}
