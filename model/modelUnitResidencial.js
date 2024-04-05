const connection = require("../DB/dbMysql"); // Importa el módulo MySQL

//FUNCTION BY CREATE UNIT RESIDENTIAL
const createUnitResiden = (newUnitReside, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "INSERT INTO unidad_residencial SET ?",
    newUnitReside,
    (error, results) => {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    }
  );
};

// SEARCH UNIT BY ID
const searchUnitById = (unidadId, callback) => {
  connection.query(
    "SELECT * FROM unidad_residencial WHERE id_unidad_residencial = ?",
    [unidadId],
    (error, results) => {
      if (error) {
        if (typeof callback === "function") {
          callback(error, null);
          console.log(error);
        } else {
          console.error(
            "Error: La función de devolución de llamada no es una función."
          );
        }
      } else {
        if (typeof callback === "function") {
          callback(null, results[0]); // Se asume que solo se espera una unidad residencial
        } else {
          console.error(
            "Error callback: La función de devolución de llamada no es una función."
          );
          console.log("valor callback", error);
        }
      }
    }
  );
};

module.exports = {
  createUnitResiden,
  searchUnitById
};
