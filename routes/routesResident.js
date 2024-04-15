const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { searchAptById } = require("../model/tbApartament.js");
const {
  searchResidenByUsername,
  searchResidentById,
  apartamentResidentent,
  createResident,
  listResident,
  deleteResident
} = require("../model/tbResident.js");


// PATH REGISTER RESIDENT IN DB
router.post("/newResident", async (req, res) => {
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
      return res
        .status(400)
        .json({ error: `El email ${req.body.username} ya esta registrada.` });
    }

    // CHECK IF THE RESIDENT IS ALREADY REGISTERED
    const existsResident = await searchResidentById(req.body.id_resident);
    if (existsResident) {
        return res.status(400).json({
        error: `La cédula ${req.body.id_resident} ya esta registrada.`,
      });
    }

    // VERIFY IF THE APARTAMENT EXISTS
    const existsApt = await searchAptById(req.body.id_apartament);
    if (existsApt == "") {
      return res
        .status(400)
        .json({ error: `La copropiedad ${req.body.id_apartament} no existe.` });
    }

    // VERIFY IF THE APARTAMENT IS ALREADY OCCUPIED
    const occupiedApt = await apartamentResidentent(req.body.id_apartament);
    if (occupiedApt) {
      return res.status(400).json({
        error: `El apartamento${req.body.id_apartament} no se encuentra disponible.`,
      });
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
    res
      .status(500)
      .json({ error: `Error al registrar el residente  ${req.body.name}.` });
  }
});

// GET ALL RESIDENTS FROM DB
router.get("/listResident", async (req, res) => {
  try {
    const response = await listResident();
    res.status(201).json(response);
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// REMOVE USER FROM DB
router.delete("/deleteResident/:id", async (req, res) => {
  try {
    const response = await deleteResident(req.params.id);
    if (response) {
      return res.status(201).json({
        message: `Residente ${req.params.id} eliminado corractamente.`,
      });
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;


/*
THIS FILE CONTAINS THE FOLLOWING PATHS
newResident == REGISTER A NEW RESIDENT
listResident/ == LIST ALL RESIDENT FROM TABLE
deleteResident/:id == DELETE RESIDENT BY ID
*/