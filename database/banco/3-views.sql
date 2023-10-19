USE `isihiveframe` ;

------------------------------------------- HOME --------------------------------------------------
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
----------------------------------------------------------------------------------------------------



--------------------------------------- RELATORIO --------------------------------------------------
CREATE VIEW vw_relatorioSemMaquina AS
SELECT NomeProduto.NomeProduto, Propostas.TituloProposta, SUM(CargaHoraria.HorasPessoa) as `HorasPessoa`, CargaHoraria.Datas 
FROM Usuarios 
    INNER JOIN CargaHoraria ON Usuarios.NIF = CargaHoraria.fk_nifTecnico 
    INNER JOIN Produtos ON Produtos.idProduto = CargaHoraria.fk_idProduto 
    INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
    INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta
    GROUP BY Datas, Propostas.TituloProposta, NomeProduto.NomeProduto;

CREATE VIEW vw_relatorioComMaquina AS
SELECT NomeProduto.NomeProduto, Propostas.TituloProposta, SUM(CargaHoraria.HorasPessoa) as `HorasPessoa`, CargaHoraria.Datas 
FROM Usuarios 
    INNER JOIN CargaHoraria ON Usuarios.NIF = CargaHoraria.fk_nifTecnico 
    INNER JOIN Produtos ON Produtos.idProduto = CargaHoraria.fk_idProduto 
    INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
    INNER JOIN Maquinas ON Maquinas.idMaquina = Produtos.fk_idMaquina 
    INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta
    GROUP BY Datas, Propostas.TituloProposta, NomeProduto.NomeProduto;
----------------------------------------------------------------------------------------------------

