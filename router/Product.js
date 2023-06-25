const express = require('express');
const router = express.Router();

const Product = require('../controller/ProductController')

router.post('/create', Product.create);
router.get('/list', Product.list);
router.get('/get', Product.get);
router.delete('/delete/:id', Product.delete);
router.post('/createTestRecords', Product.createTestRecords);

module.exports = router;