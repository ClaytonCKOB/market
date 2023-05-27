const express = require('express');
const app = express();

const productRouter = require('./router/Product');


app.use('/product', productRouter);


app.listen('3001', (err, res) => {
    console.log('everything working');
})