const passShow=(e)=>{
    let input = document.querySelectorAll('.password');
    let icon = document.querySelectorAll('.icon');

    if (input[e].type == "password"){
        input[e].setAttribute("type", "text");
        icon[e].classList.remove('fa-eye');
        icon[e].classList.add('fa-eye-low-vision');
        icon[e].classList.add('-mr-[1px]');
    } else {
        input[e].setAttribute("type", "password");
        icon[e].classList.add('fa-eye');
        icon[e].classList.remove('fa-eye-slash');
        icon[e].classList.remove('-mr-[1px]');
    }
}

function abreModal(){
    let modal = document.querySelector('.caixa');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

let cad = document.querySelector('.modalCadastroProdudo')
function fechaModal(){
    let modal = document.querySelector('.caixa');

    cad.classList.remove('flex')
    cad.classList.add('hidden')
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

if (document.querySelector('#btnNovoProduto')) {

    document.querySelector('#btnNovoProduto').addEventListener('click', ()=>{
        cad.classList.remove('hidden')
        cad.classList.add('flex')
    })
}