const connection = require("../DB/dbMysql"); // Importa el módulo MySQL

// CHECK IF THE PLATE EXISTS IN tb_vehicle
const validatePlate = (plate) => {
  return new Promise((resolve, reject) => {
    const sql =  'SELECT * FROM tb_vehicle WHERE plate = ?'
    connection.query(
      sql,
      [plate],
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

// FUNCTION TO CONSULT parking IN tb_vehicle
const availableParking = (parking) => {
  return new Promise((resolve, reject) => {
    const sql =  'SELECT * FROM tb_vehicle WHERE parking = ?'
    connection.query(
      sql,
      [parking],
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

// FUNCTION TO CREATE A NEW VEHICLE
const createVehicle = (newVehicle) => {
  return new Promise((resolve, reject) => {
    const sql =  'INSERT INTO tb_vehicle SET ?'
    connection.query(
      sql,
      [newVehicle],
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



// FUNCTION TO LIST VEHICLES BY UnidadResidencialID
const vehiclesByIdApt = (id_apartament) => {
  return new Promise((resolve, reject) => {
    const sql =  'SELECT * FROM tb_vehicle WHERE id_apartament = ?'
    connection.query( sql, [id_apartament], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// FUNCTION TO DELETE A VEHICLE BY ID
const deleteVehicleById = (id_vehicle) => {
  return new Promise((resolve, reject) => {
    const sql =  'DELETE FROM tb_vehiculo WHERE id_vehicle = ?'
    connection.query(
      sql,
      [id_vehicle],
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

const eliminarDatosResidentes = () => {
  const sql = 'DELETE FROM tb_vehicle';
  connection.query(sql);
};
//eliminarDatosResidentes()

module.exports = {
  validatePlate,
  availableParking,
  createVehicle,
  vehiclesByIdApt,
  deleteVehicleById
};

/* THIS FILE CONTAINS THE FOLLOWING FUNCTION:
  validatePlate == VALIDATES IF THE PLATE TO BE REGISTERED EXISTS IN THE DB.
  availableParking == VALID IF PARKING IS AVAILABLE
  createVehicle == INSERTS A NEW VEHICLE IN THE DB
  vehiclesByIdApt == LISTS THE VEHICLES BELONGING TO AN APARTMENT
  deleteVehicleById == DELETES A VEHICLE BY ITS ID
*/