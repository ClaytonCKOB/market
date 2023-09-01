-- O trigger checa_limite_de_credito_antes_de_inserir
-- e a stored procedure tem_credito_suficiente
-- tem como objetivo garantir que ao inserir um pagamento
-- o cliente possua credito suficiente para efetuar a compra

DELIMITER //
DROP TRIGGER IF EXISTS checa_limite_de_credito_antes_de_inserir;
CREATE TRIGGER checa_limite_de_credito_antes_de_inserir 
BEFORE INSERT ON pagamentos FOR EACH ROW
BEGIN
    IF NEW.metodo_pagamento = 7 THEN
		BEGIN
			DECLARE tem_credito BOOLEAN;

			CALL tem_credito_suficiente(NEW.valor, NEW.venda, tem_credito);
			IF NOT tem_credito THEN
				SIGNAL SQLSTATE '45000'
				SET MESSAGE_TEXT = 'Cliente não possui limite suficiente.';
			END IF;
		END;
    END IF;
END;
//


DELIMITER //
DROP PROCEDURE IF EXISTS tem_credito_suficiente;
CREATE PROCEDURE tem_credito_suficiente (IN valor FLOAT(6,2), IN venda INT UNSIGNED, OUT eh_suficiente BOOLEAN)
	BEGIN
        DECLARE limite_credito FLOAT(6,2);
    
		SELECT limite_credito INTO limite_credito 
        FROM vendas v 
        JOIN clientes c ON v.cliente = c.id
        WHERE c.id = cliente AND
        v.nota_fiscal = venda; 
		
		-- Check if there is enough credit
		IF limite_credito >= valor THEN
			SET eh_suficiente = TRUE;
		ELSE
			SET eh_suficiente = FALSE;
		END IF;
	END
//

DELIMITER ;