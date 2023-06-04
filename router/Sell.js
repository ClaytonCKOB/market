const express = require('express');
const router = express.Router();

const Sell = require('../controller/SellController')

router.post('/create', Sell.create);
router.get('/list', Sell.list);
router.get('/get', Sell.get);
router.post('/delete', Sell.delete);

module.exports = router;