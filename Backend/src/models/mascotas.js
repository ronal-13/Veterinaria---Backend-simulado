const path = require('path');
const db = require(path.join(__dirname, '../config/database'));

class Mascota {
    static obtenerTodas(callback) {
        db.all('SELECT * FROM mascotas', callback);
    }

    static obtenerPorId(id, callback) {
        db.get('SELECT * FROM mascotas WHERE id = ?', [id], callback);
    }

    static crear(nombre, tipo, raza, edad, dueno, notas, callback) {
        db.run(
            'INSERT INTO mascotas (nombre, tipo, raza, edad, dueno, notas) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, tipo, raza, edad, dueno, notas],
            function(err) {
                callback(err, this.lastID);
            }
        );
    }

    static actualizar(id, nombre, tipo, raza, edad, dueno, notas, callback) {
        db.run(
            'UPDATE mascotas SET nombre = ?, tipo = ?, raza = ?, edad = ?, dueno = ?, notas = ? WHERE id = ?',
            [nombre, tipo, raza, edad, dueno, notas, id],
            callback
        );
    }

    static eliminar(id, callback) {
        db.run('DELETE FROM vacunas WHERE mascota_id = ?', [id], (err) => {
            if (err) return callback(err);
            db.run('DELETE FROM mascotas WHERE id = ?', [id], callback);
        });
    }
}

module.exports = Mascota;