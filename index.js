const db = require('./models');
const express = require('express');
const cors = require('cors');
const app = express();



const productRouter = require('./router/Product');
app.use('/product', productRouter);

app.use(cors());

app.get('/', (res, req) => {
    res.render('/client/src/App.js');
});


db.sequelize.sync({force: true}).then((req) => {
    app.listen('3001', (err, res) => {
        console.log('everything working');
    })
});