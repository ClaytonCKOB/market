const express = require('express');
const router = express.Router();

const Category = require('../controller/CategoryController')

router.post('/create', Category.create);
router.get('/list', Category.list);
router.get('/get', Category.get);
router.delete('/delete/:id', Category.delete);

module.exports = router;