const connection = require("../DB/dbMysql"); // IMPORT MUSQL MODULE

// Función para crear una mascota
const createPet = (newPet, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query("INSERT INTO tb_mascota SET ?", newPet, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.insertId);
    }
  });
};

const petsByIdApt = (idApt, callback) => {
  connection.query(
    "SELECT * FROM tb_mascota WHERE id_apt = ?",
    [idApt],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const deletePetById = (petId, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }

  connection.query(
    "DELETE FROM tb_mascota WHERE id_mascota = ?",
    [petId],
    (error, result) => {
      if (error) {
        console.error(error);
        callback(error, null);
      } else {
        callback(null, result);
      }
    }
  );
};

module.exports = {
  createPet,
  petsByIdApt,
  deletePetById
};
