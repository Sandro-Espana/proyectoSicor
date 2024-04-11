const express = require("express");
const router = express.Router();
const crudZone = require("../model/modelTbCommoZon");

// PATH TO CREATE A NEW COMMON AREA.
router.post("/newCommon", async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.imagen || !req.body.descripcion) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // CREATE NEW OBJECT COMMON ZONE
    const newZone = {
        nombre: req.body.nombre,
        imagen: req.body.imagen,
      descripcion: req.body.descripcion,
    };
    const response = await crudZone.createZone(newZone);
    // TO INSERT THE NEW COMMON ZONE IN DB
  /*  const zoneId = await new Promise((resolve, reject) => {
      crudZone.createZone(newZone, (error, id) => {
        if (error) {
          console.error("Error al registrar la zona comun:", error);
          reject(error);
        } else {
          console.log("Registrada con éxito");
          resolve(id);
        }
      });
    });*/
    res.status(201).json({ message: ` Zona comun ${response.insertId} registrada correctamente.` });
  } catch (error) {
    console.error("Error al registrar la zona comun:", error);
    res.status(500).json({ error: "Error al registrar la zona comun." });
  }
});

module.exports = router;
