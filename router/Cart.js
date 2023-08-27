const express = require('express');
const router = express.Router();

const Cart = require('../controller/CartController')

router.post('/create', Cart.create);
router.get('/list', Cart.list);
router.get('/get', Cart.get);
router.delete('/delete/:id', Cart.delete);

module.exports = router;