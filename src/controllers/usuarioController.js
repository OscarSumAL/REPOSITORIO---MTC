const db = require('../config/database');

// Obtener todos los usuarios
const getAllUsuarios = (req, res) => {
    const query = 'SELECT * FROM USUARIO';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

// Obtener un usuario por ID
const getUsuarioById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM USUARIO WHERE ID_USUARIO = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(results[0]);
    });
};

// Crear un nuevo usuario
const createUsuario = (req, res) => {
    const { NOMBRES, PRIMER_APELLIDO, SEGUNDO_APELLIDO, DNI } = req.body;
    const query = 'INSERT INTO USUARIO (NOMBRES, PRIMER_APELLIDO, SEGUNDO_APELLIDO, DNI) VALUES (?, ?, ?, ?)';
    
    db.query(query, [NOMBRES, PRIMER_APELLIDO, SEGUNDO_APELLIDO, DNI], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Usuario creado exitosamente' });
    });
};

// Actualizar un usuario
const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { NOMBRES, PRIMER_APELLIDO, SEGUNDO_APELLIDO, DNI } = req.body;
    const query = 'UPDATE USUARIO SET NOMBRES = ?, PRIMER_APELLIDO = ?, SEGUNDO_APELLIDO = ?, DNI = ? WHERE ID_USUARIO = ?';
    
    db.query(query, [NOMBRES, PRIMER_APELLIDO, SEGUNDO_APELLIDO, DNI, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json({ message: 'Usuario actualizado exitosamente' });
    });
};

// Eliminar un usuario
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM USUARIO WHERE ID_USUARIO = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
}; 