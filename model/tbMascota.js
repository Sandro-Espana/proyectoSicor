const connection = require("../DB/dbMysql"); // IMPORT MUSQL MODULE


// FUNCTION TO CREATE A NEW PET
const createPet = (newPet) => {
  return new Promise((resolve, reject) => {
    const sql =  'INSERT INTO tb_pet SET ?'
    connection.query(
      sql,
      [newPet],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// FUNCTION TO BRING ALL PETS IN AN APARTAMENT
const petsByIdApt = (id_apt) => {
  return new Promise((resolve, reject) => {
    const sql =  'SELECT * FROM tb_pet WHERE id_apt = ?'
    connection.query(
      sql,
      [id_apt],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// FUNCTION ELIMINATES A PET BY ITS ID
const deletePetById = (id_pet) => {
  return new Promise((resolve, reject) => {
    const sql =  'DELETE FROM tb_pet WHERE id_pet = ?'
    connection.query(
      sql,
      [id_pet],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  createPet,
  petsByIdApt,
  deletePetById
};
