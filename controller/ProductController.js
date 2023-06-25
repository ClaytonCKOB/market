const db = require('../models');
const { product } = require('../models');

module.exports = {
    create: async (req, res) => {
        await product.create({
            cod: req.body.cod,
            description: req.body.description,
            price: req.body.price,
            cost: req.body.cost
        }).then(function(e){
            res.send(e.id);
        }).catch((err) => {
            console.log(err);
        });
    },

    list: async (req, res) => {
        await product.findAll().then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        })
    },

    get: async (req, res) => {
        await product.findByPk(req.query.id)
        .then(function(e){
            res.send(e);
        }).catch((err) => {
            console.log(err);
        });
    },

    delete: async (req, res) => {
        
        let record = await product.findByPk(req.params.id);

        if (record) {
        await record.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    },

    createTestRecords: async (req, res) => {
        const products = [];

        for(let i = 0; i < 50; i++){
            products.push({
                cod: '2000000'+i,
                description: 'Test product ' + i,
                price: i,
                cost: i
            })
        }

        product.bulkCreate(products).then(
            function(e){
                return res.send(e);
            }
        ).catch((err) => {
            if(err){
                console.log(err);
            }
        });



    }
}