// Importar el módulo 'express' y el módulo 'path'
const express = require('express');
const path = require('path');

// Importar el módulo 'router' desde el archivo 'router.js'
const router = require('./router');

// Crear una instancia de la aplicación Express
const app = express();

// Configurar Express para utilizar el formato JSON en las solicitudes
app.use(express.json());

// Configurar el motor de vistas 'ejs' y la ubicación de las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/client'));

// Configurar Express para servir archivos estáticos desde los directorios correspondientes
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src', 'server')));
app.use(express.static(path.join(__dirname, 'src/client')));

// Utilizar las rutas definidas en el módulo 'router'
app.use('/', router);

// Iniciar el servidor y escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
