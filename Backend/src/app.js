const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('../src/config/database');
const mascotasRoutes = require('../src/routes/mascotas');
const vacunasRoutes = require('../src/routes/vacunas');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de archivos estáticos (FRONTEND)
// Ajusta estas rutas según tu estructura exacta de carpetas
app.use(express.static(path.join(__dirname, '../../'))); // Raíz del proyecto
app.use('/css', express.static(path.join(__dirname, '../../css')));
app.use('/js', express.static(path.join(__dirname, '../../js')));
app.use('/img', express.static(path.join(__dirname, '../../img')));
app.use('/fonts', express.static(path.join(__dirname, '../../fonts')));
app.use('/scss', express.static(path.join(__dirname, '../../scss')));

// Rutas de API (BACKEND)
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/vacunas', vacunasRoutes);

// Ruta para servir el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}/api`);
  console.log(`Frontend accesible en http://localhost:${PORT}`);
  console.log(`Archivos estáticos servidos desde: ${path.join(__dirname, '../../')}`);
});