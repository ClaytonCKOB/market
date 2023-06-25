const db = require('../models');
const { market } = require('../models');

module.exports = {
    create: async (req, res) => {
        await market.create({
            name: req.body.name,
            cnpj: req.body.cnpj,
        }).then(function(e){
            res.send(e.id);
        }).catch((err) => {
            console.log(err);
        });
    },

    list: async (req, res) => {
        await market.findAll().then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        })
    },

    get: async (req, res) => {
        await market.findByPk(req.query.id)
        .then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        });
    },

    delete: async (req, res) => {
        
        let record = await market.findByPk(req.params.id);

        if (record) {
        await record.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    }
}