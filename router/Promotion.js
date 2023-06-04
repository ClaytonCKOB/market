const express = require('express');
const router = express.Router();

const Promotion = require('../controller/PromotionController')

router.post('/create', Promotion.create);
router.get('/list', Promotion.list);
router.get('/get', Promotion.get);
router.post('/delete', Promotion.delete);

module.exports = router;