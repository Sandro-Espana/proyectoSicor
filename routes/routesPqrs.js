const express = require("express");
const router = express.Router();
const {
  createPqrs,
  obtainAllPqrs,
  updatePqrsById,
  deletePqrs,
  obtainAllPqrsByIdResident
} = require("../model/tbPqrs");

// PATH TO CREATE A NEW PQRS
router.post("/newPqrs", async (req, res) => {
  try {
    if (
      !req.body.type ||
      !req.body.subject ||
      !req.body.description ||
      !req.body.image ||
      !req.body.date_creation ||
      !req.body.id_user
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // CREATE AN OBJECT WITH THE NEW PQRS DATA
    const newPqrs = {
      type: req.body.type,
      subject: req.body.subject,
      description: req.body.description,
      image: req.body.image,
      date_creation: req.body.date_creation,
      id_user: req.body.id_user,
    };

    await createPqrs(newPqrs);
    res.status(201).json({
      message: ` PQRS creada correctamente.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el PQRS." });
  }
});

// ROUTES TO OBTAIN ALL PQRS
router.get("/listPqrs", async (req, res) => {
  try {
    const response = await obtainAllPqrs();
    res.status(201).json(response);
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// ROUTES TO OBTAIN ALL PQRS BY ID_RESIDENT
router.get("/listPqrsResident/:id_resident", async (req, res) => {
  try {
    const response = await obtainAllPqrsByIdResident(req.params.id_resident);
    res.status(201).json(response);
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});


// ROUTES FOR UPDATING A PQRS BY YOUR ID
router.put("/updatePqrs/:id_pqrs", async (req, res) => {
  try {
    // UPDATE THE PQRS OBJECT WITH THE NEW PQRS DATA
    const updatePqrs = {
      state: req.body.state,
      reply: req.body.reply,
    };

    await updatePqrsById(updatePqrs, req.params.id_pqrs);
    res.status(201).json({
      message: ` PQRS ${req.params.id_pqrs} actualizada correctamente.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROUTES TO DELETE A PQRS BY ID
router.delete("/deletePqrs/:id_pqrs", async (req, res) => {
  try {
    await deletePqrs(req.params.id_pqrs);
    res
      .status(201)
      .json({
        message: ` PQRS ${req.params.id_pqrs} eliminada correctamente.`,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
