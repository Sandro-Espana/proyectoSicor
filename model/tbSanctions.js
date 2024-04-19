const connection = require("../DB/dbMysql"); // IMPORT CONNECTION

// FUNCTION CREATE SANCION
const createSancion = (newSancion) => {
  return new Promise((resolve, reject) => {
    const sql =  'INSERT INTO tb_sanction SET ?'
    connection.query(sql, [newSancion], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// FUNCTION TO LIST ALL USERS FROM DB
const obtainSanctions = () => {
  return new Promise((resolve, reject) => {
    const sql =  'SELECT * FROM tb_sanction'
    connection.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// FUNCTION TO UPDATE SANTION BY id_resident
const updateSanctionByIdResident = (sanctionUpdate, id_resident) => {
  return new Promise((resolve, reject) => {
    const sql =  'UPDATE tb_sanction SET ? WHERE id_resident = ?'
    connection.query(sql, [sanctionUpdate, id_resident], (error, results) => {
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
  createSancion,
  obtainSanctions,
  updateSanctionByIdResident
};
