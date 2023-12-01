export default function validarEmail(email){

    var regexValido = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-](?:\.[a-zA-Z]{2,})?/;

    // Verificar se o E-mail é válido
    if (email.match(regexValido)) {
        return true;
    } else {
        return false;
    }

}