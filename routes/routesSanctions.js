const express = require("express");
const router = express.Router();
const {
  createSancion,
  obtainSanctions,
  updateSanctionByIdResident,
} = require("../model/tbSanctions");

// CREATE A SANCTION IN DB
router.post("/newSanction", async (req, res) => {
  try {
    if (
      !req.body.id_resident ||
      !req.body.date_attention ||
      !req.body.attention ||
      !req.body.state ||
      !req.body.id_apt ||
      !req.body.documentPdf
    ) {
      return res.status(400).json({
        error: "Por favor, proporciona todos los campos requeridos del server.",
      });
    }

    // CREATE AN OBJECT NEW SANCTION
    const newSanction = {
      id_resident: req.body.id_resident,
      date_attention: req.body.date_attention,
      attention: req.body.attention,
      state: req.body.state,
      id_apt: req.body.id_apt,
      document: req.body.documentPdf,
    };
    console.log(newSanction);

    await createSancion(newSanction);
    return res.status(201).json({
      message: ` Llamado de atencio al residente ${newSanction.id_resident}.`,
    });
  } catch (error) {
    console.error("Error al registrar la sanción:", error);
    res.status(500).json({ error: "Error al registrar la sanción." });
  }
});

// GET ALL SANCTION FROM DB
router.get("/listSanction", async (req, res) => {
  try {
    const response = await obtainSanctions();
    res.status(201).json(response);
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// ROUTE TO UPDATE A SANCTION IN THE DB
router.put("/updateSanction/:id_resident", async (req, res) => {
  try {
    const id_resident = req.params.id_resident;
    if (
      !req.body.state ||
      !req.body.date_conciliation ||
      !req.body.documentPdf
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // OBJECT WITH UPDATED SANCTION DATA
    const sanctionUpdated = {
      state: req.body.state,
      date_conciliation: req.body.date_conciliation,
      document: req.body.documentPdf,
      santioned: req.body.sanctioned,
    };

    // INSERT THE UPDATED SANCTION TO THE DB
    await updateSanctionByIdResident(sanctionUpdated, id_resident);
    res.status(201).json({
      message: ` Sancion actualizada.`,
    });
  } catch (error) {
    console.error("Error al actualizar la sanción:", error);
    res.status(500).json({ error: "Error al actualizar la sanción." });
  }
});

module.exports = router;


/*
THIS FILE CONTAINS THE FOLLOWING PATHS

/newSanction == REGISTER A NEW SANCTION
updateSanction/:id_resident  == RESIDENTE ID SANCTION TRACKING
*/