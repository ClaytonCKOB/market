const express = require('express');
const router = express.Router();

const Product = require('../controller/ProductController')

router.get('/create', Product.create);

module.exports = router;