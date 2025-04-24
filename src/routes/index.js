const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { readExcel } = require('../controllers/excelController');
const { validateUsuario, validateLogin } = require('../middleware/validationMiddleware');
const { generalLimiter, loginLimiter } = require('../middleware/rateLimitMiddleware');

// Rutas públicas
router.post('/register', generalLimiter, validateUsuario, register);
router.post('/login', loginLimiter, validateLogin, login);

// Rutas protegidas
router.get('/excel', generalLimiter, readExcel);

module.exports = router; 