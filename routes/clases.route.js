const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();
const ClasesController = require('../controllers/clases.controller')


router.get('/all', ClasesController.getClases);
router.get('/by_id/:claseId', ClasesController.getClaseById);
router.post('/create', ClasesController.createClase);
router.delete('/delete/:claseId', ClasesController.deleteClase);
router.patch('/actualizar/:claseId', ClasesController.updateClase);
router.patch('/publicar/:claseId', ClasesController.publicarClase);
router.patch('/despublicar/:claseId', ClasesController.despublicarClase);
router.patch('/comentar/:claseId', ClasesController.comentarClase);
router.patch('/valorar/:claseId', ClasesController.valorarClase);
router.get('/comentarios/:claseId', ClasesController.comentariosByClaseId);
router.patch('/aceptarComentario/:comentarioId', ClasesController.aceptarComentario);
router.patch('/rechazarComentario/:comentarioId', ClasesController.rechazarComentario);
router.patch('/actualizar_valoracion/:claseId/:valoracion', ClasesController.actualizarValoracion);
router.get('/order_by_valoracion', ClasesController.getClasesByValoracion);
router.get('/order_by_valoracion/:valoracion', ClasesController.getClasesByValoracionMayorA);
router.get('/by_valoracion/:valoracion', ClasesController.getClasesByValoracion);
router.get('/grupales', ClasesController.getClasesGrupales);
router.get('/individuales', ClasesController.getClasesIndividuales);
router.get('/by_materia/:materia', ClasesController.getClasesByMateria);
router.get('/by_frecuencia/:frecuencia', ClasesController.getClasesByFrecuencia);
router.get('/by_duracion', ClasesController.getClasesByDuracion);
router.get('/by_profesor/:profesor', ClasesController.getClasesByProfesor);
router.patch('/solicitar_clase/:claseId', ClasesController.contratarClase);
router.post('/solicitar', ClasesController.createSolicitud);
router.get('/solicitudes/:claseId', ClasesController.getSolicitudesById);
router.get('/solicitudes/user/:userId', ClasesController.getSolicitudesByUserId);
router.patch('/solicitudes/updateEstado/:solicitudId/:estado', ClasesController.updateSolicitud);
// router.patch('/comentario/:commentId', ClasesController.bloquearYDescargoComentarioById);
// router.patch('/actualizar_a_grupal/:claseId', ClasesController.actualizarAGrupal);
// router.patch('/actualizar_a_individual/:claseId', ClasesController.actualizarAIndividual);
router.get('/solicitudes/profesor/:nombreProfesor', ClasesController.getSolicitudesByProfesor);

module.exports = router;