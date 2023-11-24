export default function validarEmail(email){

    var regexValido = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/;

    // Verificar se o E-mail é válido
    if (email.match(regexValido)) {
        return true;
    } else {
        return false;
    }

}