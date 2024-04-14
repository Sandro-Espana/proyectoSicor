const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { searchAptById } = require("../model/tbApt.js");
const {
  searchResidenByUsername,
  searchResidentById,
  createResident,
  apartamentAvailability,
} = require("../model/tbResident.js");

// PATH REGISTER RESIDENT IN DB
router.post("/register", async (req, res) => {
  try {
    if (
      !req.body.id_resident ||
      !req.body.id_apartament ||
      !req.body.name ||
      !req.body.lastname ||
      !req.body.username ||
      !req.body.mobile ||
      !req.body.password
    ) {
      return res

        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // CHECK IF THE USER NAME ALREADY EXISTS
    const existsUsername = await searchResidenByUsername(req.body.username);
    if (existsUsername) {
      return res.status(400).json({ error: "El email ya esta registrada." });
    }

    // CHECK IF THE RESIDENT IS ALREADY REGISTERED
    const existsResident = await searchResidentById(req.body.id_resident);
    if (existsResident) {
      return res.status(400).json({ error: "La cédula ya esta registrada." });
    }

    // VERIFY IF THE APARTAMENT EXISTS
    const existsApt = await searchAptById(req.body.id_apartament);
    if (existsApt == "") {
      return res.status(400).json({ error: "La copropiedad no existe." });
    }

    // VERIFY IF THE APARTAMENT IS ALREADY OCCUPIED
    const occupiedApt = await apartamentAvailability(req.body.id_apartament);
    if (occupiedApt) {
      return res.status(400).json({ error: "El apartamento no se encuentra disponible." });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // HASHEAR PASSWORD

    // CREATE NEW RESIDENT
    const newResident = {
      id_resident: req.body.id_resident,
      id_apartament: req.body.id_apartament,
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      mobile: req.body.mobile,
      password: hashedPassword,
    };

    // INSERT NEW RESIDENT INTO DB
    const response = await createResident(newResident);
    if (response) {
      return res.status(201).json({
        message: ` Residente ${req.body.name} creado correctamente.`,
      });
    }
    res.status(400).json({ error: "Error al registrar el residente." });
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
