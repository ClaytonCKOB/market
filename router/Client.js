const express = require('express');
const router = express.Router();

const Client = require('../controller/ClientController')

router.post('/create', Client.create);
router.get('/list', Client.list);
router.get('/get', Client.get);
router.delete('/delete/:id', Client.delete);

module.exports = router;