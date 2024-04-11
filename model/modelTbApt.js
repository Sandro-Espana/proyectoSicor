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
    "INSERT INTO tb_apartamento SET ?",
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
const searchUnitById = (unidadId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_apartamento  WHERE id_apartamento = ?",
      [unidadId],
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


const eliminarDatosTablaApartamentos = () => {
  const sql = "DELETE FROM tb_apartamento";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error al eliminar datos de tb_apartamentos:", err);
      return;
    }
    console.log("Datos de tb_apartamentos eliminados correctamente");
  });
};

//eliminarDatosTablaApartamentos()

module.exports = {
  createUnitResiden,
  searchUnitById,
};
