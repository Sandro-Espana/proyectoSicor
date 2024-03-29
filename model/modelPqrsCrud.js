// IMPORT MUSQL MODULE
const connection = require('../DB/dbMysql');

//FUNCTION TO CREATE PQRS
const createPQRS = (newPQRS, callback) => {
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida.');
    return;
  }
  connection.query('INSERT INTO pqrs SET ?', newPQRS, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.insertId);
    }
  });
};

//FUNCTION TO LIST ALL USERS FROM DB
const getAllPQRS = (callback) => {
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida, soy modelPqrsCrud.');
    return;
  }
  connection.query('SELECT * FROM pqrs', (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// FUNCTION TO OBTAIN A PQRS BY ID
const getPQRSById = (pqrsId, callback) => {
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida.');
    return;
  }
  connection.query('SELECT * FROM pqrs WHERE PQRSID = ?', [pqrsId], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results[0]); // Devuelve solo el primer resultado, ya que debería ser único por ID
    }
  });
};

// FUNCTION TO UPDATE A PQRS
const updatePQRS = (pqrsId, updatedPQRS, callback) => {
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida.');
    return;
  }
  connection.query('UPDATE pqrs SET ? WHERE PQRSID = ?', [updatedPQRS, pqrsId], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.changedRows > 0); // Devuelve true si se realizó la actualización, de lo contrario, false
    }
  });
};

//FUNCTION TO REMOVE A PQRS
const deletePQRS = (pqrsId, callback) => {
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida.');
    return;
  }
  connection.query('DELETE FROM pqrs WHERE PQRSID = ?', [pqrsId], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.affectedRows > 0); // Devuelve true si se eliminó la fila, de lo contrario, false
    }
  });
};

// WE EXPORT THE MODEL FUNCTIONS
module.exports = {
  createPQRS,
  getAllPQRS,
  getPQRSById,
  updatePQRS,
  deletePQRS
};

//THIS FILE CONSTAINS THE FUNCTIONS TO
//CREATE, LIST, SEARCH BY ID, UPDATE AND DELETE PQRS