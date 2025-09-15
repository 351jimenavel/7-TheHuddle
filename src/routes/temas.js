// temas.js (router)
const express = require('express');
const router = express.Router();

// Importar controlador
const { getListaTemas } = require('../controllers/temasController');

// Rutas de TEMAS
router.get('/temas', getListaTemas);

// exportar router
module.exports = router;