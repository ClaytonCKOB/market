const express = require('express');
const router = express.Router();

const Payments = require('../controller/PaymentsController')

router.post('/create', Payments.create);
router.get('/list', Payments.list);
router.get('/get', Payments.get);
router.delete('/delete/:id', Payments.delete);

module.exports = router;