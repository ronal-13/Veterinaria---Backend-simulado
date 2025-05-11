const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotas');

router.get('/', mascotasController.obtenerMascotas);
router.get('/:id', mascotasController.obtenerMascota);
router.post('/', mascotasController.crearMascota);
router.put('/:id', mascotasController.actualizarMascota);
router.delete('/:id', mascotasController.eliminarMascota);

module.exports = router;