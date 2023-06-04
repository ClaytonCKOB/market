const express = require('express');
const router = express.Router();

const PaymentMethod = require('../controller/PaymentMethodController')

router.post('/create', PaymentMethod.create);
router.get('/list', PaymentMethod.list);
router.get('/get', PaymentMethod.get);
router.post('/delete', PaymentMethod.delete);

module.exports = router;