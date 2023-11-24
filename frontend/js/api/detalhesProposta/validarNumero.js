export default function validarNumero(numero){

    // Verificar se o número é válido
    if (numero.length < 10 || numero.length > 11) {
        return false;
    }

    return true;
}