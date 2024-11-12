// routes/carneRoutes.js
const express = require('express');
const carneController = require('../Controller/CarneController');

const router = express.Router();

router.post('/carnes', carneController.adicionarCarne);
router.get('/carnes', carneController.listarCarnes);

module.exports = router;
