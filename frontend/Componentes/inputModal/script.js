const passShow=(a)=>{
    let input = document.querySelector('.password')
    if (input.type == "password"){
        input.setAttribute("type", "text");
    } else {
        input.setAttribute("type", "password");
    }
}