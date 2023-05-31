const db = require('./models');
const express = require('express');
const app = express();

const productRouter = require('./router/Product');


app.use('/product', productRouter);


db.sequelize.sync({force: true}).then((req) => {
    app.listen('3001', (err, res) => {
        console.log('everything working');
    })
});