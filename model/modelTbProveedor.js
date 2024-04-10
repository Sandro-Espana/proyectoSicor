const connection = require("../DB/dbMysql");

const createSupplier = (newSupplier, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "INSERT INTO tb_proveedor SET ?",
    newSupplier,
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    }
  );
};

// FUNCIÓN PARA LISTAR PROVEEDORES POR TIPO DE SERVICIO
const suppliersList = (callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query("SELECT * FROM tb_proveedor", (error, results) => {
    if (error) {
      console.error(error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// FUNCIÓN PARA ACTUALIZAR LOS DATOS DE UN PROVEEDOR
const updateSupplier = (supplierId, updatedSupplier, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "UPDATE tb_proveedor SET ? WHERE id_proveedor = ?",
    [updatedSupplier, supplierId],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.changedRows > 0); // Devuelve true si se realizó la actualización, de lo contrario, false
      }
    }
  );
};

//FUNCTION TO REMOVE A PQRS
const deleteSupplierById = (idSupplier, callback) => {
  if (typeof callback !== "function") {
    console.error(
      "Error: La función de devolución de llamada no está definida."
    );
    return;
  }
  connection.query(
    "DELETE FROM tb_proveedor WHERE id_proveedor = ?",
    [idSupplier],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.affectedRows > 0); // Devuelve true si se eliminó la fila, de lo contrario, false
      }
    }
  );
};

module.exports = {
  createSupplier,
  suppliersList,
  updateSupplier,
  deleteSupplierById
};
