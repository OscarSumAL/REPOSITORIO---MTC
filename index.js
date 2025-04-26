const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Configuración de sesión
app.use(session({
    secret: 'tu_secreto_super_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Cambiar a true en producción con HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Importar rutas y middleware
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const excelRoutes = require('./src/routes/excelRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');

// Rutas públicas
app.use('/api', loginRoutes);

// Rutas protegidas
app.use('/api/usuarios', authMiddleware, usuarioRoutes);
app.use('/api/excel', authMiddleware, excelRoutes);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces
app.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});