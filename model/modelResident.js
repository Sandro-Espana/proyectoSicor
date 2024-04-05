const connection = require('../DB/dbMysql');// Importa el módulo MySQL


// CREATE USER
const createUser = (newUsuario, callback) => {
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida.');
    return;
  }
  connection.query('INSERT INTO residente SET ?', newUsuario, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.insertId);
    }
  });
};

// LIST USERS
const listUsers = (callback) => {
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida.');
    return;
  }
  connection.query('SELECT * FROM residente', (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

//FIND USER BY NAME
const findUserByUsername = (username, callback) => {
  connection.query('SELECT * FROM residente WHERE username = ?', [username], (error, results) => {
    if (error) {
      if (typeof callback === 'function') {
      // Manejo del error: se pasa el error al callback
      callback(error, null);
      console.log(error);
    } else {
      console.error('Error: La función de devolución de llamada no es una función.');
    }
  } else {
    if (typeof callback === 'function') {
      // No hay error: se pasa null como primer argumento y los resultados como segundo argumento
      callback(null, results[0]); // Se asume que solo se espera un usuario
    }else {
      console.error('Error callback: La función de devolución de llamada no es una función.');
      console.log("valor callback",error);
    }
  }
  });
};

//FIND USER BY ID
const findUserById = (userId, callback) => {
  connection.query('SELECT * FROM residente WHERE residente_id = ?', [userId], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
};

//DELETE USER BY ID
const deleteUser = (userId, callback) => {
  connection.query('DELETE FROM residente WHERE residente_id = ?', [userId], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.affectedRows);
    }
  });
};



module.exports = {
  createUser,
  findUserByUsername,
  deleteUser,
  findUserById,
  listUsers
};
