-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema isihiveframe
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `isihiveframe` ;

-- -----------------------------------------------------
-- Schema isihiveframe
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `isihiveframe` ;
CREATE USER 'teste'@'172.20.0.3' IDENTIFIED BY 'P4ssword';
GRANT ALL PRIVILEGES ON isihiveframe.* TO 'teste'@'172.20.0.3';
FLUSH PRIVILEGES;

CREATE USER 'work'@'172.20.0.1' IDENTIFIED BY 'workBench';
GRANT ALL PRIVILEGES ON isihiveframe.* TO 'work'@'172.20.0.1';
FLUSH PRIVILEGES;

CREATE USER 'eu'@'localhost' IDENTIFIED BY 'P4ssword';
GRANT ALL PRIVILEGES ON isihiveframe.* TO 'eu'@'localhost';
FLUSH PRIVILEGES;

USE `isihiveframe` ;
ALTER DATABASE isihiveframe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- -----------------------------------------------------
-- Table `isihiveframe`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`Usuarios` (
  `NIF` VARCHAR(7) NOT NULL,
  `Nome` VARCHAR(100) NOT NULL,
  `Sobrenome` VARCHAR(200) NOT NULL,
  `TipoUser` ENUM('adm', 'tec', 'ger', 'coor') NOT NULL,
  `Email` VARCHAR(125) UNIQUE NOT NULL,
  `Senha` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`NIF`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`Propostas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`Propostas` (
  `idProposta` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_idGerente` VARCHAR(7) NOT NULL,
  `TituloProj` VARCHAR(75) NOT NULL,
  `CNPJ` VARCHAR(14) NOT NULL,
  `UnidadeCriadora` VARCHAR(100) NOT NULL,
  `Empresa` VARCHAR(200) NOT NULL,
  `Status` ENUM('Em Análise', 'Aceito', 'Declinado', 'Concluido') NOT NULL,
  `nSGSET` VARCHAR(50) NULL,
  `Inicio` DATE NULL,
  `Fim` DATE NULL,
  `Valor` DECIMAL(10,2) NULL,
  INDEX `fk_Propostas_Usuarios1_idx` (`fk_idGerente` ASC) VISIBLE,
  PRIMARY KEY (`idProposta`),
  CONSTRAINT `fk_Propostas_Usuarios1`
    FOREIGN KEY (`fk_idGerente`)
    REFERENCES `isihiveframe`.`Usuarios` (`NIF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`ServicoCategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`ServicoCategoria` (
  `idServicoCategoria` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ServicoCategoria` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`idServicoCategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`NomeProduto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`NomeProduto` (
  `idNomeProduto` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NomeProduto` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`idNomeProduto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`Produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`Produtos` (
  `idProdutos` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_idProposta` INT UNSIGNED NOT NULL,
  `fk_idTecnico` VARCHAR(7) NOT NULL,
  `fk_idNomeProduto` INT UNSIGNED NOT NULL,
  `fk_idServicoCategoria` INT UNSIGNED NOT NULL,
  `Area` ENUM("metalmecanica") NOT NULL,
  `Valor` DECIMAL(10,2) NOT NULL,
  `HoraPessoa` TIME NOT NULL,
  `HoraMaquina` TIME NOT NULL,
  `Unidade` VARCHAR(100) NOT NULL,
  `DataInicial` DATE NOT NULL,
  `DataFinal` DATE NOT NULL,
  PRIMARY KEY (`idProdutos`),
  INDEX `fk_Produtos_Usuarios1_idx` (`fk_idTecnico` ASC) VISIBLE,
  INDEX `fk_Produtos_ServicoCategoria1_idx` (`fk_idServicoCategoria` ASC) VISIBLE,
  INDEX `fk_Produtos_NomeProduto1_idx` (`fk_idNomeProduto` ASC) VISIBLE,
  INDEX `fk_Produtos_Propostas1_idx` (`fk_idProposta` ASC) VISIBLE,
  CONSTRAINT `fk_Produtos_Usuarios1`
    FOREIGN KEY (`fk_idTecnico`)
    REFERENCES `isihiveframe`.`Usuarios` (`NIF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_ServicoCategoria1`
    FOREIGN KEY (`fk_idServicoCategoria`)
    REFERENCES `isihiveframe`.`ServicoCategoria` (`idServicoCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_NomeProduto1`
    FOREIGN KEY (`fk_idNomeProduto`)
    REFERENCES `isihiveframe`.`NomeProduto` (`idNomeProduto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_Propostas1`
    FOREIGN KEY (`fk_idProposta`)
    REFERENCES `isihiveframe`.`Propostas` (`idProposta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`CargaHoraria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`CargaHoraria` (
  `fk_idProdutos` INT UNSIGNED NOT NULL,
  `fk_idTecnico` VARCHAR(7) NOT NULL,
  `Horas` INT NOT NULL,
  `Datas` DATE NOT NULL,
  INDEX `fk_CargaHoraria_Produtos1_idx` (`fk_idProdutos` ASC) VISIBLE,
  INDEX `fk_CargaHoraria_Usuarios1_idx` (`fk_idTecnico` ASC) VISIBLE,
  PRIMARY KEY (`fk_idProdutos`, `fk_idTecnico`),
  CONSTRAINT `fk_CargaHoraria_Produtos1`
    FOREIGN KEY (`fk_idProdutos`)
    REFERENCES `isihiveframe`.`Produtos` (`idProdutos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CargaHoraria_Usuarios1`
    FOREIGN KEY (`fk_idTecnico`)
    REFERENCES `isihiveframe`.`Usuarios` (`NIF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`StatusFunil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`StatusFunil` (
  `idStatusFunil` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `StatusFunil` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idStatusFunil`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`FollowUp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`FollowUp` (
  `idFollowUp` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_idStatusFunil` INT UNSIGNED NOT NULL,
  `fk_idProposta` INT UNSIGNED NOT NULL,
  `Data` DATETIME NOT NULL,
  `Comentario` TEXT NOT NULL,
  PRIMARY KEY (`idFollowUp`),
  INDEX `fk_followup_StatusFunil1_idx` (`fk_idStatusFunil` ASC) VISIBLE,
  INDEX `fk_followup_Propostas1_idx` (`fk_idProposta` ASC) VISIBLE,
  CONSTRAINT `fk_followup_StatusFunil1`
    FOREIGN KEY (`fk_idStatusFunil`)
    REFERENCES `isihiveframe`.`StatusFunil` (`idStatusFunil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_followup_Propostas1`
    FOREIGN KEY (`fk_idProposta`)
    REFERENCES `isihiveframe`.`Propostas` (`idProposta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`TipoPDF`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`TipoPDF` (
  `idTipoPDF` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `TipoPDF` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoPDF`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`PDF`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`PDF` (
  `idPDF` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_idProposta` INT UNSIGNED NOT NULL,
  `fk_idTipoPDF` INT UNSIGNED NOT NULL,
  `NomePdf` VARCHAR(45) NOT NULL,
  `PDF` LONGBLOB NOT NULL,
  PRIMARY KEY (`idPDF`),
  INDEX `fk_PDF_Propostas1_idx` (`fk_idProposta` ASC) VISIBLE,
  INDEX `fk_PDF_TipoPDF1_idx` (`fk_idTipoPDF` ASC) VISIBLE,
  CONSTRAINT `fk_PDF_Propostas1`
    FOREIGN KEY (`fk_idProposta`)
    REFERENCES `isihiveframe`.`Propostas` (`idProposta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PDF_TipoPDF1`
    FOREIGN KEY (`fk_idTipoPDF`)
    REFERENCES `isihiveframe`.`TipoPDF` (`idTipoPDF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`Historico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`Historico` (
  `idHistorico` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_idStatusAtual` INT UNSIGNED NOT NULL,
  `fk_idStatusAnterior` INT UNSIGNED NOT NULL,
  `fk_idProposta` INT UNSIGNED NOT NULL,
  `DataInicial` DATE NOT NULL,
  `DataFinal` DATE NOT NULL,
  PRIMARY KEY (`idHistorico`),
  INDEX `fk_Historico_Propostas1_idx` (`fk_idProposta` ASC) VISIBLE,
  INDEX `fk_Historico_StatusFunil1_idx` (`fk_idStatusAnterior` ASC) VISIBLE,
  INDEX `fk_Historico_StatusFunil2_idx` (`fk_idStatusAtual` ASC) VISIBLE,
  CONSTRAINT `fk_Historico_Propostas1`
    FOREIGN KEY (`fk_idProposta`)
    REFERENCES `isihiveframe`.`Propostas` (`idProposta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Historico_StatusFunil1`
    FOREIGN KEY (`fk_idStatusAnterior`)
    REFERENCES `isihiveframe`.`StatusFunil` (`idStatusFunil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Historico_StatusFunil2`
    FOREIGN KEY (`fk_idStatusAtual`)
    REFERENCES `isihiveframe`.`StatusFunil` (`idStatusFunil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO StatusFunil (idStatusFunil, StatusFunil) VALUES
(1, '1° Contato'),
(2, 'Em Prospecção'),
(3, 'Em Orçamento'),
(4, 'Em Análise do Cliente'),
(5, 'Vendido');

INSERT INTO TipoPDF (idTipoPDF, TipoPDF) VALUES
(1, 'Orçamento'),
(2, 'Proposta Assinada'),
(3, 'Relatório Final'),
(4, 'Pesquisa de Satifação'),
(5, 'Outros');

INSERT INTO ServicoCategoria (idServicoCategoria, ServicoCategoria) VALUES
(1, 'Assessoria Tecnológica - Aprimoramento de Produtos e Processos'),
(2, 'Assessoria Tecnológica - Legislações, Normas e Regulamentos Técnicos'),
(3, 'Assessoria Tecnológica - Empreendedorismo'),
(4, 'Assessoria Tecnológica - Gestão'),
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


INSERT INTO NomeProduto (idNomeProduto, NomeProduto) VALUES
(1, 'Adequação à norma ABNT NBR ISSO 9001:2015 - Sistema de Gestão da Qualidade'),
(2, 'Adequação Controle de Produção'),
(3, 'Adequação de Layout para Processo Produtivo'),
(4, 'Adequação às Normas de Qualidade para Serviços Automotivos'),
(5, 'Análise com Interferometria de Luz'),
(6, 'Análise de comportamentos mecânicos (Adapter FIAT)'),
(7, 'Análise de superficie por microscopia confocal - rugosidade'),
(8, 'Análise de Tomografia de raios X'),
(9, 'Análise de tomografia computadorizada industrial (CTRX)'),
(10, 'Análise por Interferometria de Luz'),
(11, 'Análise por tomografia computodarizada segundo Norma VW 50093'),
(12, 'Análise por tomografia computadorizada industrial (CTRX)'),
(13, 'Assessoria em Gestão da Qualidade'),
(14, 'Assessoria em Manufatura Enxuta'),
(15, 'Assessoria em Processos Galvânicos'),
(16, 'Assessoria para Growth Hacking'),
(17, 'Boas Práticas de Fabricação'),
(18, 'Branding'),
(19, 'Caderno de Tendências'),
(20, 'Calculando custos de produção na indústria'),
(21, 'Calibração de Arame para medição de roscas até 5mm'),
(22, 'Calibração de Blocos padrão - 0,5 a 100mm'),
(23, 'Calibração de Blocos padrão acima de 100mm até 600 mm'),
(24, 'Calibração de Calibrador Anel conforme observações'),
(25, 'Calibração de Calibrador de Relógios até 100 mm'),
(26, 'Calibração de Calibrador tampão cilíndrico liso até 100 mm'),
(27, 'Calibração de Calibrador tampão cilíndrico roscado até 300mm'),
(28, 'Calibração de Escala milimetrada até 1000 mm'),
(29, 'Calibração de Esfera padrão até 50 mm'),
(30, 'Calibração de Haste padrão até 300 mm'),
(31, 'Calibração de Manômetro Analógico de 2,5 kPa até 20 Mpa'),
(32, 'Calibração de Manômetro Digital de 2,5 kPa até 20 Mpa'),
(33, 'Calibração de Micrômetro externo até 200 mm'),
(34, 'Calibração de Paquímetro - até 500 mm'),
(35, 'Calibração de paquimetros até 600 mm'),
(36, 'Calibração de Pino padrão até 35 mm'),
(37, 'Calibração de Relógio apalpador'),
(38, 'Calibração de Transdutor / Transmissor de Pressão com saída em unidade elétrica - de2,5 kPa até 20 Mpa'),
(39, 'Calibração de Trenas até 5 m'),
(40, 'Calibração de Vacuômetro Análogico de -103 kPa até -10 kPa'),
(41, 'Calibração de Vacuômetro Digital de -103 kPa até -10 kPa'),
(42, 'Calibre de folga até 5 mm'),
(43, 'Comparador eletrônico de deslocamento'),
(44, 'Consultoria OMNIchannel Para Integração de Canais de Venda'),
(45, 'Consultoria para Growth Hacking'),
(46, 'Consultoria Remota para Operação e Programação de Centro de Usinagem'),
(47, 'Consultoria Remosta para Operação e Programação de Torno CNC'),
(48, 'Controle de Estoque'),
(49, 'Controle de Manutenção de Máquinas e Equipamentos'),
(50, 'Controle de Processos'),
(51, 'Controle de Qualidade de Produto'),
(52, 'Controle e Melhoria de Processos'),
(53, 'Cronoanalise'),
(54, 'Design como Estratégia de Inovação e Competitividade para as MPES'),
(55, 'Design de Embalagens'),
(56, 'Design de Marca e Identidade Visual'),
(57, 'Design de Produto'),
(58, 'Design de Produto e Projeto Mecânico'),
(59, 'Design de Produto Tridimensional'),
(60, 'Design de Rótulo'),
(61, 'Design de Rótulo(s) e Aplicações de elementos gráficos na embalagem'),
(62, 'Design do Aspecto Formal da Embalagem'),
(63, 'Design do Aspecto Formal do Produto'),
(64, 'Design do Aspecto Formal e Funcional da Embalagem'),
(65, 'Design e Identidade Visual de Embalagens (linha de Produtos)'),
(66, 'Design e Melhoria de Serviços'),
(67, 'Design Estratégico'),
(68, 'Design e Meio Ambiente'),
(69, 'Design Thinking nos Processos de Qualidade'),
(70, 'Design Thinking para melhoria de produtos e/ou serviços'),
(71, 'Desenvolvimento de Mídias Digitais de Comunicação'),
(72, 'Desenvolvimento de processos especiais para análises dimensionais e medições avançadas'),
(73, 'Desenvolvimento de Produto'),
(74, 'Desenvolvimento de Produto Tridimensional'),
(75, 'Desenvolvimento de Produto e Projeto Mecânico'),
(76, 'Desenvolvimento De Mídias Digitais De Comunicação'),
(77, 'Desenvolvimento de processos especiais para análises dimensionais e medições avançadas'),
(78, 'Desenvolvimento de Produto');

insert into Usuarios values 
('1234567', 'michael', 'jackson', 'ger', 'teste@sp.senai.br', '$2y$10$uArYdZ0s6dn1iQweTpAWYeWptJPLvCZnvBPuPXgliFUn2fRK6WsqW');

insert into Propostas values 
(default, '1234567', 'Jacarté a Jato', '75090673000189', '115 - Senai Suiço brasileira Paulo Ernesto Tolle', 
'Jacksons 5', 'Em Análise', NULL, NULL, NULL, NULL);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
