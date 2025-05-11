const express = require('express');
const router = express.Router();
const vacunasController = require('../controllers/vacunas');

router.get('/', vacunasController.obtenerVacunas);
router.get('/:id', vacunasController.obtenerVacuna);
router.post('/', vacunasController.crearVacuna);
router.put('/:id', vacunasController.actualizarVacuna);
router.delete('/:id', vacunasController.eliminarVacuna);

module.exports = router;