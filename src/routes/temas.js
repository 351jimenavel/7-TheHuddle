// temas.js (router)
const express = require('express');
const router = express.Router();

// Importar controlador
const { getListaTemas, 
    getFormNuevoTema, 
    postCrearTema, 
    getFormEditarTema, 
    postEditarTema, 
    postEliminarTema,
    getDetalleTema,
    postVotarTema } = require('../controllers/temasController');

const { postCrearEnlace, } = require('../controllers/enlacesController');
// Rutas de TEMAS
router.get('/temas', getListaTemas);

// Ruta de TEMAS/NUEVO
// GET  /temas/nuevo     → muestra formulario de creación
router.get('/temas/nuevo', getFormNuevoTema);

// Ruta TEMAS para procesa creación (validación + guardar + feedback)
// POST /temas
router.post('/temas', postCrearTema);

// Ruta UPDATE temas
router.get('/temas/:id/editar', getFormEditarTema);
router.post('/temas/:id/editar', postEditarTema);

// Ruta DELETE temas
router.post('/temas/:id/eliminar', postEliminarTema);

// Rutas para ENLACES
// detalle + lista de enlaces
router.get('/temas/:id', getDetalleTema);

// crear enlace dentro del tema
router.post('/temas/:id/enlaces', postCrearEnlace);

router.post('/temas/:id/votar', postVotarTema);

// exportar router
module.exports = router;