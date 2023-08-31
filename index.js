const db = require("./models");
const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./router/Product");
const queriesRouter = require("./router/Queries");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/product", productRouter);

app.use("/queries", queriesRouter);


app.use(cors());

app.get("/", (res, req) => {
  res.render("/client/src/App.js");
});

db.sequelize.sync({ force: true }).then((req) => {
  app.listen("3001", async (err, res) => {
    console.log("everything working");
    db.sequelize.query(
      "CREATE OR REPLACE VIEW cart_resume AS SELECT sell as invoice,cod,description,quantity,price, (price * quantity) as total_value, (price * quantity * discount/100) as discount, ((price * quantity) - (price * quantity * discount/100)) as final_value FROM carts car JOIN products pro ON (car.product = pro.cod);"
    );
    await insertData(db.sequelize);
  });
});

const insertData = async (sequelize) => {
  try {
    await sequelize.query(`
              INSERT INTO categories (name) VALUES
              ('Alimentos'),
              ('Bebidas'),
              ('Higiene'),
              ('Limpeza'),
              ('Eletrônicos');
            `);

    await sequelize.query(`
              INSERT INTO payment_methods (name) VALUES
              ('Dinheiro'),
              ('Cartão de Crédito'),
              ('Cartão de Débito'),
              ('Pix'),
              ('Transferência Bancária'),
              ('Vale alimentação'),
              ('Crédito');
            `);

    await sequelize.query(`
              INSERT INTO suppliers (name, phone_number, email, cpf_cnpj) VALUES
              ('Fornecedor A', '1234567890', 'fornecedorA@example.com','10301031010'),
              ('Fornecedor B', '9876543210', 'fornecedorB@example.com','0130120310013'),
              ('Vendedor C', '5555555555', 'vendedorC@example.com','102303010320'),
              ('Vendedor D', '5555555554', 'vendedorD@example.com','102344410320');
            `);
    await sequelize.query(`
            INSERT INTO products (description, cost, price, discount, category) VALUES
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
          `);

    // Insert into clientes table
    await sequelize.query(`
            INSERT INTO clients (name, cpf, address, phone_number, email, credit_limit) VALUES
            ('João da Silva', '12345678901', 'Rua A, 123', '987654321', 'joao@example.com', 1500),
            ('Maria Oliveira', '98765432101', 'Avenida B, 456', '123456789', 'maria@example.com', 0);
          `);

    // Insert into turnos table
    await sequelize.query(`
            INSERT INTO shifts (name, start, end) VALUES
            ('Integral', '08:00:00', '18:00:00'),
            ('Manhã', '08:00:00', '12:00:00'),
            ('Tarde', '13:00:00', '18:00:00'),
            ('Noite', '18:00:00', '22:00:00');
          `);
    await sequelize.query(`
          INSERT INTO workers (name, cpf, user, password, CNH, shift) VALUES
          ('Pedro Souza', '55555555555', 'pedro', 'senha123', '12345678910', 1),
          ('Marcelo Pereira', '11111111111', 'jorge', 'senha123', '12342923910', 4),
          ('Ana Santos', '66666666666', null, null, null, 3),
          ('Jorge Kritz', '22222222222', null, null, null, 2);
        `);
    await sequelize.query(`
          INSERT INTO supplies (supplier, product) VALUES
          (1, 1),
          (1, 2),
          (1, 3),
          (2, 4),
          (2, 5),
          (2, 6),
          (3, 6),
          (3, 7),
          (3, 8),
          (3, 9),
          (3, 10),
          (4, 1),
          (4, 2),
          (4, 3);
        `);

    await sequelize.query(`
          INSERT INTO vehicles (CRV, license_plate, model, color) VALUES
          ('12345678910', 'ASB23JN', 'Fiorino 2005', 'Vermelho'),
          ('12345678920', 'ALB23JN', 'Kombi 1995', 'Branco'),
          ('12345678980', 'ABB23JN', 'Parati 2008', 'Azul');
        `);

        await sequelize.query(`
        INSERT INTO sells (invoice, client, date, clerk, deliveryman, vehicle) VALUES
        (0, 1, NOW(), 3, '12345678910', 2),
        (1, 2, NOW(), 3, '12342923910', 1),
        (2, null, NOW(), 4, null, null),
        (3, 1, NOW(), 4, '12342923910', 2);
      `);
    
      // Insert into carrinhos table
      await sequelize.query(`
        INSERT INTO carts (sell, product, quantity) VALUES
        (0, 2, 3),
        (0, 1, 2),
        (0, 3, 1),
        (0, 9, 1),
        (0, 10, 2),
        (0, 7, 3),
        (1, 2, 2),
        (1, 1, 1),
        (1, 9, 1),
        (2, 10, 1),
        (2, 7, 2),
        (2, 2, 3),
        (2, 1, 5),
        (2, 9, 1),
        (3, 3, 3),
        (3, 2, 2),
        (3, 1, 1),
        (3, 9, 1),
        (3, 10, 1),
        (3, 7, 2);
      `);
    
      // Insert into pagamentos table
      await sequelize.query(`
        INSERT INTO payments (payment_method, sell, value) VALUES
        (2, 0, 352.08),
        (1, 1, 200),
        (4, 1, 109.5),
        (1, 2, 200),
        (2, 2, 148),
        (7, 3, 330.74);
      `);
    

    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};
