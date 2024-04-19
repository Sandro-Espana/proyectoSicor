const connection = require("../DB/dbMysql");


// FUNCTION INSERT NEW SUPPLIER
const createSupplier = (newSupplier) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO tb_supplier SET ?";
    connection.query(sql,[newSupplier], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};


// FUNCIÓN PARA LISTAR PROVEEDORES POR TIPO DE SERVICIO
const suppliersList = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tb_supplier";
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

// FUNCIÓN PARA ACTUALIZAR LOS DATOS DE UN PROVEEDOR
const updateSupplier = (supplierId, updatedSupplier) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE tb_supplier SET ? WHERE id_supplier = ?";
    connection.query(sql, [updatedSupplier, supplierId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};


// Función para eliminar datos de la tabla tb_resident
const daleDateSupplier = () => {
  const sql = "DELETE FROM tb_supplier";
  connection.query(sql);
};
// daleDateSupplier()

module.exports = {
  createSupplier,
  suppliersList,
  updateSupplier,
};
