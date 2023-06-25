const express = require('express');
const router = express.Router();

const PaymentMethod = require('../controller/PaymentMethodController')

router.post('/create', PaymentMethod.create);
router.get('/list', PaymentMethod.list);
router.get('/get', PaymentMethod.get);
router.delete('/delete/:id', PaymentMethod.delete);

module.exports = router;