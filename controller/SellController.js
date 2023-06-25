const db = require('../models');
const { sell } = require('../models');

module.exports = {
    create: async (req, res) => {
        await sell.create({
            products: req.body.products,
            total: req.body.total,
            discount: req.body.discount,
            client: req.body.client,
            user: req.body.user,
            date: req.body.date,
            payment_method: req.body.payment_method,
        }).then(function(e){
            res.send(e.id);
        }).catch((err) => {
            console.log(err);
        });
    },

    list: async (req, res) => {
        await sell.findAll().then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        })
    },

    get: async (req, res) => {
        await sell.findByPk(req.query.id)
        .then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        });
    },

    delete: async (req, res) => {
        
        let record = await sell.findByPk(req.params.id);

        if (record) {
        await record.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    }
}