const express = require('express');
const router = express.Router();

const Turns = require('../controller/TurnsController')

router.post('/create', Turns.create);
router.get('/list', Turns.list);
router.get('/get', Turns.get);
router.delete('/delete/:id', Turns.delete);

module.exports = router;