delimiter \\

drop database market;
create database market;
use market;

CREATE TABLE IF NOT EXISTS categorias (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	nome VARCHAR(40) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS fornecedores (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	nome VARCHAR(40) NOT NULL,
	cpf_cnpj VARCHAR(20) NOT NULL UNIQUE,
	telefone VARCHAR (11) NOT NULL,
	email VARCHAR(40) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS produtos (
	cod_barras INT UNSIGNED AUTO_INCREMENT NOT NULL,
	descricao VARCHAR(50) NOT NULL,
	custo FLOAT(6, 2) NOT NULL,
	preco FLOAT(6, 2) NOT NULL,
	categoria INT UNSIGNED,
	desconto FLOAT(6,2),
	PRIMARY KEY (cod_barras),
	FOREIGN KEY (categoria) 
		REFERENCES categorias(id)
		ON DELETE SET NULL
        ON UPDATE CASCADE,
	CHECK ((preco > custo) and custo > 0 and preco > 0) 
);



CREATE TABLE IF NOT EXISTS fornecimentos(
	produto INT UNSIGNED NOT NULL,
	fornecedor INT UNSIGNED NOT NULL,
	PRIMARY KEY (produto,fornecedor),
	FOREIGN KEY (produto) 
		REFERENCES produtos(cod_barras)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (fornecedor) 
		REFERENCES fornecedores(id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS metodo_pagamentos (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
	nome VARCHAR(40) UNIQUE,
	PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS clientes (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	nome VARCHAR(40) NOT NULL,
	cpf VARCHAR(11) UNIQUE NOT NULL,
	endereco VARCHAR(30) NOT NULL,
	email VARCHAR(40),
	telefone VARCHAR(11),
	receber_oferta BOOLEAN,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS turnos (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	nome VARCHAR(30),
	inicio TIME,
	fim TIME,
	PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS funcionarios (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	cpf VARCHAR (11) UNIQUE NOT NULL,
	nome VARCHAR(40) NOT NULL,
	CNH VARCHAR (11) UNIQUE,
    turno INT UNSIGNED,
	usuario VARCHAR(40) UNIQUE,
	senha VARCHAR(40),
	PRIMARY KEY (id),
    FOREIGN KEY (turno) 
		REFERENCES turnos(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS veiculos (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
	CRV VARCHAR(11) NOT NULL UNIQUE,
	placa VARCHAR(7) NOT NULL UNIQUE,
	modelo VARCHAR(40) NOT NULL,
	cor VARCHAR(15) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS vendas (
	nota_fiscal INT UNSIGNED NOT NULL,
	cliente INT UNSIGNED,
	data DATETIME NOT NULL,
    vendedor  INT UNSIGNED NOT NULL,
    entregador VARCHAR (11),
    veiculo INT UNSIGNED,
	PRIMARY KEY (nota_fiscal),
	FOREIGN KEY (cliente) REFERENCES clientes(id),
    FOREIGN KEY (vendedor) REFERENCES funcionarios(id),
    FOREIGN KEY (entregador) REFERENCES funcionarios(CNH),
    FOREIGN KEY (veiculo) REFERENCES veiculos(id),
    check( (veiculo is null and entregador is null) or (veiculo is not null and entregador is not null))
);

CREATE TABLE IF NOT EXISTS pagamentos (
	metodo_pagamento INT UNSIGNED NOT NULL, 
	venda  INT UNSIGNED NOT NULL,
	valor FLOAT(6, 2),
	PRIMARY KEY (metodo_pagamento,venda),
	FOREIGN KEY (metodo_pagamento) 
		REFERENCES metodo_pagamentos(id)
		ON UPDATE CASCADE,
	FOREIGN KEY (venda) 
		REFERENCES vendas(nota_fiscal)
		ON UPDATE CASCADE,
    check(valor > 0)
);


CREATE TABLE IF NOT EXISTS carrinhos(
	venda INT UNSIGNED NOT NULL,
	produto INT UNSIGNED NOT NULL,
	quantidade INT UNSIGNED NOT NULL,
	PRIMARY KEY (produto,venda),
	FOREIGN KEY (produto) REFERENCES produtos(cod_barras),
	FOREIGN KEY (venda) 
		REFERENCES vendas(nota_fiscal)
		ON UPDATE CASCADE,
    check(quantidade > 0)
);



-- Nro nota fiscal, valor total, subtotal, descontos, ...  Vendas -> Carrinho -> Produtos]
CREATE VIEW resumo_carrinhos AS
SELECT venda as nota_fiscal,cod_barras,descricao,quantidade,preco, (preco * quantidade) as valor_total_bruto,
		(preco * quantidade * desconto/100) as desconto,
		((preco * quantidade) - (preco * quantidade * desconto/100)) as valor_final
FROM carrinhos car 
JOIN produtos pro ON (car.produto = pro.cod_barras);

INSERT INTO categorias (nome) VALUES
('Alimentos'),
('Bebidas'),
('Higiene'),
('Limpeza'),
('Eletrônicos');

INSERT INTO metodo_pagamentos (nome) VALUES
('Dinheiro'),
('Cartão de Crédito'),
('Cartão de Débito'),
('Pix'),
('Transferência Bancária'),
('Vale alimentação');

INSERT INTO fornecedores (nome, telefone, email, cpf_cnpj) VALUES
('Fornecedor A', '1234567890', 'fornecedorA@example.com','10301031010'),
('Fornecedor B', '9876543210', 'fornecedorB@example.com','0130120310013'),
('Vendedor C', '5555555555', 'vendedorC@example.com','102303010320'),
('Vendedor D', '5555555554', 'vendedorD@example.com','102344410320');

INSERT INTO produtos (descricao, custo, preco, desconto, categoria) VALUES
('Arroz', 2.50, 5.00, 10.00, 1),
('Refrigerante', 1.00, 2.50, 0, 2),
('Sabonete', 0.50, 1.20, 10.00, 3),
('TV LED', 300.00, 450.00, 30.00, 5),
('Laptop', 600.00, 850.00, 0, 5),
('Feijão', 3.00, 6.50, 0, 1),
('Água Mineral', 0.80, 1.50, 0, 2),
('Shampoo', 1.50, 3.00, 5, 3),
('Smartphone', 200.00, 300.00, 0, 5),
('Mouse', 10.00, 15.00, 0, 5);

INSERT INTO clientes (nome, cpf, endereco, telefone, email) VALUES
('João da Silva', '12345678901', 'Rua A, 123', '987654321', 'joao@example.com'),
('Maria Oliveira', '98765432101', 'Avenida B, 456', '123456789', 'maria@example.com');

INSERT INTO turnos (nome, inicio, fim) VALUES
('Integral','08:00:00', '18:00:00'),
('Manhã', '08:00:00', '12:00:00'),
('Tarde', '13:00:00', '18:00:00'),
('Noite', '18:00:00', '22:00:00');


INSERT INTO funcionarios (nome, cpf, usuario, senha,CNH, turno) VALUES
('Pedro Souza', '55555555555','pedro',  'senha123','12345678910',1),
('Marcelo Pereira', '11111111111','jorge',  'senha123','12342923910',4),
('Ana Santos', '66666666666',  null, null,null,3),
('Jorge Kritz', '22222222222',  null, null,null,2);

INSERT INTO fornecimentos(fornecedor,produto) VALUES
(1,1),
(1,2),
(1,3),
(2,4),
(2,5),
(2,6),
(3,6),
(3,7),
(3,8),
(3,9),
(3,10),
(4,1),
(4,2),
(4,3);

INSERT INTO veiculos(CRV ,placa, modelo, cor) VALUES
('12345678910','ASB23JN','Fiorino 2005','Vermelho'),
('12345678920','ALB23JN','Kombi 1995','Branco'),
('12345678980','ABB23JN','Parati 2008','Azul');

INSERT INTO vendas (nota_fiscal, cliente, data, vendedor, entregador, veiculo) VALUES
(0, 1, NOW(), 3,'12345678910', 2),
(1, 2, NOW(), 3,'12342923910', 1),
(2, null, NOW(),4, null , null);

INSERT INTO carrinhos(venda,produto,quantidade) VALUES
(0,2,3),
(0,1,2),
(0,3,1),
(0,9,1),
(0,10,2),
(0,7,3),
(1,2,2),
(1,1,1),
(1,9,1),
(2,10,1),
(2,7,2),
(2,2,3),
(2,1,5),
(2,9,1);
-- select nota_fiscal, SUM(valor_final) from resumo_carrinhos group by nota_fiscal order by nota_fiscal 
INSERT INTO pagamentos(metodo_pagamento, venda , valor) VALUES
(2,0,352.08),
(1,1,200),
(4,1,109.5),
(1,2,200),
(2,2,148);
