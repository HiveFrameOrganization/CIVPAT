// SOME TELA DE CARREGAMENTO APOS CARREGAMENTO DA PAGINA
function someCarregamento(){
    console.log('carregou')
    setTimeout(()=> document.querySelector('#carregamento').classList.add('hidden'),
        1000
    )
}