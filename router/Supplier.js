const express = require('express');
const router = express.Router();

const Supplier = require('../controller/SupplierController')

router.post('/create', Supplier.create);
router.get('/list', Supplier.list);
router.get('/get', Supplier.get);
router.delete('/delete/:id', Supplier.delete);

module.exports = router;