const passShow=(a)=>{
    let input = document.querySelector('.password');
    let icon = document.querySelector('.icon');

    if (input.type == "password"){
        input.setAttribute("type", "text");
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-low-vision');
        icon.classList.add('-mr-[1px]');
    } else {
        input.setAttribute("type", "password");
        icon.classList.add('fa-eye');
        icon.classList.remove('fa-eye-slash');
        icon.classList.remove('-mr-[1px]');
    }
}

function abreModal(){
    let modal = document.querySelector('.caixa');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function fechaModal(){
    let modal = document.querySelector('.caixa');

    modal.classList.remove('flex');
    modal.classList.add('hidden');
}