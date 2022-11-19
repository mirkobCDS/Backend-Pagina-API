const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();
const ClasesController = require('../controllers/clases.controller')


router.get('/', ClasesController.getClases);
router.post('/create', ClasesController.createClase);
router.delete('/delete/:claseId', ClasesController.deleteClase);
router.patch('/publicar/:claseId', ClasesController.publicarClase);
router.patch('/despublicar/:claseId', ClasesController.despublicarClase);
router.patch('/comentar/:claseId', ClasesController.comentarClase);
router.patch('/valorar/:claseId', ClasesController.valorarClase);
router.get('/comentarios/:claseId', ClasesController.comentariosByClaseId);
router.patch('/actualizar_valoracion/:claseId', ClasesController.actualizarValoracion);

module.exports = router;