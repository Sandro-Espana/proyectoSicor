const connection = require("../DB/dbMysql"); // Importa el módulo MySQL

// CREATE USER
const createUser = (newUsuario, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "INSERT INTO tb_residente SET ?",
    newUsuario,
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    }
  );
};

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

//FIND RESIDENT BY NAME
const findUserByUsername = (username, callback) => {
  connection.query(
    "SELECT * FROM tb_residente WHERE username = ?",
    [username],
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
          callback(null, results[0]); // Se asume que solo se espera un usuario
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

//FIND RESIDENT BY ID APT
const searchById = (userId, callback) => {
  connection.query(
    "SELECT * FROM tb_residente WHERE id_apartamento = ?",
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

// Buscar usuario por número de cédula
const searchUserByCedu = (cedula) => {
  return new Promise((resolve, reject) => {
    // Lógica para buscar el usuario en la base de datos utilizando la cédula
    connection.query(
      "SELECT * FROM tb_residente WHERE cedula = ?",
      [cedula],
      (error, results) => {
        if (error) {
          console.error("Error al buscar usuario por cédula:", error);
          reject(error);
        } else {
          // Si se encuentra algún usuario con la cédula especificada, retornar el usuario
          if (results.length > 0) {
            resolve(results[0]); // Retornar el primer usuario encontrado (suponiendo que no hay duplicados)
          } else {
            resolve(null); // Si no se encuentra ningún usuario con la cédula especificada, retornar null
          }
        }
      }
    );
  });
};

const searchByIdUser = (userId, callback) => {
  connection.query(
    "SELECT * FROM tb_residente WHERE id_residente = ?",
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
    "DELETE FROM tb_residente WHERE id_residente = ?",
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

module.exports = {
  createUser,
  findUserByUsername,
  deleteUser,
  searchById,
  searchUserByCedu,
  listUsers,
  searchByIdUser
};
