const connection = require("../DB/dbMysql");


// FIND USERNAME IN tb_resident BY username
const searchResidenByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_resident WHERE username = ?";
    connection.query(sql, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// RESIDENT WANTED IN tb_resident BY id_resident
const searchResidentById = (id_resident) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_resident WHERE id_resident = ?";
    connection.query(sql, [id_resident], (error, results) => {
      if (error) {
        console.error("Error al buscar usuario por cédula:", error);
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      }
    });
  });
};

// SEARCH APARTMENT IN tb_resident BY id_apartament
const apartamentResidentent = (id_apartament) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_resident WHERE id_apartament = ?";
    connection.query(sql, [id_apartament], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// INSERT NEW OBJECT RESIDENT IN THE tb_resident
const createResident = (newResident) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO tb_resident SET ?";
    connection.query(sql, [newResident], (error, results) => {
      if (error) {
        reject(error);
        console.error("error. ", error);
      } else {
        resolve(results);
        console.log("results ", results);
      }
    });
  });
};

// LIST ALL RESIDENTS
const listResident = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_resident";
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
        console.error("error. ", error);
      } else {
        resolve(results);
        console.log("results ", results);
      }
    });
  });
};

//DELETE RESIDENT BY ID
const deleteResident = (id_resident) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM tb_resident WHERE id_resident = ?";
    connection.query(sql, [id_resident], (error, results) => {
      if (error) {
        reject(error);
        console.error("error. ", error);
      } else {
        resolve(results);
        console.log("results ", results);
      }
    });
  });
};

const searchByIdUser = (userId, callback) => {
  connection.query(
    "SELECT * FROM tb_resident WHERE id_resident = ?",
    [userId],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]);
      }
    }
  );
};


// Función para eliminar datos de la tabla tb_resident
const eliminarDatosResidentes = () => {
  const sql = "DELETE FROM tb_resident";
  connection.query(sql);
};
//eliminarDatosResidentes()

module.exports = {
  searchResidenByUsername,
  searchResidentById,
  apartamentResidentent,
  createResident,
  listResident,
  deleteResident,


  searchByIdUser,
};
