require('dotenv').config({path:'.env'});
const mysql = require('mysql');

const host = process.env.HOST;
const user = process.env.USER;
const pass = process.env.PASSWORD;
const db = process.env.DATABASE;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: pass,
  database: db
});



// Función para conectar a la base de datos
function conectarDB() {
    connection.connect((error) => {
      if (error) {
        console.error('Error al conectar a la base de datos: ' + error.stack);
        return;
      }
  
      console.log('Conexión exitosa a la base de datos MySql con el ID ' + connection.threadId);
    });
  
    // Devolver la conexión para poder usarla en otros archivos
    return connection;
  }
  
  module.exports = conectarDB();