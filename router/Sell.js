const express = require('express');
const router = express.Router();

const Sell = require('../controller/SellController')

router.post('/create', Sell.create);
router.get('/list', Sell.list);
router.get('/get', Sell.get);
router.delete('/delete/:id', Sell.delete);

module.exports = router;