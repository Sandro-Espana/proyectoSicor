const connection = require("../DB/dbMysql");

// FUNCTION CREATE COMMON ZONE
const createZone = (newZone) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO tb_zona_comun SET ?",
      [newZone],
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

module.exports = {
    createZone
}