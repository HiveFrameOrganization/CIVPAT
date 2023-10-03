export default function validarCNPJ(cnpj) {
    if (cnpj == '') {
        return true
    }
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');

    // Verificar se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
        return false;
    }

    // Calcular o primeiro dígito verificador
    let soma = 0;
    let peso = 2;
    for (let i = 11; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
    }
    const digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    // Calcular o segundo dígito verificador
    soma = 0;
    peso = 2;
    for (let i = 12; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
    }
    const digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    // Verificar se os dígitos verificadores calculados são iguais aos dígitos reais
    if (parseInt(cnpj.charAt(12)) !== digito1 || parseInt(cnpj.charAt(13)) !== digito2) {
        return false;
    }

    return true;
}