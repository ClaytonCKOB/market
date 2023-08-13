--Consulta de vendas realizadas por cliente, mostrando o total gasto por cada cliente:

SELECT c.nome AS cliente, COUNT(*) AS num_vendas, SUM(v.total) AS total_gasto
FROM cliente c
LEFT JOIN venda v ON c.id = v.cliente
GROUP BY c.nome;

-- Consulta de produtos vendidos em cada categoria, com a quantidade total vendida e o preço médio:

SELECT cat.nome AS categoria, p.descricao AS produto, SUM(vd.quantidade) AS quantidade_vendida, AVG(p.preco) AS preco_medio
FROM categoria cat
JOIN produto p ON cat.id = p.categoria
LEFT JOIN venda_detalhes vd ON p.descricao = vd.produto
GROUP BY cat.nome, p.descricao;

-- Consulta de clientes que compraram mais de 3 vezes e gastaram mais de R$100 em cada compra:

SELECT c.nome AS cliente, COUNT(*) AS num_compras, SUM(v.total) AS total_gasto
FROM cliente c
JOIN venda v ON c.id = v.cliente
GROUP BY c.nome
HAVING num_compras > 3 AND MIN(total_gasto) > 100;

-- Consulta dos produtos que não foram vendidos ainda:

SELECT p.descricao AS produto
FROM produto p
WHERE NOT EXISTS (SELECT * FROM venda_detalhes vd WHERE p.descricao = vd.produto);

-- Consulta dos fornecedores que não possuem nenhum produto cadastrado:

SELECT f.nome AS fornecedor
FROM fornecedor f
WHERE NOT EXISTS (SELECT * FROM produto p WHERE f.id = p.fornecedor);

-- Consulta das vendas que foram realizadas utilizando o método de pagamento "Dinheiro":

SELECT v.id AS venda_id, c.nome AS cliente, v.total
FROM venda v
JOIN cliente c ON v.cliente = c.id
WHERE v.metodo_pagamento = (SELECT id FROM metodo_pagamento WHERE descricao = 'Dinheiro');

-- Consulta de produtos vendidos com descontos acima de 20%:

SELECT p.descricao AS produto, vd.quantidade, d.porcentagem AS desconto
FROM produto p
JOIN venda_detalhes_aux vd ON p.descricao = vd.produto
JOIN venda v ON vd.venda_id = v.id
JOIN descontos d ON v.desconto = d.id AND d.porcentagem > 20;

-- Consulta de clientes que compraram produtos da categoria "Alimentos" e "Bebidas":

SELECT c.nome AS cliente, p.descricao AS produto
FROM cliente c
JOIN venda v ON c.id = v.cliente
JOIN venda_detalhes_aux vd ON v.id = vd.venda_id
JOIN produto p ON vd.produto = p.descricao
JOIN categoria cat ON p.categoria = cat.id
WHERE cat.nome IN ('Alimentos', 'Bebidas');