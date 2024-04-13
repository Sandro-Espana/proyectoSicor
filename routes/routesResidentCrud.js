const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const resident = require("../model/tbResident");
const aptCrud = require("../model/modelTbApt");

// REGISTER RESIDENT IN DB
router.post("/register", async (req, res) => {
  try {
    if (
      !req.body.nombre ||
      !req.body.username ||
      !req.body.password ||
      !req.body.apellido ||
      !req.body.cedula ||
      !req.body.celular ||
      !req.body.id_apartamento
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // Verificar si el nombre de usuario ya existe
    const existingUser = await resident.findUserByUsername(req.body.username);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ya está en uso." });
    }

    // Verificar si la cédula ya está registrada
    const existingUserByCedula = await resident.searchUserByCedu(
      req.body.cedula
    );
    if (existingUserByCedula) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con esta cédula." });
    }

    // Verificar si el apartamento existe
    const existingApt = await aptCrud.searchUnitById(req.body.id_apartamento);
    if (!existingApt) {
      return res.status(400).json({ error: "No existe copropiedad." });
    }

    // Verificar si la unidad residencial ya está ocupada
    const existingUnit = await resident.searchById(req.body.id_apartamento);
    if (existingUnit) {
      return res
        .status(400)
        .json({ error: "La unidad residencial ya está en uso." });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Crear nuevo residente
    const newResident = {
      id_residente: req.body.cedula,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      cedula: req.body.cedula,
      celular: req.body.celular,
      username: req.body.username,
      password: hashedPassword,
      id_apartamento: req.body.id_apartamento,
    };

    // INSERTAR USUARIO EN LA TABLA RESIDENTE
    const userId = await new Promise((resolve, reject) => {
      resident.createUser(newResident, (error, id) => {
        if (error) {
          console.error("Error al registrar el usuario residente:", error);
          reject(error);
        } else {
          console.log("Registrado con éxito");
          resolve(id);
        }
      });
    });
    res.status(201).json({ mensaje: "Usuario registrado correctamente." });

  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario." });
  }
});


// GET ALL USERS FROM DB
router.get("/listUsers", async (req, res) => {
  try {
    resident.listUsers((error, users) => {
      if (error) {
        console.error("Error en la solicitud: ", error);
        res.status(500).json({ error: error.message });
      } else {
        res.json(users);
        console.log("Listado de usuarios: ", users);
      }
    });
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// REMOVE USER FROM DB
router.delete("/deleteUser/:id", async (req, res) => {
  const usuarioId = req.params.id;
  console.log("delete", usuarioId);
  // if (req.user && req.user.profile === "Administrador")
  try {
    resident.deleteUser(usuarioId, (error, affectedRows) => {
      if (error) {
        console.error("Error al eliminar el usuario en el servidor:", error);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      if (affectedRows === 0) {
        return res.status(404).json({ error: "El usuario no existe" });
      }
      res.status(201).json({ message: "Usuario eliminado exitosamente." });
      // res.json({ message: "Usuario eliminado exitosamente" });
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;

//Funciones para:
//REGISTRO
//LISTAR
//ELIMINAR
