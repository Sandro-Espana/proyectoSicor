const connection = require("../DB/dbMysql"); // Importa el módulo MySQL

// VALID PLACA
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
const vehiclesByIdApt = (IDApt, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "SELECT * FROM tb_vehiculo WHERE id_apartamento = ?",
    [IDApt],
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

// FUNCTION TO DELETE A VEHICLE BY ID
const deleteVehicleById = (vehicleId, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }

  connection.query(
    "DELETE FROM tb_vehiculo WHERE id_vehiculo = ?",
    [vehicleId],
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
  validatePlate,
  createVehicle,
  vehiclesByIdApt,
  deleteVehicleById
};
