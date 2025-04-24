const login = (req, res) => {
    const { username, password } = req.body;

    // Base de datos de usuarios
    const users = {
        // Administradores (acceso total)
        'admin': { password: 'admin123', role: 'admin', permissions: ['read', 'write', 'update', 'delete'] },
        'supervisor': { password: 'super123', role: 'admin', permissions: ['read', 'write', 'update', 'delete'] },
        'manager': { password: 'manager123', role: 'admin', permissions: ['read', 'write', 'update', 'delete'] },
        
        // Usuarios de solo lectura
        'usuario1': { password: 'user123', role: 'viewer', permissions: ['read'] },
        'usuario2': { password: 'user456', role: 'viewer', permissions: ['read'] },
        'usuario3': { password: 'user789', role: 'viewer', permissions: ['read'] },
        'usuario4': { password: 'user012', role: 'viewer', permissions: ['read'] },
        'usuario5': { password: 'user345', role: 'viewer', permissions: ['read'] }
    };

    // Verificar credenciales
    if (users[username] && users[username].password === password) {
        // Establecer la sesión
        req.session.isAuthenticated = true;
        req.session.user = {
            username: username,
            role: users[username].role,
            permissions: users[username].permissions
        };

        res.json({
            success: true,
            message: 'Login exitoso',
            user: {
                username: username,
                role: users[username].role,
                permissions: users[username].permissions
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Credenciales inválidas'
        });
    }
};

const logout = (req, res) => {
    // Destruir la sesión
    req.session.destroy();
    res.json({
        success: true,
        message: 'Sesión cerrada exitosamente'
    });
};

module.exports = {
    login,
    logout
}; 