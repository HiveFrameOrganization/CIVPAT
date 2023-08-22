USE `isihiveframe` ;


-- Inserção dos estados do funil de vendas

INSERT INTO StatusFunil (idStatusFunil, StatusFunil) VALUES
(1, '1° Contato'),
(2, 'Em Prospecção'),
(3, 'Em Orçamento'),
(4, 'Em Análise do Cliente'),
(5, 'Vendido');


-- Inserção dos tipos de pdf

INSERT INTO TipoPDF (idTipoPDF, TipoPDF) VALUES
(1, 'Orçamento'),
(2, 'Proposta Assinada'),
(3, 'Relatório Final'),
(4, 'Pesquisa de Satifação'),
(5, 'Outros');


-- Inserção dos tipos de Serviços/Categorias

INSERT INTO ServicoCategoria VALUES
(1, 'Assessoria Tecnológica - Aprimoramento de Produtos e Processos'),
(2, 'Assessoria Tecnológica - Empreendedorismo'),
(3, 'Assessoria Tecnológica - Gestão'),
(4, 'Assessoria Tecnológica - Legislações, Normas e Regulamentos Técnicos'),
(5, 'Assessoria Tecnológica - Processo Produtivo'),
(6, 'Certificação - Processos'),
(7, 'Certificação - Produtos'),
(8, 'Desenvolvimento Tecnológico - Aprimoramento de Produtos e Processos'),
(9, 'Desenvolvimento Tecnológico - Pesquisa e Desenvolvimento de Processos'),
(10, 'Desenvolvimento Tecnológico - Pesquisa e Desenvolvimento de Produtos'),
(11, 'Informação Tecnológica - Disseminação da Informação'),
(12, 'Informação Tecnológica - Eventos Técnicos'),
(13, 'Serviços Especializados - Serviços de Inspeção'),
(14, 'Serviços Especializados - Serviços Operacionais'),
(15, 'Serviços Metrológicos - Calibração - Labor. Dimensional'),
(16, 'Serviços Metrológicos - Ensaios - Labor. Em Implantes');


-- Inserção dos Nomes dos Produtos

INSERT INTO NomeProduto (idNomeProduto, NomeProduto, fk_idServicoCategoria) VALUES
(1, 'Branding', 1),
(2, 'Caderno de Tendências', 1),
(3, 'Consultoria para Growth Hacking', 1),
(4, 'Desenvolvimento De Mídias Digitais De Comunicação', 1),
(5, 'Desenvolvimento de processos especiais para análises dimensionais e medições avançadas', 1),
(6, 'Desenvolvimento de Produto', 1),
(7, 'Design de Embalagens', 1),
(8, 'Design de Marca e Identidade Visual', 1),
(9, 'Design de Produto', 1),
(10, 'Design de Produto e Projeto Mecânico', 1),
(11, 'Design de Produto Tridimensional', 1),
(12, 'Design de Rótulo', 1),
(13, 'Design de Rótulo(s) e Aplicações de elementos gráficos na embalagem', 1),
(14, 'Design do Aspecto Formal da Embalagem', 1),
(15, 'Design do Aspecto Formal do Produto', 1),
(16, 'Design e Identidade Visual de Embalagens (linha de Produtos)', 1),
(17, 'Design e Melhoria de Serviços', 1),
(18, 'Design Thinking para melhoria de produtos e/ou serviços', 1),
(19, 'DIP - Desenvolvimento Integrado de Produto', 1),
(20, 'Estudo de Prospecção Tecnológica', 1),
(21, 'Homologação de análise de porosidade por tomografia computodarizada segundo Norma VW 50093', 1),
(22, 'Implantação de processos de Gestão da Inovação', 1),
(23, 'Pesquisa Aplicada de Design - Análise de Mercado e Produto', 1),
(24, 'Planejamento e preparação para comercialização em marketplace', 1),
(25, 'Planejamento para Busca Orgânica - SEO', 1),
(26, 'Planejamento para Presença Digital e links patrocinados', 1),
(27, 'Pojeto de Molde Piloto', 1),
(28, 'Projeto  Mecânico e construção de Protótipo', 1),
(29, 'Projeto de Fabricação', 1),
(30, 'Projeto e Desenvolvimento de Design de Produto', 1),
(31, 'Projeto Mecânico', 1),
(32, 'Prototipagem de Novos Produtos', 1),
(33, 'Quiosque de Venda', 1),
(34, 'Programa de Intraempreendedorismo', 2),
(35, 'Programa de Residência de Startups', 2),
(36, 'Serviço de Coworking', 2),
(37, 'Adequação à norma ABNT NBR ISSO 9001:2015 - Sistema de Gestão da Qualidade', 3),
(38, 'Assessoria em Gestão da Qualidade', 3),
(39, 'Auditoria Interna', 3),
(40, 'Elaboração de Procedimentos de Sistema de Qualidade', 3),
(41, 'Elaboração de Manual da Qualidade', 3),
(42, 'Implantação de 5S', 3),
(43, 'Implantação de Procedimentos do Sistema de Qualidade', 3),
(44, 'Implantação de Sistemas de Gestão Integrado', 3),
(45, 'Design do Aspecto Formal e Funcional da Embalagem', 4),
(46, 'Adequação às Normas de Qualidade para Serviços Automotivos', 5),
(47, 'Adequação Controle de Produção', 5),
(48, 'Adequação de Layout para Processo Produtivo', 5),
(49, 'Análise de comportamentos mecânicos (Adapter FIAT)', 5),
(50, 'Assessoria em Manufatura Enxuta', 5),
(51, 'Assessoria em Processos Galvânicos', 5),
(52, 'Consultoria OMNIchannel Para Integração de Canais de Venda', 5),
(53, 'Consultoria Remota para Operação e Programação de Centro de Usinagem', 5),
(54, 'Consultoria Remota para Operação e Programação de Torno CNC', 5),
(55, 'Controle de Estoque', 5),
(56, 'Controle de Qualidade de Produto', 5),
(57, 'Controle e Melhoria de Processos', 5),
(58, 'Controle de Manutenção de Máquinas e Equipamentos', 5),
(59, 'Custos Produtivos (Mapeamento, Fluxograma, Levantamento de Custos Diretos e Indiretos, Tempo Padrão, Identificação de Gargalos)', 5),
(60, 'Diagnóstico - Lean Manufacturing', 5),
(61, 'Diagnóstico - Manufatura Enxuta', 5),
(62, 'Diagnóstico de Avaliação de Processos de Calibração', 5),
(63, 'Diagnóstico em Processos de Produção e Usinagem de Peças', 5),
(64, 'Diagnóstico Tecnológico', 5),
(65, 'Gestão de Operações', 5),
(66, 'Implantação de 5S - Housekeeping', 5),
(67, 'Implantação de Ações Corretivas', 5),
(68, 'Implantação de Ferramentas de Controle Produtivo', 5),
(69, 'Implantação de Melhorias (TO DO)', 5),
(70, 'Lean Manufacturing', 5),
(71, 'Lean Manufacturing', 5),
(72, 'Levantamento de Informação para Implementação de Processos Produtivo', 5),
(73, 'Mapeamento do Fluxo de Valor - VSM', 5),
(74, 'Melhoria de Layout Produtivo', 5),
(75, 'Melhoria em Processo Produtivo', 5),
(76, 'Organização e Controle de Estoque', 5),
(77, 'Otimização do Processo Produtivo', 5),
(78, 'PCP - Planejamento e Controle da Produção', 5),
(79, 'Pesquisa e Determinação de Equipamentos, Recursos Físicos e Humanos', 5),
(80, 'Planejamento e Controle da Produção', 5),
(81, 'Processo Produtivo (Mapeamento, Fluxograma, Layout, Procedimentos / Instrução Operacional, Ordem de Serviços, KPI´s)', 5),
(82, 'Questionário IPEA', 5),
(83, 'Branding', 8),
(84, 'Caderno de Tendências', 8),
(85, 'Consultoria para Growth Hacking', 8),
(86, 'Desenvolvimento De Mídias Digitais De Comunicação', 8),
(87, 'Desenvolvimento de processos especiais para análises dimensionais e medições avançadas', 8),
(88, 'Desenvolvimento de Produto', 8),
(89, 'Design de Embalagens', 8),
(90, 'Design de Marca e Identidade Visual', 8),
(91, 'Design de Produto', 8),
(92, 'Design de Produto e Projeto Mecânico', 8),
(93, 'Design de Produto Tridimensional', 8),
(94, 'Design de Rótulo', 8),
(95, 'Design de Rótulo(s) e Aplicações de elementos gráficos na embalagem', 8),
(96, 'Design do Aspecto Formal da Embalagem', 8),
(97, 'Design do Aspecto Formal do Produto', 8),
(98, 'Design do Aspecto Formal e Funcional da Embalagem', 8),
(99, 'Design e Identidade Visual de Embalagens (linha de Produtos)', 8),
(100, 'Design e Melhoria de Serviços', 8),
(101, 'Design Thinking para melhoria de produtos e/ou serviços', 8),
(102, 'DIP - Desenvolvimento Integrado de Produto', 8),
(103, 'Estudo de Prospecção Tecnológica', 8),
(104, 'Homologação de análise de porosidade por tomografia computodarizada segundo Norma VW 50093', 8),
(105, 'Implantação de processos de Gestão da Inovação', 8),
(106, 'Pesquisa Aplicada de Design - Análise de Mercado e Produto', 8),
(107, 'Planejamento e preparação para comercialização em marketplace', 8),
(108, 'Planejamento para Busca Orgânica - SEO', 8),
(109, 'Planejamento para Presença Digital e links patrocinados', 8),
(110, 'Pojeto de Molde Piloto', 8),
(111, 'Projeto  Mecânico e construção de Protótipo', 8),
(112, 'Projeto de Fabricação', 8),
(113, 'Projeto e Desenvolvimento de Design de Produto', 8),
(114, 'Projeto Mecânico', 8),
(115, 'Prototipagem de Novos Produtos', 8),
(116, 'Quiosque de Venda', 8),
(117, 'Transmissão de Alta Performance para Veículos Elétricos Pesados - SGF 333200', 10),
(118, 'Depósito de Patente de Invenção ou de Modelo de Utilidade', 11),
(119, 'A importância do planejamento e controle dea produção para a reduçaõ de perdas', 12),
(120, 'Boas Práticas de Fabricação', 12),
(121, 'Calculando custos de produção na indústria', 12),
(122, 'Controle de Processos', 12),
(123, 'Cronoanalise', 12),
(124, 'Design como Estratégia de Inovação e Competitividade para as MPES', 12),
(125, 'Design e Meio Ambiente', 12),
(126, 'Design Estratégico', 12),
(127, 'Design Thinking nos Processos de Qualidade', 12),
(128, 'Desvendando o 5S', 12),
(129, 'Ferramentas da Qualidade', 12),
(130, 'Ferrramentas para melhorar o Processo Produtivo', 12),
(131, 'FMEA - Análise de Modo de Efeito e falha', 12),
(132, 'Formação de Preço de Venda', 12),
(133, 'Funções e Responsabilidades do Designado para empresa sem CIPA constituída', 12),
(134, 'Gerenciamento de Riscos', 12),
(135, 'Just In Time', 12),
(136, 'KAIZEN - Processo de Melhoria Contínua', 12),
(137, 'KPI - Indicadores Chave de Performance', 12),
(138, 'Lean Manufacturing - O sistema de Produção que mudou o Mundo', 12),
(139, 'Leitura e Interpretação da NR 12', 12),
(140, 'Leitura e Interpretação da NR 12 Aplicada à Área Tecnológica', 12),
(141, 'Manufatura Adititva', 12),
(142, 'MASP - Metodologia de Análise e Solução de Problemas', 12),
(143, 'Normas Redulamentadoras de Segurança e Saúde no Trabalho - requisitos e Condições Mínimas para Implantação', 12),
(144, 'Otimização dos Processos Produtivos', 12),
(145, 'Planejamento da Manutenção', 12),
(146, 'Processo de Desing e Implementação', 12),
(147, 'Prototipagem Rápida', 12),
(148, 'Qual a importância de se ter uma Ficha Técnica', 12),
(149, 'Segurança no Trabalho', 12),
(150, 'Seja Competitivo - Industrialize seu Negócio', 12),
(151, 'Sensibilização para a Qualidade', 12),
(152, 'Técnicas para manutenção Mecânica', 12),
(153, 'Tecnologias CAD / CAM / CAE', 12),
(154, 'TPM - Manutenção Produtiva Total', 12),
(155, 'Usinagem Avançada', 12);

-- Cont. inserção dos tipos de Serviços/Categorias

INSERT INTO NomeProduto (idNomeProduto, NomeProduto, fk_idServicoCategoria) VALUES
(156, 'Análise com Interferometria de Luz', 14),
(157, 'Análise por tomografia computadorizada industrial (CTRX)', 14),
(158, 'Engenharia Reversa', 14),
(159, 'Engenharia Reversa por meio da Tomografia Industrial', 14),
(160, 'Medição com tomografia computadorizada industrial (CTRX)', 14),
(161, 'Programação e Usinagem de Peças em Máquinas CNC', 14),
(162, 'Usinagem de Peças', 14),
(163, 'Usinagem por Eletroerosão a Fio', 14),
(164, 'Análise de superfície por microscopia confocal - rugosidade', 15),
(165, 'Análise por Interferometria de Luz', 15),
(166, 'Análise por Tomografia de raios X', 15),
(167, 'Calibração de Arame para medição de roscas até 5mm', 15),
(168, 'Calibração de Blocos padrão - 0,5 a 100mm', 15),
(169, 'Calibração de Blocos padrão acima de 100mm até 600 mm', 15),
(170, 'Calibração de Calibrador Anel conforme observações', 15),
(171, 'Calibração de Calibrador de Relógios até 100 mm', 15),
(172, 'Calibração de Calibrador tampão cilíndrico liso até 100 mm', 15),
(173, 'Calibração de Calibrador tampão cilíndrico roscado até 300mm', 15),
(174, 'Calibração de Escala milimetrada até 1000 mm', 15),
(175, 'Calibração de Esfera padrão até 50 mm', 15),
(176, 'Calibração de Haste padrão até 300 mm', 15),
(177, 'Calibração de Manômetro Analógico de 2,5 kPa até 20 Mpa', 15),
(178, 'Calibração de Manômetro Digital de 2,5 kPa até 20 Mpa', 15),
(179, 'Calibração de Micrômetro externo até 200 mm', 15),
(180, 'Calibração de Paquímetro - até 500 mm', 15),
(181, 'Calibração de paquimetros até 600 mm', 15),
(182, 'Calibração de Pino padrão até 35 mm', 15),
(183, 'Calibração de Relógio apalpador', 15),
(184, 'Calibração de Transdutor / Transmissor de Pressão com saída em unidade elétrica - de2,5 kPa até 20 Mpa', 15),
(185, 'Calibração de Trenas até 5 m', 15),
(186, 'Calibração de Vacuômetro Análogico de -103 kPa até -10 kPa', 15),
(187, 'Calibração de Vacuômetro Digital de -103 kPa até -10 kPa', 15),
(188, 'Calibre de folga até 5 mm', 15),
(189, 'Comparador eletrônico de deslocamento', 15),
(190, 'Esquadro até 700 x 500 mm', 15),
(191, 'Medição de Blocos prismático até 500 mm', 15),
(192, 'Medições de peças diversas', 15),
(193, 'Medição de rugosidade conforme observação', 15),
(194, 'Medição por Tomografia de Raios X', 15),
(195, 'Metrologia - Calibração', 15),
(196, 'Micrômetro de profundiade até 200 mm', 15),
(197, 'Micrômetro interno de 3 pontas ? De 5 até 200 mm', 15),
(198, 'Micrômetros internos com relógio ( Subito) até 300 mm', 15),
(199, 'Microscopia Eletrônica de Varredura', 15),
(200, 'Nível até 10 mm/m', 15),
(201, 'Padrão de alturas até 600 mm', 15),
(202, 'Pente de Raios até 20 mm', 15),
(203, 'Projetor de Perfil até 300 mm (mesa)', 15),
(204, 'Relógios comparadores até 100mm', 15),
(205, 'Traçador de Alturas até 600 mm', 15),
(206, 'Transferidor de grau', 15),
(207, 'Validação de Sistemas de Medição', 15);


-- Inserção de Usuários para teste

insert into Usuarios values 
('1234567', 'michael', 'jackson', NULL, 'ger', 'ger@sp.senai.br', '$2y$10$xfDvLB17C8JvErkPshsKNOTyVcNQ8NQDqVrI1WaIIF9CBwzAqyOcS', 'ativado'),
('1234568', 'michael', 'jackson', NULL, 'coor', 'coor@sp.senai.br', '$2y$10$xfDvLB17C8JvErkPshsKNOTyVcNQ8NQDqVrI1WaIIF9CBwzAqyOcS', 'ativado'),
('1234569', 'michael', 'jackson', NULL, 'adm', 'adm@sp.senai.br', '$2y$10$xfDvLB17C8JvErkPshsKNOTyVcNQ8NQDqVrI1WaIIF9CBwzAqyOcS', 'ativado'),
('1234560', 'michael', 'jackson', NULL, 'tec', 'tec@sp.senai.br', '$2y$10$xfDvLB17C8JvErkPshsKNOTyVcNQ8NQDqVrI1WaIIF9CBwzAqyOcS', 'ativado');


-- Inserção de Propostas para teste
insert into Propostas values 
(default, '1234567', 'Jacaré a Jato', '75090673000189', '115 - Senai Suiço brasileira Paulo Ernesto Tolle', 
'Jacksons 5', 'Em Análise', NULL, NULL, NULL, NULL);