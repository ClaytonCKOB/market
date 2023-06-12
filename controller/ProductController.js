const db = require('../models');
const { product } = require('../models');

module.exports = {
    create: async (req, res) => {
        let id = '';
        await product.create({
            cod: '21341325',
            description: 'teste',
            price: 1,
            cost: 1
        }).then(function(e){
            res.send(e);
        }).catch((err) => {
            if(err){
                console.log(err);
            }
        });
        
        // res.send(result);
    },

    list: async (req, res) => {
        let result = await product.findAll().then(function(e){
            console.log(e);
            res.send(e);
        })
    },

    get: async (req, res) => {
        let result = await product.findAll().then(function(e){
            console.log(e);
            res.send(e);
        })
    },

    delete: async (req, res) => {
        let result = await product.findAll().then(function(e){
            console.log(e);
            res.send(e);
        })
    },
}