const connection = require("../DB/dbMysql");


// FIND USERNAME IN tb_resident BY username
const searchResidenByUsername = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_resident WHERE username = ?",
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

// RESIDENT WANTED IN tb_resident BY id_resident
const searchResidentById = (id_resident) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_resident WHERE id_resident = ?",
      [id_resident],
      (error, results) => {
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
      }
    );
  });
};

// SEARCH APARTMENT IN tb_resident BY id_apartament
const apartamentAvailability = (id_apartament) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_resident WHERE id_apartament = ?",
      [id_apartament],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

// INSERT NEW OBJECT RESIDENT IN THE tb_resident
const createResident = (newResident) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO tb_resident SET ?",
      [newResident],
      (error, results) => {
        if (error) {
          
          reject(error);
          console.error("error. ", error);
        } else {
          resolve(results);
          console.log("results ",results);
        }
      }
    );
  });
};
// CREATE USER
/*const createResident1 = (newUsuario, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "INSERT INTO tb_resident SET ?",
    newUsuario,
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    }
  );
};*/

// LIST USERS
const listUsers = (callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query("SELECT * FROM tb_residente", (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
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


//DELETE USER BY ID
const deleteUser = (userId, callback) => {
  connection.query(
    "DELETE FROM tb_resident WHERE id_resident = ?",
    [userId],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.affectedRows);
      }
    }
  );
};

// Función para eliminar datos de la tabla tb_resident
const eliminarDatosResidentes = () => {
    const sql = 'DELETE FROM tb_resident';
    connection.query(sql);
};
//eliminarDatosResidentes()

module.exports = {
  searchResidentById,
  searchResidenByUsername,
  createResident,
  deleteUser,
  apartamentAvailability,
  listUsers,
  searchByIdUser
};
