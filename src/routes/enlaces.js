// enlaces.js (router)
// Nuevo router para editar/eliminar enlace

const express = require('express');
const router = express.Router();

const { getFormEditarEnlace, 
    postEditarEnlace, 
    postEliminarEnlace 
    } = require('../controllers/enlacesController');


router.get('/enlaces/:id/editar', getFormEditarEnlace);

router.post('/enlaces/:id/editar', postEditarEnlace);

router.post('/enlaces/:id/eliminar', postEliminarEnlace);

module.exports = router;