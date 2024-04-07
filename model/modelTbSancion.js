const connection = require("../DB/dbMysql"); // IMPORT MUSQL MODULE

// CREATE SANCION
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

// DELETE SANCION
const deleteSancion = (sancionId, callback) => {
  if (typeof callback !== "function") {
    console.error("Error: La función de devolución de llamada no está definida.");
    return;
  }
  
  connection.query("DELETE FROM tb_sancion WHERE id = ?", sancionId, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.affectedRows);
    }
  });
};

module.exports = {
  createSancion,
  deleteSancion
};
