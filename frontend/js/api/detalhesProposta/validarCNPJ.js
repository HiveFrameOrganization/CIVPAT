export default function validarCNPJ(cnpj) {
    
    if (localStorage.getItem('statusProposta') == 'Em Análise' || localStorage.getItem('statusProposta') == 'Solicitação de Declinio'){

        if (cnpj == '') {
            return true
        }
    }

    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '');

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    // Verificar tamanho do CNPJ
    if (cnpj.length !== 14) {
        return false;
    }

    // Calcular os dígitos verificadores
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) {
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1)) {
        return false;
    }

    return true;
}
