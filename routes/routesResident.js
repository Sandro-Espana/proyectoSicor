const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const resident = require("../model/modelTbResident");

// REGISTER RESIDENT IN DB
router.post("/register", async (req, res) => {
  try {
    if (
      !req.body.namer ||
      !req.body.usernamer ||
      !req.body.passwordr ||
      !req.body.lastname ||
      !req.body.cedula ||
      !req.body.mobile ||
      !req.body.unidad_residencial
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // SEARCH USER BY NAME
    const existingUser = await new Promise((resolve, reject) => {
      resident.findUserByUsername(req.body.usernamer, (error, user) => {
        if (error) {
          console.error("Error al buscar usuario:", error);
          reject(error);
        } else {
          resolve(user);
        }
      });
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ya está en uso." });
    }

    // SEARCH USER BY CC
    const existingUserByCedula = await Usuario.searchUserByCedu(
      req.body.cedula
    );

    if (existingUserByCedula) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con esta cédula." });
    }

    const hashedPassword = await bcrypt.hash(req.body.passwordr, 12); // HASH PASSWORD

    // VERIFY APARTMENT AVAILABILITY
    const existingUnit = await new Promise((resolve, reject) => {
      resident.searchResidentById(
        req.body.unidad_residencial,
        (error, unit) => {
          if (error) {
            console.error("Error al buscar unidad residencial:", error);
            reject(error);
          } else {
            resolve(unit);
          }
        }
      );
    });

    if (existingUnit) {
      return res
        .status(400)
        .json({ error: "La unidad residencial ya está en uso." });
    } else {
      // CREATE NEW RESIDENT
      const newUsuario = {
        residente_id: req.body.cedula,
        nombre: req.body.namer,
        apellido: req.body.lastname,
        cedula: req.body.cedula,
        celular: req.body.mobile,
        username: req.body.usernamer,
        password: hashedPassword,
        unidad_residencial: req.body.unidad_residencial,
      };

      //INSERT USER IN TABLE RESIDENT
      const userId = await new Promise((resolve, reject) => {
        resident.createUser(newUsuario, (error, id) => {
          if (error) {
            console.error("Error al registrar el usuario residente:", error);
            reject(error);
          } else {
            resolve(id);
          }
        });
      });
      console.log("Registrado con éxito");
    }
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
//ELIMINAR
