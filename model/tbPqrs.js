const connection = require("../DB/dbMysql"); // IMPORT MUSQL MODULE

//FUNCTION TO CREATE PQRS
const createPqrs = (newPqrs) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO tb_pqrs SET ?";
    connection.query(sql, [newPqrs], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

//FUNCTION TO LIST ALL PQRS FROM DB
const obtainAllPqrs = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_pqrs";
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

//FUNCTION TO LIST ALL PQRS BY ID_RESIDENT FROM DB
const obtainAllPqrsByIdResident = (id_resident) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_pqrs WHERE id_user = ?";
    connection.query(sql, [id_resident], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// FUNCTION TO UPDATE A PQRS BY ID
const updatePqrsById = (updatePqrs, id_pqrs) => {
  return new Promise((resolve, reject) => {
    const sql =  "UPDATE tb_pqrs SET ? WHERE id_pqrs = ?";
    connection.query(sql, [updatePqrs, id_pqrs], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


//FUNCTION TO REMOVE A PQRS
const deletePqrs = (id_Pqrs) => {
  return new Promise((resolve, reject) => {
    const sql =  "DELETE FROM tb_pqrs WHERE id_pqrs = ?";
    connection.query(sql, [id_Pqrs], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


// WE EXPORT THE MODEL FUNCTIONS
module.exports = {
  createPqrs,
  obtainAllPqrs,
  obtainAllPqrsByIdResident,
  updatePqrsById,
  deletePqrs
};

//THIS FILE CONSTAINS THE FUNCTIONS TO
//CREATE, LIST, SEARCH BY ID, UPDATE AND DELETE PQRS
