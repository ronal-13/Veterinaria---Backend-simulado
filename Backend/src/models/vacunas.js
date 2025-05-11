const path = require('path');
const db = require(path.join(__dirname, '../config/database'));
class Vacuna {
    static obtenerTodas(mascotaId, callback) {
        let query = `
            SELECT v.*, m.nombre as mascota_nombre 
            FROM vacunas v
            JOIN mascotas m ON v.mascota_id = m.id
        `;
        
        const params = [];
        
        if (mascotaId) {
            query += ' WHERE v.mascota_id = ?';
            params.push(mascotaId);
        }
        
        db.all(query, params, callback);
    }

    static obtenerPorId(id, callback) {
        db.get(`
            SELECT v.*, m.nombre as mascota_nombre 
            FROM vacunas v
            JOIN mascotas m ON v.mascota_id = m.id
            WHERE v.id = ?
        `, [id], callback);
    }

    static crear(mascota_id, tipo, fecha, proxima_fecha, veterinario, notas, callback) {
        db.run(
            'INSERT INTO vacunas (mascota_id, tipo, fecha, proxima_fecha, veterinario, notas) VALUES (?, ?, ?, ?, ?, ?)',
            [mascota_id, tipo, fecha, proxima_fecha || null, veterinario || null, notas || null],
            function(err) {
                callback(err, this.lastID);
            }
        );
    }

    static actualizar(id, mascota_id, tipo, fecha, proxima_fecha, veterinario, notas, callback) {
        db.run(
            'UPDATE vacunas SET mascota_id = ?, tipo = ?, fecha = ?, proxima_fecha = ?, veterinario = ?, notas = ? WHERE id = ?',
            [mascota_id, tipo, fecha, proxima_fecha || null, veterinario || null, notas || null, id],
            callback
        );
    }

    static eliminar(id, callback) {
        db.run('DELETE FROM vacunas WHERE id = ?', [id], callback);
    }
}

module.exports = Vacuna;