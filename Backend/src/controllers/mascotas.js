const path = require('path');
const Mascota = require(path.join(__dirname, '../models/mascotas'));

exports.obtenerMascotas = (req, res) => {
    Mascota.obtenerTodas((err, mascotas) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener mascotas' });
        }
        res.json(mascotas);
    });
};

exports.obtenerMascota = (req, res) => {
    const id = req.params.id;
    Mascota.obtenerPorId(id, (err, mascota) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener mascota' });
        }
        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.json(mascota);
    });
};

exports.crearMascota = (req, res) => {
    const { nombre, tipo, raza, edad, dueno, notas } = req.body;
    Mascota.crear(nombre, tipo, raza, edad, dueno, notas, (err, id) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear mascota' });
        }
        res.status(201).json({ id });
    });
};

exports.actualizarMascota = (req, res) => {
    const id = req.params.id;
    const { nombre, tipo, raza, edad, dueno, notas } = req.body;
    Mascota.actualizar(id, nombre, tipo, raza, edad, dueno, notas, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar mascota' });
        }
        res.json({ mensaje: 'Mascota actualizada correctamente' });
    });
};

exports.eliminarMascota = (req, res) => {
    const id = req.params.id;
    Mascota.eliminar(id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar mascota' });
        }
        res.json({ mensaje: 'Mascota eliminada correctamente' });
    });
};