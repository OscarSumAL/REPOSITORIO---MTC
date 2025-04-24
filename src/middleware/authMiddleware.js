const authMiddleware = (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.session || !req.session.isAuthenticated) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado. Por favor inicie sesión.'
        });
    }

    // Verificar permisos según el método HTTP
    const method = req.method;
    const userPermissions = req.session.user.permissions;

    if (method === 'GET' && !userPermissions.includes('read')) {
        return res.status(403).json({
            success: false,
            message: 'No tiene permisos para ver los datos.'
        });
    }

    if ((method === 'POST' || method === 'PUT') && !userPermissions.includes('write')) {
        return res.status(403).json({
            success: false,
            message: 'No tiene permisos para modificar los datos.'
        });
    }

    if (method === 'DELETE' && !userPermissions.includes('delete')) {
        return res.status(403).json({
            success: false,
            message: 'No tiene permisos para eliminar datos.'
        });
    }

    next();
};

module.exports = authMiddleware; 