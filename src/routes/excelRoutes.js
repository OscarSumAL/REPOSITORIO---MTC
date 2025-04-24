const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para leer el archivo Excel
router.get('/data', authMiddleware, excelController.readExcel);

module.exports = router; 