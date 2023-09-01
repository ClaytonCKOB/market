const db = require("../models");
const sequelize = db.sequelize;
const { supplier } = require("../models");

module.exports = {
  query1: async (req, res) => {
    sequelize
      .query(
        `SELECT c.name as Nome, COUNT(distinct r.invoice) as Nota_fiscal, SUM(r.final_value) as Valor_das_compras,c.credit_limit as Limite_de_credito
                        FROM clients c
                        LEFT JOIN sells v ON c.id = v.client
                        JOIN cart_resume r ON v.invoice = r.invoice
                        JOIN payments p ON v.invoice = p.sell
                        GROUP BY c.name,c.credit_limit;`
      )
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  query2: async (req, res) => {
    sequelize
      .query(
        `SELECT c.name as Categoria,COUNT(category) as Itens_vendidos,SUM(final_value) as Valor_total
                        FROM cart_resume r
                        JOIN products p USING (cod)
                        RIGHT JOIN categories c ON c.id = p.category
                        GROUP BY c.name;`
      )
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  query3: async (req, res) => {
    sequelize
      .query(
        `SELECT f.name as Funcionario, t.name as Turno, SUM(r.final_value) as Valor_das_vendas
                        FROM sells v
                        JOIN cart_resume r USING (invoice)
                        RIGHT JOIN workers f ON v.clerk = f.id
                        LEFT JOIN shifts t ON f.shift = t.id
                        GROUP BY f.name,t.name;`
      )
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  query4: async (req, res) => {
    sequelize
      .query(
        `Select invoice as Nota_fiscal, SUM(final_value) as Valor_total
        FROM cart_resume r
        JOIN sells v USING(invoice)
        JOIN payments p ON (p.sell = v.invoice)
        GROUP BY invoice
        HAVING COUNT(distinct payment_method) > 1;`
      )
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  query5: async (req, res) => {
    sequelize
      .query(
        `SELECT cat.name as Categoria, p.description as Produto
        FROM products p
        JOIN categories cat ON (cat.id = p.category)
        WHERE p.cod NOT IN (	SELECT product 
                                    FROM carts);`
      )
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  query6: async (req, res) => {
    console.log(req.query.param);
    
    try {
      const sup = await supplier.findOne({
        attributes: ["id"],
        where: {
          name: req.query.param,
        },
      });

      console.log(sup);
  
      if (!sup || !sup.dataValues || sup.dataValues.id === null) {
        res.status(404).send("Supplier not found");
        return;
      }
  
      const id = sup.dataValues.id;
  
      console.log("Supplier: ", id);
  
      const query = `SELECT suppliers.name as Nome, products.description as Produto
        FROM suppliers
        JOIN supplies ON (suppliers.id = supplies.supplier)
        JOIN products ON (product = cod)
        WHERE suppliers.id <> ${id} AND 
            NOT EXISTS(
                SELECT product 
                FROM supplies 
                WHERE supplier = ${id} AND
                supplier NOT IN ( SELECT DISTINCT product 
                            FROM supplies
                            WHERE supplier = suppliers.id));`;
  
      sequelize
        .query(query)
        .then((result) => {
          res.send(result[0]);
        })
        .catch((err) => {
          res.status(500).send("Internal server error");
        });
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  },

  query7: async (req, res) => {
    const supplier = req.query.param.toUpperCase();

    const query = `UPDATE products
    SET discount = 0
    WHERE cod IN (
        SELECT product
        FROM supplies
        JOIN suppliers ON suppliers.id = supplies.supplier
        WHERE product IN ( 
            SELECT product 
            FROM supplies 
            where supplier = (
                SELECT id 
                from suppliers 
                where name = '${supplier}'
                ))
        GROUP BY product
        HAVING COUNT(product) = 1);`;
    sequelize
      .query(query)
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  query8: async (req, res) => {
    const shift = formatParam(req.query.param);

    const query = `SELECT ven.invoice as Nota_fiscal , cli.name as Nome, SUM(res.total_value) as Valor_total,
    SUM(res.discount) as Desconto, SUM(res.final_value) as Valor_final, ven.date as Data,cli.address as Endereço,
    clerk.name as Vendedor, ent.name as Entregador,vei.model as Veiculo
    FROM sells ven
    JOIN cart_resume res USING(invoice)
    JOIN clients cli ON ven.client = cli.id
    LEFT JOIN workers ent ON ven.deliveryman = ent.CNH
    LEFT JOIN workers clerk ON ven.clerk = clerk.id
    LEFT JOIN vehicles vei ON vei.id = ven.vehicle
    LEFT JOIN shifts tur ON tur.id = ent.shift
    WHERE tur.name = '${shift}'
    GROUP BY ven.invoice`;

    sequelize
      .query(query)
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },
};

const formatParam = (param) => {
  return param.toLowerCase().charAt(0).toUpperCase() + param.slice(1);
};
