delimiter \\
CREATE TABLE IF NOT EXISTS categoria (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS metodo_pagamento (
  id INT NOT NULL AUTO_INCREMENT, 
  descricao VARCHAR(40),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS fornecedor (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(40) NOT NULL,
  telefone INT UNSIGNED NOT NULL,
  email VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cliente (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(40),
  email VARCHAR(40),
  cpf VARCHAR(11) UNIQUE,
  telefone VARCHAR(11),
  endereco VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS produto (
  cod_barras INT UNSIGNED AUTO_INCREMENT NOT NULL,
  descricao VARCHAR(50) NOT NULL,
  custo FLOAT(6, 2),
  preco FLOAT(6, 2) NOT NULL,
  fornecedor INT,
  categoria INT,
  PRIMARY KEY (cod_barras),
  FOREIGN KEY (fornecedor) REFERENCES fornecedor(id),
  FOREIGN KEY (categoria) REFERENCES categoria(id),
  CHECK (preco > custo)
);

CREATE TABLE IF NOT EXISTS venda (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  produtos JSON,
  total FLOAT(6, 2),
  desconto FLOAT(6, 2),
  cliente INT UNSIGNED,
  date DATETIME,
  metodo_pagamento INT UNSIGNED,
  PRIMARY KEY (id),
  FOREIGN KEY (cliente) REFERENCES cliente(id),
  FOREIGN KEY (metodo_pagamento) REFERENCES metodo_pagamento(id),
  CHECK (total > 0)
);

CREATE TABLE IF NOT EXISTS descontos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  porcentagem FLOAT(5, 2),
  quantidade INT UNSIGNED,
  formula VARCHAR(40),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS funcionarios (
  cpf INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(40),
  gerente SMALLINT,
  usuario VARCHAR(40),
  senha VARCHAR(40),
  PRIMARY KEY (cpf)
);

CREATE TABLE IF NOT EXISTS turno (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(30),
  inicio TIME,
  fim TIME,
  PRIMARY KEY (id)
);

CREATE VIEW venda_detalhes AS
SELECT v.id AS venda_id, v.date, p.descricao AS produto, vd.quantidade, c.nome AS cliente
FROM venda v
JOIN produto p ON JSON_CONTAINS(v.produtos, CAST(CONCAT('{"produto_id": ', p.cod_barras, '}') AS JSON))
JOIN venda_detalhes_aux vd ON v.id = vd.venda_id
LEFT JOIN cliente c ON v.cliente = c.id;

INSERT INTO categoria (nome) VALUES
  ('Alimentos'),
  ('Bebidas'),
  ('Higiene'),
  ('Limpeza'),
  ('Eletrônicos');

INSERT INTO metodo_pagamento (descricao) VALUES
  ('Dinheiro'),
  ('Cartão de Crédito'),
  ('Cartão de Débito'),
  ('Pix'),
  ('Transferência Bancária');

INSERT INTO fornecedor (nome, telefone, email) VALUES
  ('Fornecedor A', 1234567890, 'fornecedorA@example.com'),
  ('Fornecedor B', 9876543210, 'fornecedorB@example.com'),
  ('Vendedor C', 5555555555, 'vendedorC@example.com');

INSERT INTO produto (descricao, custo, preco, fornecedor, categoria) VALUES
  ('Arroz', 2.50, 5.00, 1, 1),
  ('Refrigerante', 1.00, 2.50, 2, 2),
  ('Sabonete', 0.50, 1.20, 1, 3),
  ('TV LED', 300.00, 450.00, 3, 5),
  ('Laptop', 600.00, 850.00, 3, 5),
  ('Feijão', 3.00, 6.50, 1, 1),
  ('Água Mineral', 0.80, 1.50, 2, 2),
  ('Shampoo', 1.50, 3.00, 1, 3),
  ('Smartphone', 200.00, 300.00, 3, 5),
  ('Mouse', 10.00, 15.00, 3, 5);

INSERT INTO descontos (porcentagem, quantidade, formula) VALUES
  (10.00, 100, 'Desconto de 10% em compras acima de R$100'),
  (25.00, 3, '25% de desconto na compra de 3 produtos ou mais'),
  (100.00, 5, 'Leve 5 produtos e pague somente 4');

INSERT INTO cliente (nome, cpf, endereco, telefone, email) VALUES
  ('João da Silva', '12345678901', 'Rua A, 123', '987654321', 'joao@example.com'),
  ('Maria Oliveira', '98765432101', 'Avenida B, 456', '123456789', 'maria@example.com');

INSERT INTO turno (nome, inicio, fim) VALUES
  ('Manhã', '08:00:00', '12:00:00'),
  ('Tarde', '13:00:00', '18:00:00'),
  ('Noite', '18:00:00', '22:00:00');

INSERT INTO funcionarios (nome, cpf, gerente, usuario, senha) VALUES
  ('Pedro Souza', '55555555555', 1, 'pedro', 'senha123'),
  ('Ana Santos', '66666666666', 0, 'ana', 'senha456');

INSERT INTO venda (produtos, total, desconto, cliente, date, metodo_pagamento) VALUES
  ('[{"produto_id": 1, "quantidade": 2}, {"produto_id": 2, "quantidade": 3}]', 15.50, 2.00, 1, NOW(), 2),
  ('[{"produto_id": 4, "quantidade": 1}, {"produto_id": 5, "quantidade": 1}]', 130.00, 10.00, NULL, NOW(), 1);
