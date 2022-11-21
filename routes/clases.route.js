const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();
const ClasesController = require('../controllers/clases.controller')


router.get('/', ClasesController.getClases);
router.get('/:claseId', ClasesController.getClaseById);
router.post('/create', ClasesController.createClase);
router.delete('/delete/:claseId', ClasesController.deleteClase);
router.patch('/publicar/:claseId', ClasesController.publicarClase);
router.patch('/despublicar/:claseId', ClasesController.despublicarClase);
router.patch('/comentar/:claseId', ClasesController.comentarClase);
router.patch('/valorar/:claseId', ClasesController.valorarClase);
router.get('/comentarios/:claseId', ClasesController.comentariosByClaseId);
router.patch('/actualizar_valoracion/:claseId', ClasesController.actualizarValoracion);
router.get('/order_by_valoracion', ClasesController.getClasesByValoracion);
router.get('/order_by_valoracion/:valoracion', ClasesController.getClasesByValoracionMayorA);
router.get('/grupales', ClasesController.getClasesGrupales);
router.get('/individuales', ClasesController.getClasesIndividuales);
router.get('/by_materia', ClasesController.getClasesByMateria);
router.get('/by_frecuencia', ClasesController.getClasesByFrecuencia);
router.get('/by_duracion', ClasesController.getClasesByDuracion);
router.get('/by_profesor', ClasesController.getClaseByProfesor);
router.get('/by_solicitante', ClasesController.getClaseBySolicitante);
router.patch('/solicitar_clase/:claseId', ClasesController.contratarClase);

module.exports = router;