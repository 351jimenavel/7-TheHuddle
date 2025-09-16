// temas.js (router)
const express = require('express');
const router = express.Router();

// Importar controlador
const { getListaTemas, getFormNuevoTema, postCrearTema } = require('../controllers/temasController');

// Rutas de TEMAS
router.get('/temas', getListaTemas);

// Ruta de TEMAS/NUEVO
// GET  /temas/nuevo     → muestra formulario de creación
router.get('/temas/nuevo', getFormNuevoTema);

// Ruta TEMAS para procesa creación (validación + guardar + feedback)
// POST /temas
router.post('/temas', postCrearTema);

// exportar router
module.exports = router;