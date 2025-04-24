const XLSX = require('xlsx');
const path = require('path');

try {
    const excelPath = path.join(__dirname, '../../data/datos.xlsx');
    console.log('Intentando leer archivo:', excelPath);
    
    const workbook = XLSX.readFile(excelPath);
    console.log('Hojas disponibles:', workbook.SheetNames);
    
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(firstSheet);
    
    console.log('Datos encontrados:', data);
} catch (error) {
    console.error('Error al leer el archivo:', error);
} 