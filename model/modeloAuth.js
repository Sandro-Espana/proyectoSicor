// Importa el módulo MySQL
const connection = require('../dbMysql');

// Define el esquema login de usuario
const usuarioSchema = {
  name: {
    type: 'VARCHAR(255)',
    allowNull: false
  },
  username: {
    type: 'VARCHAR(255)',
    allowNull: false,
    unique: true
  },
  password: {
    type: 'VARCHAR(255)',
    allowNull: false
  }
};

/*Define el esquema de residente
const residenteSchema = {
  ResidenteID: {
    type: 'INT',
    allowNull: false,
    primaryKey: true
  },
  UnidadResidencialID: {
    type: 'INT',
    defaultValue: null,
    references: {
      model: 'unidades_residenciales',
      key: 'UnidadResidencialID'
    }
  },
  NombreCompleto: {
    type: 'VARCHAR(255)',
    defaultValue: null
  },
  Apellido: {
    type: 'VARCHAR(255)',
    defaultValue: null
  },
  CorreoElectronico: {
    type: 'VARCHAR(255)',
    defaultValue: null
  },
  NumeroContacto: {
    type: 'VARCHAR(15)',
    defaultValue: null
  },
  Cedula: {
    type: 'VARCHAR(20)',
    defaultValue: null
  },
  PropietarioID: {
    type: 'INT',
    defaultValue: null,
    references: {
      model: 'propietarios',
      key: 'PropietarioID'
    }
  }
  Profile: {
    type: 'String',
    defaultValue: null,
    
  }

};*/


// Función para crear un nuevo usuario
const createUser = (newUsuario, callback) => {
  //console.log("Valor de callback: ", callback);
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida.');
    return;
  }
  connection.query('INSERT INTO residentes SET ?', newUsuario, (error, results) => {
    if (error) {
      //console.log(error);
      callback(error, null);
    } else {
      callback(null, results.insertId);
    }
  });
};

//Función para la tabla unidades_residenciales
const saveFormData = (formData, callback) => {
//  console.log("Valor de callback: ", callback);
  if (typeof callback !== 'function') {
    console.error('Error: La función de devolución de llamada no está definida.');
    return;
  }
  connection.query('INSERT INTO unidades_residenciales SET ?', formData, (error, results) => {
    if (error) {
      console.log(error);
      callback(error, null);
    } else {
      callback(null, results.insertId);
    }
  });
};



// Función para encontrar un usuario por nombre de usuario
const findUserByUsername = (username, callback) => {
  connection.query('SELECT * FROM residentes WHERE username = ?', [username], (error, results) => {
    if (error) {
      if (typeof callback === 'function') {
      // Manejo del error: se pasa el error al callback
      callback(error, null);
      console.log(error);
    } else {
      console.error('Error: La función de devolución de llamada no es una función.');
    }
  } else {
    if (typeof callback === 'function') {
      // No hay error: se pasa null como primer argumento y los resultados como segundo argumento
      callback(null, results[0]); // Se asume que solo se espera un usuario
    }else {
      console.error('Error callback: La función de devolución de llamada no es una función.');
      console.log("valor callback",error);
    }
  }
  });
};


// Función para encontrar un usuario por su ID
const findUserById = (userId, callback) => {
  connection.query('SELECT * FROM usuarios WHERE id = ?', [userId], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Función para eliminar un usuario por su ID
const deleteUser = (userId, callback) => {
  connection.query('DELETE FROM usuarios WHERE id = ?', [userId], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.affectedRows);
    }
  });
};



module.exports = {
  usuarioSchema,
  createUser,
  findUserByUsername,
  deleteUser,
  findUserById,
  saveFormData
};
