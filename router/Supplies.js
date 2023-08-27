const express = require('express');
const router = express.Router();

const Supplies = require('../controller/SuppliesController')

router.post('/create', Supplies.create);
router.get('/list', Supplies.list);
router.get('/get', Supplies.get);
router.delete('/delete/:id', Supplies.delete);

module.exports = router;