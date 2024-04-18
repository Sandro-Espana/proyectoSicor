const connection = require("../DB/dbMysql"); // IMPORT MUSQL MODULE


// FUNCTION TO CREATE A NEW PET
const createProprietor = (newProprietor) => {
  return new Promise((resolve, reject) => {
    const sql =  'INSERT INTO tb_proprietor SET ?'
    connection.query(sql, [newProprietor], (error, results) => {
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
    createProprietor
}