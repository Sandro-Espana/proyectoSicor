const connection = require("../DB/dbMysql"); // IMPORT CONNECTION

// FUNCTION CREATE SANCION
const createSancion = (newSancion, callback) => {
  if (typeof callback !== "function") {
    console.error("Error: La función de devolución de llamada no está definida.");
    return;
  }
  connection.query("INSERT INTO tb_sancion SET ?", newSancion,(error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    });
};

// FUNCTION TO LIST ALL USERS FROM DB
const obtainSanctions = (santions) => {
  return new Promise((resolve, reject) => {
    const sql =  'SELECT * FROM tb_sanction'
    connection.query(
      sql,
      [santions],
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

/*const listSanction = (callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query("SELECT * FROM tb_sancion", (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};*/

module.exports = {
  createSancion,
  obtainSanctions
};
