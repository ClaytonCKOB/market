const express = require('express');
const router = express.Router();

const User = require('../controller/UserController')

router.post('/create', User.create);
router.get('/list', User.list);
router.get('/get', User.get);
router.post('/delete', User.delete);

module.exports = router;