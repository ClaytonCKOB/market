const express = require('express');
const router = express.Router();

const Market = require('../controller/MarketController')

router.post('/create', Market.create);
router.get('/list', Market.list);
router.get('/get', Market.get);
router.post('/delete', Market.delete);

module.exports = router;