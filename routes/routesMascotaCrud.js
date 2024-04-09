const express = require("express");
const router = express.Router();
const crudPet = require("../model/modelTbMascota");

router.post("/newPet", async (req, res) => {
  try {
    if (!req.body.nombreMascota || !req.body.tipoMascota || !req.body.foto) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // Crear un objeto con los datos de la nueva mascota
    const newPet = {
      id_apt: req.body.idApt,
      nombre: req.body.nombreMascota,
      tipo: req.body.tipoMascota,
      foto: req.body.foto,
    };

    // Llamar a la función createPet para insertar la nueva mascota en la base de datos
    crudPet.createPet(newPet, (error, insertId) => {
      if (error) {
        console.error("Error al crear la mascota:", error);
        return res.status(500).json({
          error: "Error al crear la mascota en la base de datos.",
        });
      }
      console.log("Mascota registrada con éxito");
      res
        .status(201)
        .json({ mensaje: "Mascota registrada correctamente.", id: insertId });
    });
  } catch (error) {
    console.error("Error al registrar la mascota:", error);
    res.status(500).json({ error: "Error al registrar la mascota." });
  }
});

router.get("/listPets/:idApt", async (req, res) => {
  try {
    const idApt = req.params.idApt;
    console.log("ID del apartamento:", idApt);

    // Llama a la función correspondiente para obtener todas las mascotas por el ID del apartamento
    crudPet.petsByIdApt(idApt, (error, pets) => {
      if (error) {
        console.error("Error al obtener mascotas:", error);
        res.status(500).json({ error: error.message });
      } else {
        console.log("Mascotas obtenidas correctamente:", pets);
        res.json(pets);
      }
    });
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});


router.delete("/deletePet/:petId", async (req, res) => {
    try {
      const petId = req.params.petId;
      console.log("Pet ID to delete: ", petId);
      crudPet.deletePetById(petId, (error, deletedPet) => {
        if (error) {
          console.error("Error deleting pet: ", error);
          res.status(500).json({ error: error.message });
        } else {
          console.log("Pet deleted successfully ", deletedPet);
          res.status(201).json({ message: "Pet deleted successfully" });
        }
      });
    } catch (error) {
      console.log("Error in request:", error);
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;
