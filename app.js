// Importación de módulos
const express = require('express');
const path = require('path');
const conectarDB = require('./DB/dbMysql'); // Importar la función de conexión a la base de datos
const cors = require('cors');
const rutasViews = require('./routes/routesViews');
const auth = require('./routes/routesAuth')
const resident = require('./routes/routesResident'); // Importa las rutas de autenticación desde el archivo auth.js
const pqrs = require('./routes/routesPqrsCrud');
const sanctions = require('./routes/routesSanctions');
const vehicle = require('./routes/routesVehicle');
const pet = require('./routes/routesPet');
const supplier = require('./routes/routerProveedorCrud');
const commonArea = require('./routes/routesCommonArea');


const app = express() // Creación de una aplicación Express

app.use(cors()) // Habilita CORS para permitir solicitudes desde otros dominios

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public'), {
    // Configurar los tipos MIME para los archivos estáticos
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
        }
    }
}));


app.set('views', path.join(__dirname, 'views')); // Configurar la carpeta 'views' para las vistas EJS

app.set('view engine', 'ejs'); // Configuración del motor de plantillas EJS

const port = 3000; // Puerto en el que el servidor escuchará las solicitudes

app.use(express.json()); // Configuración para manejar solicitudes JSON

app.use('/', rutasViews); // Uso de las rutas desde rutasViews.js

app.use("/api", auth); //Define las rutas en tu aplicación, en este caso, la ruta de autenticación '/api'

app.use('/api', resident);

app.use('/api', pqrs);

app.use('/api', sanctions);

app.use('/api', vehicle);

app.use('/api', pet);

app.use('/api', supplier);

app.use('/api', commonArea);

const db = conectarDB; // Conexión a Mysql

db.on('error', console.error.bind(console, 'Error de conexión a Mysql:')); // Manejo de eventos de conexión y error
db.once('open', () => {
    console.log('Conectado a Mysql');
});

 //Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
/*


/*
El código que se proporciona es un servidor web básico utilizando Node.js y
Express, con integración de MySql. Además,
incluye configuraciones para manejar vistas con EJS, CORS para
permitir solicitudes desde otros dominios,
y una ruta de autenticación definida en el archivo auth.js.
*/