USE `isihiveframe` ;

/*------------------------------------------- HOME --------------------------------------------------*/
CREATE VIEW vw_home AS
SELECT `Propostas`.`idProposta`, `Propostas`.`nSGSET`, `Propostas`.`TituloProposta`,
        `Propostas`.`Inicio`, `Propostas`.`Fim`, `Propostas`.`Status`, 
        (SELECT fk_nifGerente FROM `GerenteResponsavel` LIMIT 1) as `fk_nifGerente`,
        (SELECT Usuarios.Nome FROM `GerenteResponsavel` INNER JOIN `Usuarios` 
            ON GerenteResponsavel.fk_nifGerente = Usuarios.`NIF` LIMIT 1) as Nome
    FROM Propostas
    ORDER BY `Propostas`.`idProposta` DESC LIMIT 0,100;


CREATE VIEW vw_kpi AS
SELECT
    SUM(CASE WHEN Status = "Em Análise" THEN 1 ELSE 0 END) AS somaAnalise,
    SUM(CASE WHEN Status = "Aceito"     THEN 1 ELSE 0 END) AS somaAceito,
    SUM(CASE WHEN Status = "Declinado"  THEN 1 ELSE 0 END) AS somaDeclinado,
    SUM(CASE WHEN Status = "Concluido"  THEN 1 ELSE 0 END) AS somaConcluido,
    SUM(CASE WHEN Status = "Solicitação de Declinio" OR Status = "Solicitação de Aceite" OR Status = "Solicitação de conclusão" THEN 1 ELSE 0 END) AS somaSolicitacoes

    
    FROM Propostas;
/*----------------------------------------------------------------------------------------------------*/



/*--------------------------------------- RELATORIO --------------------------------------------------*/
CREATE VIEW vw_relatorioSemMaquina AS
SELECT NomeProduto.NomeProduto, Propostas.TituloProposta, SUM(CargaHoraria.HorasPessoa) as `HorasPessoa`, CargaHoraria.Datas, Usuarios.NIF,
    Propostas.idProposta, Produtos.idProduto
FROM Usuarios 
    INNER JOIN CargaHoraria ON Usuarios.NIF = CargaHoraria.fk_nifTecnico 
    INNER JOIN Produtos ON Produtos.idProduto = CargaHoraria.fk_idProduto 
    INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
    INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta
    GROUP BY Datas, Propostas.TituloProposta, NomeProduto.NomeProduto, Usuarios.NIF, Propostas.idProposta, Produtos.idProduto;

CREATE VIEW vw_relatorioComMaquina AS
SELECT NomeProduto.NomeProduto, Propostas.TituloProposta, SUM(CargaHoraria.HorasPessoa) as `HorasPessoa`, 
    CargaHoraria.Datas, Usuarios.NIF, Usuarios.Nome, Usuarios.Sobrenome, Maquinas.Maquina,
    Propostas.idProposta, Produtos.idProduto,
    SUM(CargaHoraria.HorasMaquina) as `HorasMaquina`
FROM Usuarios 
    INNER JOIN CargaHoraria ON Usuarios.NIF = CargaHoraria.fk_nifTecnico 
    INNER JOIN Produtos ON Produtos.idProduto = CargaHoraria.fk_idProduto 
    INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
    INNER JOIN Maquinas ON Maquinas.idMaquina = Produtos.fk_idMaquina 
    INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta
    GROUP BY Datas, Propostas.TituloProposta, NomeProduto.NomeProduto, Usuarios.NIF, Maquinas.Maquina, Propostas.idProposta, Produtos.idProduto;
/*----------------------------------------------------------------------------------------------------*/



/*------------------------------------------ PRODUTOS ------------------------------------------------*/
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


/*--------------------------------------- LANÇAR HORAS -----------------------------------------------*/
CREATE VIEW vw_produtosDoTecnico AS
SELECT Produtos.idProduto, Produtos.area, Produtos.situacao, Produtos.DataFinal, Propostas.TituloProposta, Maquinas.Maquina, NomeProduto.NomeProduto, 
    ServicoCategoria.ServicoCategoria, Produtos.fk_nifTecnico FROM Produtos
    INNER JOIN Propostas ON Propostas.idProposta = Produtos.fk_idProposta 
    INNER JOIN Maquinas ON Maquinas.idMaquina = Produtos.fk_idMaquina
    INNER JOIN NomeProduto ON NomeProduto.idNomeProduto = Produtos.fk_idNomeProduto
    INNER JOIN ServicoCategoria ON ServicoCategoria.idServicoCategoria = Produtos.fk_idServicoCategoria;
/*----------------------------------------------------------------------------------------------------*/


/*--------------------------------------- HISTORICO FUNIL --------------------------------------------*/
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
    ORDER BY `Data` DESC;
/*----------------------------------------------------------------------------------------------------*/


/*--------------------------------------- CARREGAR PRODUTOS ------------------------------------------*/
CREATE VIEW vw_carregarProdutos AS
SELECT `Produtos`.`idProduto`, `Produtos`.`Situacao`, `NomeProduto`.`NomeProduto`, fk_idProposta,
    `ServicoCategoria`.`ServicoCategoria`, `Usuarios`.`Nome`, `Produtos`.`Valor`, `Produtos`.`DataFinal`
    FROM Produtos

    INNER JOIN NomeProduto ON `NomeProduto`.`idNomeProduto` = `Produtos`.`fk_idNomeProduto`
    INNER JOIN ServicoCategoria ON `ServicoCategoria`.`idServicoCategoria` = `Produtos`.`fk_idServicoCategoria`
    INNER JOIN Usuarios ON `Usuarios`.`NIF` = `Produtos`.`fk_nifTecnico`;
/*----------------------------------------------------------------------------------------------------*/


/*-------------------------------------- DETALHES PROPOSTAS ------------------------------------------*/
CREATE VIEW vw_detalhesPropostas AS
SELECT Propostas.*, `Usuarios`.`Nome`, `Representantes`.*, H.`fk_idStatusAtual` AS `StatusFunil`
    FROM Propostas
    INNER JOIN Usuarios ON `Usuarios`.`NIF` = `Propostas`.`fk_nifUsuarioCriador`
    INNER JOIN Representantes ON `Representantes`.`idRepresentante` = `Propostas`.`fk_idRepresentante`
    LEFT JOIN (
        SELECT fk_idProposta, MAX(`idHistorico`) AS MaxIdHistorico
        FROM Historico
        GROUP BY fk_idProposta
    ) AS MaxHistorico ON `Propostas`.`idProposta` = MaxHistorico.fk_idProposta
    LEFT JOIN Historico AS H ON MaxHistorico.fk_idProposta = H.fk_idProposta AND MaxHistorico.MaxIdHistorico = H.`idHistorico`;
/*----------------------------------------------------------------------------------------------------*/
    

/*------------------------------------- GERENTES RESPONSAVEIS ----------------------------------------*/
CREATE VIEW vw_gerentesResponsaveis AS
SELECT GerenteResponsavel.*, `Usuarios`.`Nome`, `Usuarios`.`NIF`
            FROM GerenteResponsavel
            INNER JOIN Usuarios ON `Usuarios`.`NIF` = `GerenteResponsavel`.`fk_nifGerente`;
/*----------------------------------------------------------------------------------------------------*/


/*--------------------------------------- LANÇAMENTO HORAS -------------------------------------------*/
CREATE VIEW vw_lancamentoHoras AS
SELECT `CargaHoraria`.`fk_idProduto`, CargaHoraria.`HorasPessoa`, `CargaHoraria`.`HorasMaquina`, `Usuarios`.`NIF`
    FROM CargaHoraria
    INNER JOIN Usuarios ON `CargaHoraria`.`fk_nifTecnico` = `Usuarios`.`NIF` 
    INNER JOIN Produtos ON `CargaHoraria`.`fk_idProduto` = `Produtos`.`idProduto`
/*----------------------------------------------------------------------------------------------------*/
