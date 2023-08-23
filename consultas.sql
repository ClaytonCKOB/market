-- Consulta com o nome do clientes cadastrados, quantidade de vendas para cada cliente, mostrando o total gasto por cada cliente, 
-- o limite de crédito:
SELECT c.nome AS cliente, COUNT(distinct r.nota_fiscal) AS num_vendas, SUM(r.valor_final) AS total_gasto, 
	c.limite_credito as limite_credito
FROM clientes c
LEFT JOIN vendas v ON c.id = v.cliente
JOIN resumo_carrinhos r ON v.nota_fiscal = r.nota_fiscal
JOIN pagamentos p ON v.nota_fiscal = p.venda
GROUP BY c.nome,c.limite_credito;

-- Consulta com todas as categorias, a quantidade total vendida em cada uma e o valor total das vendas:
SELECT c.nome,COUNT(categoria) as quantidade,SUM(valor_final) as total_vendido
FROM resumo_carrinhos r
JOIN produtos p USING (cod_barras)
RIGHT JOIN categorias c ON c.id = p.categoria
GROUP BY c.nome;

-- Consulta com o nome dos funcionarios, o turno em que ele trabalha e a soma da vendas que ele fez
SELECT f.nome as funcionario, t.nome as turno, SUM(r.valor_final) as valor_total_das_vendas
FROM vendas v
JOIN resumo_carrinhos r USING (nota_fiscal)
RIGHT JOIN funcionarios f ON v.vendedor = f.id
LEFT JOIN turnos t ON f.turno = t.id
GROUP BY f.nome,t.nome;

-- Consulta de todas as vendas que utilizaram mais de um metodo de pagamento e o valor dela
Select nota_fiscal, SUM(valor_final) as valor
FROM resumo_carrinhos r
JOIN vendas v USING(nota_fiscal)
JOIN pagamentos p ON (p.venda = v.nota_fiscal)
GROUP BY nota_fiscal
HAVING COUNT(distinct metodo_pagamento) > 1;

-- Consulta com a categoria  e o nome de todos produtos que não foram vendidos ainda
SELECT cat.nome as Categoria, p.descricao as Produto 
FROM produtos p
JOIN categorias cat ON (cat.id = p.categoria)
WHERE p.cod_barras NOT IN (	SELECT produto 
							FROM carrinhos);
                            
-- Consulta dos fornecedores que fornecem pelo menos os mesmos produtos (podem fornecer outros) , que o fornecedor com id = 1 e o nome dos produtos
SELECT fornecedores.nome,produtos.descricao
FROM fornecedores
JOIN fornecimentos ON (id = fornecedor)
JOIN produtos ON (produto = cod_barras)
WHERE id <> 1 AND 
	NOT EXISTS(
		SELECT produto 
        FROM fornecimentos 
        WHERE fornecedor = 1 AND
        fornecedor NOT IN ( SELECT DISTINCT produto 
					FROM fornecimentos
                    WHERE fornecedor = fornecedores.id));

-- Consulta que zera os descontos dos produtos fornecidos somente pelo 'Fornecedor B'
SET SQL_SAFE_UPDATES=0;
UPDATE produtos
SET desconto = 0
WHERE cod_barras IN (
	SELECT produto
	FROM fornecimentos
	JOIN fornecedores ON fornecedores.id = fornecimentos.fornecedor
    WHERE produto IN ( 
		SELECT produto 
        FROM fornecimentos 
        where fornecedor = (
			SELECT id 
            from fornecedores 
            where nome = 'Fornecedor B'
            ))
	GROUP BY produto
	HAVING COUNT(produto) = 1);
	
    
-- Consulta que mostra o numero da nota fiscal, o nome do cliente, o total bruto da compra, o total de descontos, 
-- o valor liquido final da compra, a data, o endereço, o nome do funcionario que efetuou a venda, o nome do entregador e
-- o modelo do veiculo utilizado de todas as vendas entregues a noite
SELECT ven.nota_fiscal as nota_fiscal, cli.nome as cliente, SUM(res.valor_total_bruto) as total,
	SUM(res.desconto) as desconto, SUM(res.valor_final) as valor_final, ven.data as data,cli.endereco as endereço,
    vendedor.nome as vendedor,ent.nome as entregador,vei.modelo as veiculo
FROM vendas ven
JOIN resumo_carrinhos res USING(nota_fiscal)
JOIN clientes cli ON ven.cliente = cli.id
LEFT JOIN funcionarios ent ON ven.entregador = ent.CNH
LEFT JOIN funcionarios vendedor ON ven.vendedor = vendedor.id
LEFT JOIN veiculos vei ON vei.id = ven.veiculo
LEFT JOIN turnos tur ON tur.id = ent.turno
WHERE tur.nome = 'Noite'
GROUP BY ven.nota_fiscal