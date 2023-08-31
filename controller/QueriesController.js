const db = require("../models");
const sequelize = db.sequelize;

module.exports = {
  query1: async (req, res) => {
    sequelize
      .query(
        `SELECT c.name, COUNT(distinct r.invoice) , SUM(r.final_value),c.credit_limit
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
        `SELECT c.name,COUNT(category) ,SUM(final_value)
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
        `SELECT f.name , t.name, SUM(r.final_value)
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
        `Select invoice, SUM(final_value)
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
        `SELECT cat.name, p.description 
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
    sequelize
      .query(
        `SELECT suppliers.name, products.description
        FROM suppliers
        JOIN supplies ON (suppliers.id = supplies.supplier)
        JOIN products ON (product = cod)
        WHERE suppliers.id <> 1 AND 
            NOT EXISTS(
                SELECT product 
                FROM supplies 
                WHERE supplier = 1 AND
                supplier NOT IN ( SELECT DISTINCT product 
                            FROM supplies
                            WHERE supplier = suppliers.id));`
      )
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  query7: async (req, res) => {
    sequelize
      .query(
        `UPDATE products
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
                    where name = 'FORNECEDOR B'
                    ))
            GROUP BY product
            HAVING COUNT(product) = 1);`
      )
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  query8: async (req, res) => {
    sequelize
      .query(
        `SELECT ven.invoice , cli.name, SUM(res.total_value),
        SUM(res.discount) , SUM(res.final_value) , ven.data ,cli.address ,
        worker.name, ent.name ,vei.model
        FROM sells ven
        JOIN cart_resume res USING(invoice)
        JOIN clients cli ON ven.client = cli.id
        LEFT JOIN workers ent ON ven.entregador = ent.CNH
        LEFT JOIN workers worker ON ven.worker = worker.id
        LEFT JOIN vehicles vei ON vei.id = ven.vehicle
        LEFT JOIN shifts tur ON tur.id = ent.shift
        WHERE tur.name = 'Noite'
        GROUP BY ven.invoice`
      )
      .then((result) => {
        res.send(result[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
