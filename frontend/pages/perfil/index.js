// Funções para controlar os botões
const infoBTN = document.querySelector('#spanInformacoes');
const prodBTN = document.querySelector('#spanProdutos');

function selectBTN(btn = infoBTN) {

    
    // Removendo todas as classes de seleção de todos os botões
    [ infoBTN, prodBTN ].forEach((el) => {

        el.classList.remove('text-primary');
        el.classList.remove('border-b-2');
        el.classList.remove('border-primary');
    });

    // Aplicando as classes no botão clicado
    btn.classList.add('text-primary');
    btn.classList.add('border-b-2');
    btn.classList.add('border-primary');
}

[ infoBTN, prodBTN ].forEach((btn) => {

    btn.addEventListener('click', () => {

        selectBTN(btn);
    });
});
