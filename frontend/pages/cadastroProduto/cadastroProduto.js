// formatar a data
const hoje = new Date();
const ano = hoje.getFullYear();
let mes = hoje.getMonth() + 1;
let dia = hoje.getDate();

// Garantir que vai ter um 0 em meses que não tem dois números
if (mes < 10) {
    mes = '0' + mes;
};
if (dia < 10) {
    dia = '0' + dia;
};

// Não permitir que marque uma data depois de hoje.
const dataMaxima = `${ano}-${mes}-${dia}`;
document.getElementsByName('dataInicial')[0].setAttribute('max', dataMaxima);
document.getElementsByName('dataFinal')[0].setAttribute('max', dataMaxima);

////////////////////////////////////////////////

// Quando for selecionado executar 
document.getElementById("servico").addEventListener("change", function() {
    var selectedValue = this.value;
    var produtoSelect = document.getElementById("produto");
    
    // Excluir as options anteriores
    produtoSelect.innerHTML = "";

    // lista com todos os produtos e qual serviço estão linkados.
    var options = [
        'Branding', 1,
        'Caderno de Tendências', 1,
        'Consultoria para Growth Hacking', 1,
        'Desenvolvimento De Mídias Digitais De Comunicação', 1,
        'Desenvolvimento de processos especiais para análises dimensionais e medições avançadas', 1,
        'Desenvolvimento de Produto', 1,
        'Design de Embalagens', 1,
        'Design de Marca e Identidade Visual', 1,
        'Design de Produto', 1,
        'Design de Produto e Projeto Mecânico', 1,
        'Design de Produto Tridimensional', 1,
        'Design de Rótulo', 1,
        'Design de Rótulo(s) e Aplicações de elementos gráficos na embalagem', 1,
        'Design do Aspecto Formal da Embalagem', 1,
        'Design do Aspecto Formal do Produto', 1,
        'Design e Identidade Visual de Embalagens (linha de Produtos)', 1,
        'Design e Melhoria de Serviços', 1,
        'Design Thinking para melhoria de produtos e/ou serviços', 1,
        'DIP - Desenvolvimento Integrado de Produto', 1,
        'Estudo de Prospecção Tecnológica', 1,
        'Homologação de análise de porosidade por tomografia computodarizada segundo Norma VW 50093', 1,
        'Implantação de processos de Gestão da Inovação', 1,
        'Pesquisa Aplicada de Design - Análise de Mercado e Produto', 1,
        'Planejamento e preparação para comercialização em marketplace', 1,
        'Planejamento para Busca Orgânica - SEO', 1,
        'Planejamento para Presença Digital e links patrocinados', 1,
        'Pojeto de Molde Piloto', 1,
        'Projeto  Mecânico e construção de Protótipo', 1,
        'Projeto de Fabricação', 1,
        'Projeto e Desenvolvimento de Design de Produto', 1,
        'Projeto Mecânico', 1,
        'Prototipagem de Novos Produtos', 1,
        'Quiosque de Venda', 1,
        'Programa de Intraempreendedorismo', 2,
        'Programa de Residência de Startups', 2,
        'Serviço de Coworking', 2,
        'Adequação à norma ABNT NBR ISSO 9001:2015 - Sistema de Gestão da Qualidade', 3,
        'Assessoria em Gestão da Qualidade', 3,
        'Auditoria Interna', 3,
        'Elaboração de Procedimentos de Sistema de Qualidade', 3,
        'Elaboração de Manual da Qualidade', 3,
        'Implantação de 5S', 3,
        'Implantação de Procedimentos do Sistema de Qualidade', 3,
        'Implantação de Sistemas de Gestão Integrado', 3,
        'Design do Aspecto Formal e Funcional da Embalagem', 4,
        'Adequação às Normas de Qualidade para Serviços Automotivos', 5,
        'Adequação Controle de Produção', 5,
        'Adequação de Layout para Processo Produtivo', 5,
        'Análise de comportamentos mecânicos (Adapter FIAT)', 5,
        'Assessoria em Manufatura Enxuta', 5,
        'Assessoria em Processos Galvânicos', 5,
        'Consultoria OMNIchannel Para Integração de Canais de Venda', 5,
        'Consultoria Remota para Operação e Programação de Centro de Usinagem', 5,
        'Consultoria Remota para Operação e Programação de Torno CNC', 5,
        'Controle de Estoque', 5,
        'Controle de Qualidade de Produto', 5,
        'Controle e Melhoria de Processos', 5,
        'Controle de Manutenção de Máquinas e Equipamentos', 5,
        'Custos Produtivos (Mapeamento, Fluxograma, Levantamento de Custos Diretos e Indiretos, Tempo Padrão, Identificação de Gargalos)', 5,
        'Diagnóstico - Lean Manufacturing', 5,
        'Diagnóstico - Manufatura Enxuta', 5,
        'Diagnóstico de Avaliação de Processos de Calibração', 5,
        'Diagnóstico em Processos de Produção e Usinagem de Peças', 5,
        'Diagnóstico Tecnológico', 5,
        'Gestão de Operações', 5,
        'Implantação de 5S - Housekeeping', 5,
        'Implantação de Ações Corretivas', 5,
        'Implantação de Ferramentas de Controle Produtivo', 5,
        'Implantação de Melhorias (TO DO)', 5,
        'Lean Manufacturing', 5,
        'Lean Manufacturing', 5,
        'Levantamento de Informação para Implementação de Processos Produtivo', 5,
        'Mapeamento do Fluxo de Valor - VSM', 5,
        'Melhoria de Layout Produtivo', 5,
        'Melhoria em Processo Produtivo', 5,
        'Organização e Controle de Estoque', 5,
        'Otimização do Processo Produtivo', 5,
        'PCP - Planejamento e Controle da Produção', 5,
        'Pesquisa e Determinação de Equipamentos, Recursos Físicos e Humanos', 5,
        'Planejamento e Controle da Produção', 5,
        'Processo Produtivo (Mapeamento, Fluxograma, Layout, Procedimentos / Instrução Operacional, Ordem de Serviços, KPI´s)', 5,
        'Questionário IPEA', 5,
        'Branding', 8,
        'Caderno de Tendências', 8,
        'Consultoria para Growth Hacking', 8,
        'Desenvolvimento De Mídias Digitais De Comunicação', 8,
        'Desenvolvimento de processos especiais para análises dimensionais e medições avançadas', 8,
        'Desenvolvimento de Produto', 8,
        'Design de Embalagens', 8,
        'Design de Marca e Identidade Visual', 8,
        'Design de Produto', 8,
        'Design de Produto e Projeto Mecânico', 8,
        'Design de Produto Tridimensional', 8,
        'Design de Rótulo', 8,
        'Design de Rótulo(s) e Aplicações de elementos gráficos na embalagem', 8,
        'Design do Aspecto Formal da Embalagem', 8,
        'Design do Aspecto Formal do Produto', 8,
        'Design do Aspecto Formal e Funcional da Embalagem', 8,
        'Design e Identidade Visual de Embalagens (linha de Produtos)', 8,
        'Design e Melhoria de Serviços', 8,
        'Design Thinking para melhoria de produtos e/ou serviços', 8,
        'DIP - Desenvolvimento Integrado de Produto', 8,
        'Estudo de Prospecção Tecnológica', 8,
        'Homologação de análise de porosidade por tomografia computodarizada segundo Norma VW 50093', 8,
        'Implantação de processos de Gestão da Inovação', 8,
        'Pesquisa Aplicada de Design - Análise de Mercado e Produto', 8,
        'Planejamento e preparação para comercialização em marketplace', 8,
        'Planejamento para Busca Orgânica - SEO', 8,
        'Planejamento para Presença Digital e links patrocinados', 8,
        'Pojeto de Molde Piloto', 8,
        'Projeto  Mecânico e construção de Protótipo', 8,
        'Projeto de Fabricação', 8,
        'Projeto e Desenvolvimento de Design de Produto', 8,
        'Projeto Mecânico', 8,
        'Prototipagem de Novos Produtos', 8,
        'Quiosque de Venda', 8,
        'Transmissão de Alta Performance para Veículos Elétricos Pesados - SGF 333200', 10,
        'Depósito de Patente de Invenção ou de Modelo de Utilidade', 11,
        'A importância do planejamento e controle dea produção para a reduçaõ de perdas', 12,
        'Boas Práticas de Fabricação', 12,
        'Calculando custos de produção na indústria', 12,
        'Controle de Processos', 12,
        'Cronoanalise', 12,
        'Design como Estratégia de Inovação e Competitividade para as MPES', 12,
        'Design e Meio Ambiente', 12,
        'Design Estratégico', 12,
        'Design Thinking nos Processos de Qualidade', 12,
        'Desvendando o 5S', 12,
        'Ferramentas da Qualidade', 12,
        'Ferrramentas para melhorar o Processo Produtivo', 12,
        'FMEA - Análise de Modo de Efeito e falha', 12,
        'Formação de Preço de Venda', 12,
        'Funções e Responsabilidades do Designado para empresa sem CIPA constituída', 12,
        'Gerenciamento de Riscos', 12,
        'Just In Time', 12,
        'KAIZEN - Processo de Melhoria Contínua', 12,
        'KPI - Indicadores Chave de Performance', 12,
        'Lean Manufacturing - O sistema de Produção que mudou o Mundo', 12,
        'Leitura e Interpretação da NR 12', 12,
        'Leitura e Interpretação da NR 12 Aplicada à Área Tecnológica', 12,
        'Manufatura Adititva', 12,
        'MASP - Metodologia de Análise e Solução de Problemas', 12,
        'Normas Redulamentadoras de Segurança e Saúde no Trabalho - requisitos e Condições Mínimas para Implantação', 12,
        'Otimização dos Processos Produtivos', 12,
        'Planejamento da Manutenção', 12,
        'Processo de Desing e Implementação', 12,
        'Prototipagem Rápida', 12,
        'Qual a importância de se ter uma Ficha Técnica', 12,
        'Segurança no Trabalho', 12,
        'Seja Competitivo - Industrialize seu Negócio', 12,
        'Sensibilização para a Qualidade', 12,
        'Técnicas para manutenção Mecânica', 12,
        'Tecnologias CAD / CAM / CAE', 12,
        'TPM - Manutenção Produtiva Total', 12,
        'Usinagem Avançada', 12,
        'Análise com Interferometria de Luz', 14,
        'Análise por tomografia computadorizada industrial (CTRX)', 14,
        'Engenharia Reversa', 14,
        'Engenharia Reversa por meio da Tomografia Industrial', 14,
        'Medição com tomografia computadorizada industrial (CTRX)', 14,
        'Programação e Usinagem de Peças em Máquinas CNC', 14,
        'Usinagem de Peças', 14,
        'Usinagem por Eletroerosão a Fio', 14,
        'Análise de superfície por microscopia confocal - rugosidade', 15,
        'Análise por Interferometria de Luz', 15,
        'Análise por Tomografia de raios X', 15,
        'Calibração de Arame para medição de roscas até 5mm', 15,
        'Calibração de Blocos padrão - 0,5 a 100mm', 15,
        'Calibração de Blocos padrão acima de 100mm até 600 mm', 15,
        'Calibração de Calibrador Anel conforme observações', 15,
        'Calibração de Calibrador de Relógios até 100 mm', 15,
        'Calibração de Calibrador tampão cilíndrico liso até 100 mm', 15,
        'Calibração de Calibrador tampão cilíndrico roscado até 300mm', 15,
        'Calibração de Escala milimetrada até 1000 mm', 15,
        'Calibração de Esfera padrão até 50 mm', 15,
        'Calibração de Haste padrão até 300 mm', 15,
        'Calibração de Manômetro Analógico de 2,5 kPa até 20 Mpa', 15,
        'Calibração de Manômetro Digital de 2,5 kPa até 20 Mpa', 15,
        'Calibração de Micrômetro externo até 200 mm', 15,
        'Calibração de Paquímetro - até 500 mm', 15,
        'Calibração de paquimetros até 600 mm', 15,
        'Calibração de Pino padrão até 35 mm', 15,
        'Calibração de Relógio apalpador', 15,
        'Calibração de Transdutor / Transmissor de Pressão com saída em unidade elétrica - de2,5 kPa até 20 Mpa', 15,
        'Calibração de Trenas até 5 m', 15,
        'Calibração de Vacuômetro Análogico de -103 kPa até -10 kPa', 15,
        'Calibração de Vacuômetro Digital de -103 kPa até -10 kPa', 15,
        'Calibre de folga até 5 mm', 15,
        'Comparador eletrônico de deslocamento', 15,
        'Esquadro até 700 x 500 mm', 15,
        'Medição de Blocos prismático até 500 mm', 15,
        'Medições de peças diversas', 15,
        'Medição de rugosidade conforme observação', 15,
        'Medição por Tomografia de Raios X', 15,
        'Metrologia - Calibração', 15,
        'Micrômetro de profundiade até 200 mm', 15,
        'Micrômetro interno de 3 pontas ? De 5 até 200 mm', 15,
        'Micrômetros internos com relógio ( Subito) até 300 mm', 15,
        'Microscopia Eletrônica de Varredura', 15,
        'Nível até 10 mm/m', 15,
        'Padrão de alturas até 600 mm', 15,
        'Pente de Raios até 20 mm', 15,
        'Projetor de Perfil até 300 mm (mesa)', 15,
        'Relógios comparadores até 100mm', 15,
        'Traçador de Alturas até 600 mm', 15,
        'Transferidor de grau', 15,
        'Validação de Sistemas de Medição', 15
    ];

    // Mudar o segundo select baseado na escolha do primeiro
    for (var i = 0; i < options.length; i += 2) {
        var optionText = options[i];
        var optionValue = options[i + 1];

        if (selectedValue == optionValue) {
            var option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText;
            produtoSelect.appendChild(option);
        }
    }


// Adicionar o Select2
// $(document).ready(function() { 
//     $("#servico").select2();
// });

// $(document).ready(function() { 
//         $("#produto").select2();
//     });
});

/////////////////////////////

