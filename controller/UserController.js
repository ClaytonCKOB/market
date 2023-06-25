const db = require('../models');
const { supplier } = require('../models');

module.exports = {
    create: async (req, res) => {
        await supplier.create({
            name: req.body.name,
            company: req.body.company
        }).then(function(e){
            res.send(e.id);
        }).catch((err) => {
            console.log(err);
        });
    },

    list: async (req, res) => {
        await supplier.findAll().then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        })
    },

    get: async (req, res) => {
        await supplier.findByPk(req.query.id)
        .then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        });
    },

    delete: async (req, res) => {
        
        let record = await supplier.findByPk(req.params.id);

        if (record) {
        await record.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    }
}