// Importar el módulo 'express' y crear una instancia de Router
var express = require('express');
var router = express.Router();

// Definir una ruta GET para '/Onichan'
router.get('/AriadnaMorales', (req, res) => {
    // Enviar la vista 'index' como respuesta a la solicitud
    res.render('index');
});

// Definir una ruta GET para la raíz
router.get('/', (req, res) => {
    // Enviar la vista 'index' como respuesta a la solicitud
    res.render('index');
});

// Exportar el router directamente
module.exports = router;
