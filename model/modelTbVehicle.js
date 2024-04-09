const connection = require("../DB/dbMysql"); // Importa el módulo MySQL

const validatePlate = (placa, callback) => {
  connection.query(
    "SELECT * FROM tb_vehiculo WHERE placa = ?",
    [placa],
    (error, results) => {
      if (error) {
        console.error("Error al validar la placa:", error);
        callback(error, null);
      } else {
        callback(null, results.length > 0);
      }
    }
  );
};

// Función para crear un nuevo vehículo
const createVehicle = (newVehicle, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  // Realizar la inserción del vehículo en la base de datos
  connection.query(
    "INSERT INTO tb_vehiculo SET ?",
    newVehicle,
    (error, results) => {
      if (error) {
        console.error(error);
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    }
  );
};

// FUNCTION TO LIST VEHICLES BY UnidadResidencialID
const listVehiclesByUnidadResidencialID = (unidadResidencialID, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "SELECT * FROM tb_vehiculo WHERE UnidadResidencialID = ?",
    [unidadResidencialID],
    (error, results) => {
      if (error) {
        console.error(error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

module.exports = {
  createVehicle,
  listVehiclesByUnidadResidencialID,
};

module.exports = {
  validatePlate,
  createVehicle,
};
