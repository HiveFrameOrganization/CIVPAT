USE `isihiveframe` ;

/*------------------------------------------- HOME --------------------------------------------------*/
CREATE VIEW vw_home AS
SELECT `Propostas`.`idProposta`, `Propostas`.`nSGSET`, `Propostas`.`TituloProposta`,
    `Propostas`.`Inicio`, `Propostas`.`Fim`, `Propostas`.`Status`, `Usuarios`.`Nome`,
    `GerenteResponsavel`.`fk_nifGerente` FROM Propostas
    INNER JOIN Usuarios ON `Propostas`.`fk_nifUsuarioCriador` = `Usuarios`.`NIF`
    INNER JOIN GerenteResponsavel ON `Propostas`.`idProposta` = `GerenteResponsavel`.`fk_idProposta`
    ORDER BY `Propostas`.`idProposta` DESC;


CREATE VIEW vw_kpi AS
SELECT
    SUM(CASE WHEN Status = "Em Análise" THEN 1 ELSE 0 END) AS somaAnalise,
    SUM(CASE WHEN Status = "Aceito"     THEN 1 ELSE 0 END) AS somaAceito,
    SUM(CASE WHEN Status = "Declinado"  THEN 1 ELSE 0 END) AS somaDeclinado,
    SUM(CASE WHEN Status = "Concluido"  THEN 1 ELSE 0 END) AS somaConcluido
    FROM Propostas;
/*----------------------------------------------------------------------------------------------------*/



/*--------------------------------------- RELATORIO --------------------------------------------------*/
CREATE VIEW vw_relatorioSemMaquina AS
SELECT NomeProduto.NomeProduto, Propostas.TituloProposta, SUM(CargaHoraria.HorasPessoa) as `HorasPessoa`, CargaHoraria.Datas, Usuarios.NIF
FROM Usuarios 
    INNER JOIN CargaHoraria ON Usuarios.NIF = CargaHoraria.fk_nifTecnico 
    INNER JOIN Produtos ON Produtos.idProduto = CargaHoraria.fk_idProduto 
    INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
    INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta
    GROUP BY Datas, Propostas.TituloProposta, NomeProduto.NomeProduto, Usuarios.NIF;

CREATE VIEW vw_relatorioComMaquina AS
SELECT NomeProduto.NomeProduto, Propostas.TituloProposta, SUM(CargaHoraria.HorasPessoa) as `HorasPessoa`, 
    CargaHoraria.Datas, Usuarios.NIF, Usuarios.Nome, Usuarios.Sobrenome, Maquinas.Maquina, 
    SUM(CargaHoraria.HorasMaquina) as `HorasMaquina`
FROM Usuarios 
    INNER JOIN CargaHoraria ON Usuarios.NIF = CargaHoraria.fk_nifTecnico 
    INNER JOIN Produtos ON Produtos.idProduto = CargaHoraria.fk_idProduto 
    INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
    INNER JOIN Maquinas ON Maquinas.idMaquina = Produtos.fk_idMaquina 
    INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta
    GROUP BY Datas, Propostas.TituloProposta, NomeProduto.NomeProduto, Usuarios.NIF, Maquinas.Maquina;
/*----------------------------------------------------------------------------------------------------*/



/*--------------------------------------- PRODUTOS ---------------------------------------------------*/
CREATE VIEW vw_produtos AS
SELECT Produtos.idProduto, Produtos.Area, Produtos.Valor, Produtos.HoraPessoa, Produtos.Situacao, Produtos.HoraMaquina,
Produtos.DataInicial, Produtos.DataFinal, Maquinas.Maquina, Maquinas.idMaquina, Usuarios.NIF, Usuarios.Nome,
Usuarios.TipoUser, ServicoCategoria.ServicoCategoria, NomeProduto.NomeProduto, Propostas.TituloProposta, Propostas.nSGSET, Propostas.Status
    FROM Usuarios INNER JOIN Produtos ON Usuarios.NIF = Produtos.fk_nifTecnico 
    INNER JOIN Propostas ON Produtos.fk_idProposta = Propostas.idProposta
    INNER JOIN ServicoCategoria ON Produtos.fk_idServicoCategoria = ServicoCategoria.idServicoCategoria 
    INNER JOIN NomeProduto ON Produtos.fk_idNomeProduto = NomeProduto.idNomeProduto 
    INNER JOIN Maquinas ON Produtos.fk_idMaquina = Maquinas.idMaquina;
/*----------------------------------------------------------------------------------------------------*/


/*------------------------------------- LANÇAR HORAS -------------------------------------------------*/
CREATE VIEW vw_produtosDoTecnico AS
SELECT Produtos.idProduto, Produtos.area, Produtos.situacao, Produtos.DataFinal, Maquinas.Maquina, NomeProduto.NomeProduto, 
    ServicoCategoria.ServicoCategoria, Produtos.fk_nifTecnico FROM Produtos
    INNER JOIN Maquinas ON Maquinas.idMaquina = Produtos.fk_idMaquina
    INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
    INNER JOIN ServicoCategoria ON ServicoCategoria.idServicoCategoria = Produtos.fk_idServicoCategoria;
/*----------------------------------------------------------------------------------------------------*/


/*-------------------------------------- HISTORICO FUNIL ---------------------------------------------*/
CREATE VIEW vw_historicoFunil AS
SELECT
    SF_atual.StatusFunil as SF_atual, SF_anterior.StatusFunil as SF_anterior, DataInicial, DataFinal, fk_idProposta
    FROM Historico as H
    JOIN StatusFunil as SF_atual ON H.fk_idStatusAtual = SF_atual.idStatusFunil
    JOIN StatusFunil as SF_anterior ON H.fk_idStatusAnterior = SF_anterior.idStatusFunil;
/*----------------------------------------------------------------------------------------------------*/


/*----------------------------------------- FOLLOW UP ------------------------------------------------*/
CREATE VIEW vw_followUp AS
SELECT `idFollowUp`,`Usuarios`.Nome, `Usuarios`.Sobrenome, `Data`, `Comentario`, `DataProxFollowUp`, fk_idProposta
    FROM FollowUp
    INNER JOIN Usuarios ON `FollowUp`.`fk_nifUsuario` = `Usuarios`.`NIF`
    ORDER BY `Data` DESC
/*----------------------------------------------------------------------------------------------------*/