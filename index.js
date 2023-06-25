const db = require('./models');
const express = require('express');
const cors = require('cors');
const app = express();
const productRouter = require('./router/Product');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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