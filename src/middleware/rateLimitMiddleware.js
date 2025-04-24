const rateLimit = require('express-rate-limit');

// Limitar a 100 peticiones por hora para rutas generales
const generalLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 100,
    message: {
        success: false,
        message: 'Demasiadas peticiones desde esta IP, por favor intente nuevamente en una hora'
    }
});

// Limitar a 5 peticiones por hora para login
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5,
    message: {
        success: false,
        message: 'Demasiados intentos de login, por favor intente nuevamente en una hora'
    }
});

module.exports = {
    generalLimiter,
    loginLimiter
}; 