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
const searchUnitById = (unidadId, callback) => {
  connection.query(
    "SELECT * FROM tb_apartamento  WHERE id_unidad_residencial = ?",
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
