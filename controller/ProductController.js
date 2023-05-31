const { Product } = require('../models');

module.exports = {
    create: async (req, res) => {
        let id = '';
        let result = await Product.create({
            cod: '21341325',
            description: 'teste',
            price: 1
        }).then(function(e){
            console.log(e);
            id = e;
        }).catch((err) => {
            if(err){
                console.log(err);
            }
        });
        
        res.send(result);
    },

    list: async (req, res) => {
        let result = await Product.findAll().then(function(e){
            console.log(e);
        })
        
        res.send(result);
    },
}