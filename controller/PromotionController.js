const db = require('../models');
const { promotion } = require('../models');

module.exports = {
    create: async (req, res) => {
        await promotion.create({
            product: req.body.product,
            category: req.body.category
        }).then(function(e){
            res.send(e.id);
        }).catch((err) => {
            console.log(err);
        });
    },

    list: async (req, res) => {
        await promotion.findAll().then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        })
    },

    get: async (req, res) => {
        await promotion.findByPk(req.query.id)
        .then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        });
    },

    delete: async (req, res) => {
        
        let record = await promotion.findByPk(req.params.id);

        if (record) {
        await record.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    }
}