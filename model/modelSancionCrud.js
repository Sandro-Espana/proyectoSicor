const connection = require("../DB/dbMysql"); // IMPORT MUSQL MODULE

// CREATE SANCION
const createSancion = (newSancion, callback) => {
  if (typeof callback !== "function") {
    console.error("Error: La función de devolución de llamada no está definida.");
    return;
  }
  connection.query("INSERT INTO sancion SET ?", newSancion,(error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    });
};

module.exports = {
  createSancion
};
