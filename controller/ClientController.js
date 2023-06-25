const db = require('../models');
const { client } = require('../models');

module.exports = {
    create: async (req, res) => {
        await client.create({
            cod: req.body.cod,
            name: req.body.name,
            email: req.body.email,
            cpf: req.body.cpf,
            phone_number: req.body.phone_number,
            address: req.body.address
        }).then(function(e){
            res.send(e.id);
        }).catch((err) => {
            console.log(err);
        });
    },

    list: async (req, res) => {
        await client.findAll().then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        })
    },

    get: async (req, res) => {
        await client.findByPk(req.query.id)
        .then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        });
    },

    delete: async (req, res) => {
        
        let record = await client.findByPk(req.params.id);

        if (record) {
        await record.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    }
}