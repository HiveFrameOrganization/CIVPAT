-- Cria o usuário auth que representa a autenticação
CREATE USER 'auth'@'%' IDENTIFIED BY 'fsY9DS&J*bg#49Vpf^9o';
-- Este usuário será utilizado no login, para conferir as credenciais
GRANT SELECT, UPDATE ON `isihiveframe`.`Usuarios` TO 'auth'@'%';
FLUSH PRIVILEGES;


-- Cria o Role role1 que será utilizado na facilitação de Autorização do usuários
CREATE ROLE role1;
-- Concede ao role1 a habilidade de consultar, inserir e alterar algumas das tabelas abaixo
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`Propostas` TO role1;
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`FollowUp` TO role1;
GRANT SELECT ON `isihiveframe`.`StatusFunil` TO role1;
GRANT SELECT, INSERT ON `isihiveframe`.`Historico` TO role1;
GRANT SELECT ON `isihiveframe`.`TipoPDF` TO role1;
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`PDF` TO role1;
GRANT SELECT ON `isihiveframe`.`ServicoCategoria` TO role1;
GRANT SELECT ON `isihiveframe`.`NomeProduto` TO role1;
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`Produtos` TO role1;
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`Representantes` TO role1;
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`GerenteResponsavel` TO role1;
GRANT SELECT ON `isihiveframe`.`Usuarios` TO role1;
GRANT SELECT ON `isihiveframe`.`CargaHoraria` TO role1;
GRANT SELECT ON `isihiveframe`.`Maquinas` TO role1;
GRANT SELECT ON `isihiveframe`.`UnidadeCriadora` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_kpi` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_home` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_followUp` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_historicoFunil` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_carregarProdutos` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_detalhesPropostas` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_produtosDoTecnico` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_relatorioComMaquina` TO role1;
GRANT SELECT ON `isihiveframe`.`vw_gerentesResponsaveis` TO role1;



-- Cria o usuário coor que representa os Coordenadores
CREATE USER 'coor'@'%' IDENTIFIED BY 'g0J153!eRB64lEsY3SNa';
-- Concede o role1 ao usuário ger
GRANT role1 TO 'coor'@'%';
-- Concede ao coor a habilidade de inserir e alterar as tabelas abaixo
GRANT INSERT, UPDATE ON `isihiveframe`.`StatusFunil` TO 'coor'@'%';
GRANT INSERT, UPDATE ON `isihiveframe`.`TipoPDF` TO 'coor'@'%';
GRANT INSERT, UPDATE ON `isihiveframe`.`ServicoCategoria` TO 'coor'@'%';
GRANT INSERT, UPDATE ON `isihiveframe`.`NomeProduto` TO 'coor'@'%';
GRANT INSERT, UPDATE ON `isihiveframe`.`Usuarios` TO 'coor'@'%';
GRANT INSERT, UPDATE ON `isihiveframe`.`Maquinas` TO 'coor'@'%';
GRANT INSERT ON `isihiveframe`.`CargaHoraria` TO 'coor'@'%';
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`PDF` TO 'coor'@'%';
GRANT SELECT ON `isihiveframe`.`vw_lancamentoHoras` TO 'coor'@'%';
FLUSH PRIVILEGES;


-- Cria o usuário ger que representa os Gerentes
CREATE USER 'ger'@'%' IDENTIFIED BY 'OqxWqi!erb9a&F9Ar750';
-- Concede o role1 ao usuário ger
GRANT role1 TO 'ger'@'%';
-- Concede ao ger a habilidade de inserir e alterar as tabelas abaixo
GRANT INSERT ON `isihiveframe`.`CargaHoraria` TO 'ger'@'%';
GRANT INSERT, UPDATE ON `isihiveframe`.`Usuarios` TO 'ger'@'%';
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`PDF` TO 'ger'@'%';
GRANT SELECT ON `isihiveframe`.`vw_lancamentoHoras` TO 'ger'@'%';
FLUSH PRIVILEGES;


-- Cria o usuário adm que representa a Administração
CREATE USER 'adm'@'%' IDENTIFIED BY 'GPbhjBMD2T9%k&91FND5';
-- Concede o role1 ao usuário adm 
GRANT role1 TO 'adm'@'%';

GRANT INSERT, UPDATE ON `isihiveframe`.`Usuarios` TO 'adm'@'%';
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`PDF` TO 'adm'@'%';
FLUSH PRIVILEGES;


-- Cria o usuário tec que representa os Tecnicos
CREATE USER 'tec'@'%' IDENTIFIED BY '3HY1O9%g5YrcAVu4cVR#';
-- Este terá acesso a visualização das tabelas abaixo
GRANT SELECT ON `isihiveframe`.`Propostas` TO 'tec'@'%';
GRANT SELECT ON `isihiveframe`.`ServicoCategoria` TO 'tec'@'%';
GRANT SELECT ON `isihiveframe`.`NomeProduto` TO 'tec'@'%';
GRANT SELECT, UPDATE ON `isihiveframe`.`Produtos` TO 'tec'@'%';
GRANT SELECT, UPDATE ON `isihiveframe`.`Usuarios` TO 'tec'@'%';
GRANT SELECT ON `isihiveframe`.`Maquinas` TO 'tec'@'%';
-- e só poderá inserir ou alterar na tabela Carga Horária
GRANT SELECT, INSERT, UPDATE ON `isihiveframe`.`CargaHoraria` TO 'tec'@'%';
GRANT SELECT ON `isihiveframe`.`UnidadeCriadora` TO 'tec'@'%';
GRANT SELECT ON `isihiveframe`.`vw_produtos` TO 'tec'@'%';
GRANT SELECT ON `isihiveframe`.`vw_lancamentoHoras` TO 'tec'@'%';
GRANT SELECT ON `isihiveframe`.`vw_relatorioSemMaquina` TO 'tec'@'%';

FLUSH PRIVILEGES;


-- Ativa os Roles de cada Usuário
SET DEFAULT ROLE ALL TO
  'coor'@'%',
  'adm'@'%',
  'ger'@'%',
  'tec'@'%';


-- Criar um usuário para ser utilizado durante os testes
CREATE USER 'teste'@'172.20.0.1' IDENTIFIED BY 'P4ssword';
GRANT ALL PRIVILEGES ON isihiveframe.* TO 'teste'@'172.20.0.1';
FLUSH PRIVILEGES;
