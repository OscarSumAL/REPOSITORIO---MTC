const rateLimit = require('express-rate-limit');

// Rate limiter general para todas las rutas
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 peticiones por ventana
    message: {
        success: false,
        message: 'Demasiadas peticiones, por favor intente más tarde'
    }
});

// Rate limiter específico para login
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5, // límite de 5 intentos de login por hora
    message: {
        success: false,
        message: 'Demasiados intentos de login, por favor intente más tarde'
    }
});

module.exports = {
    generalLimiter,
    loginLimiter
}; 