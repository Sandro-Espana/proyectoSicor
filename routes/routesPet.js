const express = require("express");
const router = express.Router();
const { createPet, petsByIdApt, deletePetById } = require("../model/tbMascota");


// PATH TO CREATE A NEW PET IN THE DB
router.post("/newPet", async (req, res) => {
  try {
    if (
      !req.body.id_apt ||
      !req.body.petName ||
      !req.body.petBreed ||
      !req.body.petSpecies ||
      !req.body.image
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // CREATE AN OBJECT WITH THE NEW MASCOT'S DATA
    const newPet = {
      id_apt: req.body.id_apt,
      petName: req.body.petName,
      petBreed: req.body.petBreed,
      petSpecies: req.body.petSpecies,
      image: req.body.image,
    };

    // INSERT NEW MASCOT IN THE DB
    const createdMascot = await createPet(newPet);
    if (createdMascot) {
      res
        .status(201)
        .json({
          message: `Mascota  ${req.body.petName}  registrada correctamente.`,
        });
    }
  } catch (error) {
    console.error("Error al registrar la mascota:", error);
    res
      .status(500)
      .json({
        error: `Error al registrar la mascota  ${req.body.petName}  registrada correctamente.`,
      });
  }
});

// ROUTE TO BRING ALL PETS FROM ONE APARTAMENT
router.get("/listPets/:id_apt", async (req, res) => {
  try {
    const listMascot = await petsByIdApt(req.params.id_apt);
    if (listMascot) {
      res.status(201).json(listMascot);
    }
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// ROUTE TO REMOVE PET BY ITS ID
router.delete("/deletePet/:id_pet", async (req, res) => {
  try {
    const deletMascot = await deletePetById(req.params.id_pet);
    if (deletMascot) {
      res.status(201).json({ message:  `Mascota ${req.body.petName} eliminada.` });
    }
  } catch (error) {
    console.log("Error in request:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

/*
THIS FILE CONTAINS THE FOLLOWING PATHS
newPet == REGISTER A NEW PET
listPets/:id_apt == LIST PETS BY APARTAMENT ID
deletePet/:id_pet == DELETE PET BY ID
*/