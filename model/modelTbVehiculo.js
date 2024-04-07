const connection = require("../DB/dbMysql"); // Importa el módulo MySQL

// FUNCTION CREATE NEW VEHICLE
const createVehicle = (newVehicle, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
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
const vehiclesByIdApt = (unidadResidencialID, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "SELECT * FROM tb_vehiculo WHERE id_apartamento = ?",
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
  vehiclesByIdApt
};

// createVehicle Función para crear un nuevo vehículo
