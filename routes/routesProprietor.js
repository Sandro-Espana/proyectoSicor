const express = require("express");
const router = express.Router();
const { createProprietor } = require("../model/tbProprietor");

// PATH TO CREATE A NEW PET IN THE DB
router.post("/newProprietor", async (req, res) => {
  try {
    if (
      !req.body.id_owner ||
      !req.body.name ||
      !req.body.surname ||
      !req.body.email ||
      !req.body.coefficient ||
      !req.body.id_apt ||
      !req.body.mobile
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // CREATE AN OBJECT WITH THE NEW MASCOT'S DATA
    const newProprietor = {
      id_owner: req.body.id_owner,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      mobile: req.body.mobile,
      coefficient: req.body.coefficient,
      id_apt: req.body.id_apt,
    };

    // INSERT NEW MASCOT IN THE DB
    const createdProprietor = await createProprietor(newProprietor);
    if (createdProprietor) {
      res.status(201).json({
        message: `Propietario  ${req.body.name}  registrada correctamente.`,
      });
    }
  } catch (error) {
    console.error("Error al registrar la propietario:", error);
    res.status(500).json({
      error: `Error al registrar la propietario registrada correctamente.`,
    });
  }
});

module.exports = router;
