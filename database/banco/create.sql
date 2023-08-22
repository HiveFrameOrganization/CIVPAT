-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema isihiveframe
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `isihiveframe` ;

USE `isihiveframe` ;
ALTER DATABASE isihiveframe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- -----------------------------------------------------
-- Table `isihiveframe`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`Usuarios` (
  `NIF` VARCHAR(7) NOT NULL,
  `Nome` VARCHAR(100) NOT NULL,
  `Sobrenome` VARCHAR(200) NOT NULL,
  `FotoDePerfil` LONGBLOB NULL,
  `TipoUser` ENUM('adm', 'tec', 'ger', 'coor') NOT NULL,
  `Email` VARCHAR(125) NOT NULL,
  `Senha` VARCHAR(256) NOT NULL,
  `Status` ENUM('ativado', 'desativado') NOT NULL,
  PRIMARY KEY (`NIF`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
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
  `fk_idServicoCategoria` INT UNSIGNED NOT NULL,
  `NomeProduto` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`idNomeProduto`),
  INDEX `fk_NomeProduto_ServicoCategoria1_idx` (`fk_idServicoCategoria` ASC) VISIBLE,
  CONSTRAINT `fk_NomeProduto_ServicoCategoria1`
    FOREIGN KEY (`fk_idServicoCategoria`)
    REFERENCES `isihiveframe`.`ServicoCategoria` (`idServicoCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`Maquinas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`Maquinas` (
  `idMaquinas` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Maquinas` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMaquinas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `isihiveframe`.`Produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`Produtos` (
  `idProdutos` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_idProposta` INT UNSIGNED NOT NULL,
  `fk_idTecnico` VARCHAR(7) NULL,
  `fk_idMaquinas` INT UNSIGNED NULL,
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
  INDEX `fk_Produtos_Maquinas1_idx` (`fk_idMaquinas` ASC) VISIBLE,
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
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_Maquinas1`
    FOREIGN KEY (`fk_idMaquinas`)
    REFERENCES `isihiveframe`.`Maquinas` (`idMaquinas`)
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
-- Table `isihiveframe`.`FollowUp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `isihiveframe`.`FollowUp` (
  `idFollowUp` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_idProposta` INT UNSIGNED NOT NULL,
  `Data` DATE NOT NULL,
  `Comentario` TEXT NOT NULL,
  `DataProxFollowUp` DATE NOT NULL,
  PRIMARY KEY (`idFollowUp`),
  INDEX `fk_followup_Propostas1_idx` (`fk_idProposta` ASC) VISIBLE,
  CONSTRAINT `fk_followup_Propostas1`
    FOREIGN KEY (`fk_idProposta`)
    REFERENCES `isihiveframe`.`Propostas` (`idProposta`)
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

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


