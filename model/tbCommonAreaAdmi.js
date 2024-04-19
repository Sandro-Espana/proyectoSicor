const connection = require("../DB/dbMysql");

// FUNCTION CREATE COMMON AREAS
const createCommonArea = (newCommonArea) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO tb_zona_comun SET ?";
    connection.query(sql, [newCommonArea], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// FUNCTION TO LIST ALL COMMON AREAS OF THE DB
const listCommonArea = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_common_area";
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// FUNCTION TO LIST ALL COMMON AREAS OF THE DB
const updateCommonAreaById = (idCommonArea, updateCommonArea) => {
  return new Promise((resolve, reject) => {
    const sql =  'UPDATE tb_common_area SET ? WHERE id_common_area = ?'
    connection.query(sql, [updateCommonArea, idCommonArea], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// FUNCTION TO LIST ALL COMMON AREAS OF THE DB
const deleteCommonAreaById = (idCommonArea) => {
  return new Promise((resolve, reject) => {
    const sql =  "DELETE FROM tb_common_area WHERE id_common_area = ?"
    connection.query(sql, [idCommonArea], (error, results) => {
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
  createCommonArea,
  listCommonArea,
  updateCommonAreaById,
  deleteCommonAreaById,
};
