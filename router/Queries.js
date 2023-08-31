const express = require('express');
const router = express.Router();

const QueriesController = require('../controller/QueriesController');

router.get('/detalhes-clientes', QueriesController.query1);
router.get('/detalhes-categorias', QueriesController.query2);
router.get('/detalhes-funcionarios', QueriesController.query3);
router.get('/vendas-mais-de-um-metodo-pag', QueriesController.query4);
router.get('/produtos-nao-vendidos', QueriesController.query5);
router.get('/mesmos-produtos-fornecedor', QueriesController.query6);
router.get('/zera-desconto-fornecedor', QueriesController.query7);
router.get('/detalhes-vendas-por-turno', QueriesController.query8);


module.exports = router;