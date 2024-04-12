const express = require("express");
const router = express.Router();
const {
  createCommonArea,
  listCommonArea,
  updateCommonAreaById,
  deleteCommonAreaById
} = require("../model/tbCommonArea");

// PATH TO CREATE A NEW COMMON AREA.
router.post("/newCommonArea", async (req, res) => {
  try {
    if (!req.body.name || !req.body.description || !req.body.image) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }
    // CREATE NEW OBJECT COMMON ZONE
    const newCommonArea = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    };
    const response = await createCommonArea(newCommonArea); // NEW INSERT OBJECT COMMON AREA IN THE DB
    res.status(201).json({
      message: ` Zona comun ${response.insertId} registrada correctamente.`,
    });
  } catch (error) {
    console.error("Error al registrar la zona comun:", error);
    res.status(500).json({ error: "Error al registrar la zona comun." });
  }
});

// ROUTE TO GET ALL COMMON AREAS
router.get("/listCommonArea", async (req, res) => {
  try {
    const response = await listCommonArea();
    res.status(201).json(response);
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// ROUTES TO UPDATE A COMMON AREA BY ITS ID
router.put("/updateCommonArea/:id", async (req, res) => {
  try {
    const id_common_area = req.params.id;
    const updateCommonArea = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    };
    // OBJECT INSERT COMMON AREA IN THE DB
    await updateCommonAreaById(id_common_area, updateCommonArea);
    res.status(201).json({
      message: ` Zona comun ${id_common_area} actualizada correctamente.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATH TO ELIMINATE A COMMON AREA BY ITS ID
router.delete("/deleteCommonArea/:id", async (req, res) => {
  try {
    const id_common_area = req.params.id;
    // OBJECT COMMON AREA REMOVE FROM DB BY ITS ID
    await deleteCommonAreaById(id_common_area);
    res.status(201).json({
      message: ` Zona comun ${id_common_area} eliminada correctamente.`,
    });
  } catch (error) {
    console.log("Error in request:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
