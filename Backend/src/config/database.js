const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta corregida (usa path.join para compatibilidad entre sistemas)
const dbPath = path.join(__dirname, '../database/gestion_mascotas.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos', err.message);
        console.log('Ruta intentada:', dbPath); // Debug: muestra la ruta completa
    } else {
        console.log('Conectado a la base de datos SQLite en:', dbPath);
        initializeDatabase();
    }
});

// Inicialización de la base de datos
function initializeDatabase() {
    db.serialize(() => {
        // Tabla de mascotas
        db.run(`
            CREATE TABLE IF NOT EXISTS mascotas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                tipo TEXT NOT NULL,
                raza TEXT,
                edad INTEGER,
                dueno TEXT,
                notas TEXT
            )
        `);
        
        // Tabla de vacunas
        db.run(`
            CREATE TABLE IF NOT EXISTS vacunas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                mascota_id INTEGER NOT NULL,
                tipo TEXT NOT NULL,
                fecha TEXT NOT NULL,
                proxima_fecha TEXT,
                veterinario TEXT,
                notas TEXT,
                FOREIGN KEY (mascota_id) REFERENCES mascotas (id)
            )
        `);
        
        // Insertar datos de ejemplo si las tablas están vacías
        db.get('SELECT COUNT(*) as count FROM mascotas', (err, row) => {
            if (err) {
                console.error('Error al verificar datos de ejemplo', err);
                return;
            }
            
            if (row.count === 0) {
                insertSampleData();
            }
        });
    });
}

function insertSampleData() {
    // Mascotas de ejemplo
    const mascotas = [
        ['Firulais', 'dog', 'Labrador', 3, 'Juan Pérez', ''],
        ['Michi', 'cat', 'Siamés', 2, 'María Gómez', ''],
        ['Piolín', 'bird', 'Canario', 1, 'Carlos Ruiz', '']
    ];
    
    const insertMascota = db.prepare(`
        INSERT INTO mascotas (nombre, tipo, raza, edad, dueno, notas)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    mascotas.forEach(m => {
        insertMascota.run(m, (err) => {
            if (err) console.error('Error insertando mascota', err);
        });
    });
    
    insertMascota.finalize();
    
    // Vacunas de ejemplo
    const vacunas = [
        [1, 'rabia', '2023-03-15', '2024-03-15', 'Dr. Martínez', 'La mascota presentó leve decaimiento después de la aplicación.'],
        [2, 'triple', '2023-02-10', '2024-02-10', 'Dra. López', '']
    ];
    
    const insertVacuna = db.prepare(`
        INSERT INTO vacunas (mascota_id, tipo, fecha, proxima_fecha, veterinario, notas)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    vacunas.forEach(v => {
        insertVacuna.run(v, (err) => {
            if (err) console.error('Error insertando vacuna', err);
        });
    });
    
    insertVacuna.finalize();
    
    console.log('Datos de ejemplo insertados');
}

module.exports = db;