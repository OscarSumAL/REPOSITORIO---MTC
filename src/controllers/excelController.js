const XLSX = require('xlsx');
const path = require('path');
const NodeCache = require('node-cache');

// Crear una instancia de caché con un tiempo de vida de 1 hora
const cache = new NodeCache({ stdTTL: 3600 });

const readExcel = (req, res) => {
    try {
        // Verificar si se debe forzar la actualización
        const forceUpdate = req.query.forceUpdate === 'true';
        
        // Verificar si los datos están en caché y no se está forzando la actualización
        const cachedData = cache.get('excelData');
        if (cachedData && !forceUpdate) {
            return handleResponse(res, cachedData, req.query);
        }

        // Si no está en caché o se está forzando la actualización, leer el archivo
        const excelPath = path.join(__dirname, '../../data/datos.xlsx');
        const workbook = XLSX.readFile(excelPath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Mapear y filtrar los datos
        const mappedData = data.map(row => ({
            numero: row['__EMPTY'] || '',
            primerApellido: row['__EMPTY_1'] || '',
            segundoApellido: row['__EMPTY_2'] || '',
            nombres: row['__EMPTY_3'] || '',
            dni: row['__EMPTY_4'] || '',
            fechaInicial: row['__EMPTY_8'] || '',
            fechaFinal: row['__EMPTY_9'] || '',
            diasParaVencer: row['__EMPTY_10'] || '',
            observaciones: row['__EMPTY_12'] || ''
        })).filter(item => item.numero !== 'N°');

        // Guardar en caché
        cache.set('excelData', mappedData);

        // Procesar la respuesta
        handleResponse(res, mappedData, req.query);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al procesar el archivo Excel',
            error: error.message
        });
    }
};

const handleResponse = (res, data, query) => {
    // Aplicar filtros si existen
    let filteredData = [...data];
    
    if (query.search) {
        const searchTerm = query.search.toLowerCase();
        filteredData = filteredData.filter(item => 
            item.primerApellido.toLowerCase().includes(searchTerm) ||
            item.segundoApellido.toLowerCase().includes(searchTerm) ||
            item.nombres.toLowerCase().includes(searchTerm) ||
            item.dni.includes(searchTerm)
        );
    }

    // Aplicar paginación solo si se especifica
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || filteredData.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = filteredData.slice(startIndex, endIndex);

    res.json({
        success: true,
        data: paginatedData,
        pagination: {
            total: filteredData.length,
            page,
            limit,
            totalPages: Math.ceil(filteredData.length / limit)
        }
    });
};

module.exports = {
    readExcel
}; 