export default function validarSGSET(sgset){
    if (sgset == '') {
        return true
    }

    // Verificar se o SGSET tem pelo menos 6 dígitos (1 antes da barra + 4 dígitos do ano depois da barra)
    if (sgset.length < 5) {
        return false;
    }

    return true;
}