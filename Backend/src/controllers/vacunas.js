const path = require('path');
const Vacuna = require(path.join(__dirname, '../models/vacunas'));

exports.obtenerVacunas = (req, res) => {
    const mascotaId = req.query.mascota_id;
    Vacuna.obtenerTodas(mascotaId, (err, vacunas) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener vacunas' });
        }
        res.json(vacunas);
    });
};

exports.obtenerVacuna = (req, res) => {
    const id = req.params.id;
    Vacuna.obtenerPorId(id, (err, vacuna) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener vacuna' });
        }
        if (!vacuna) {
            return res.status(404).json({ error: 'Vacuna no encontrada' });
        }
        res.json(vacuna);
    });
};

exports.crearVacuna = (req, res) => {
    const { mascota_id, tipo, fecha, proxima_fecha, veterinario, notas } = req.body;
    Vacuna.crear(mascota_id, tipo, fecha, proxima_fecha, veterinario, notas, (err, id) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear vacuna' });
        }
        res.status(201).json({ id });
    });
};

exports.actualizarVacuna = (req, res) => {
    const id = req.params.id;
    const { mascota_id, tipo, fecha, proxima_fecha, veterinario, notas } = req.body;
    Vacuna.actualizar(id, mascota_id, tipo, fecha, proxima_fecha, veterinario, notas, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar vacuna' });
        }
        res.json({ mensaje: 'Vacuna actualizada correctamente' });
    });
};

exports.eliminarVacuna = (req, res) => {
    const id = req.params.id;
    Vacuna.eliminar(id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar vacuna' });
        }
        res.json({ mensaje: 'Vacuna eliminada correctamente' });
    });
};