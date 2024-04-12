const connection = require("../DB/dbMysql");

// FUNCTION CREATE COMMON AREAS
const createCommonArea = (newCommonArea) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO tb_zona_comun SET ?",
      [newCommonArea],
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

// FUNCTION TO LIST ALL COMMON AREAS OF THE DB
const listCommonArea = (listCommonArea) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_common_area",
      [listCommonArea],
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

// FUNCTION TO LIST ALL COMMON AREAS OF THE DB
const updateCommonAreaById = (idCommonArea , updateCommonArea) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE tb_common_area SET ? WHERE id_common_area = ?",
      [updateCommonArea, idCommonArea],
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

// FUNCTION TO LIST ALL COMMON AREAS OF THE DB
const deleteCommonAreaById = (idCommonArea) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM tb_common_area WHERE id_common_area = ?",
      [idCommonArea],
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
  createCommonArea,
  listCommonArea,
  updateCommonAreaById,
  deleteCommonAreaById
}