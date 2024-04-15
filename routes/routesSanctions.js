const express = require("express");
const router = express.Router();
const {createSancion, obtainSanctions} = require("../model/tbSanctions");


// CREATE A SANCTION IN DB
router.post("/newSanction", async (req, res) => {
  try {
    if (
      !req.body.id_resident ||
      !req.body.date_time ||
      !req.body.attention ||
      !req.body.state ||
      !req.body.id_apt ||
      !req.body.documentPdf
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos del server." });
    }

    // CREATE AN OBJECT NEW SANCTION
    const newSanction = {
      id_resident: req.body.id_resident,
      date_time: req.body.date_time,
      attention: req.body.attention,
      state: req.body.state,
      id_apt: req.body.id_apt,
      document: req.body.documentPdf,
    };
    console.log(newSanction);

    const response = await createSancion(newSanction);
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
    const response = await obtainSanctions()
    res.status(201).json(response);
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});


// ROUTE TO UPDATE A SANCTION IN THE DB
router.put("/updateSanction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (
      !req.body.tipo ||
      !req.body.descripcion ||
      !req.body.fechaInicio ||
      !req.body.fechaFin ||
      !req.body.usuarioId
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }
    // OBJECT WITH UPDATED SANCTION DATA
    const sancionActualizada = {
      Tipo: req.body.tipo,
      Descripcion: req.body.descripcion,
      FechaInicio: req.body.fechaInicio,
      FechaFin: req.body.fechaFin,
      UsuarioID: req.body.usuarioId,
    };
    // UPDATING THE SANCTION IN THE DB
    crudSanction.updateSanction(id, sancionActualizada, (error) => {
      if (error) {
        console.error("Error al actualizar la sanción:", error);
        return res.status(500).json({ error: "Error al actualizar la sanción." });
      }
      console.log("Sanción actualizada con éxito");
      res.status(200).json({ mensaje: "Sanción actualizada correctamente." });
    });
  } catch (error) {
    console.error("Error al actualizar la sanción:", error);
    res.status(500).json({ error: "Error al actualizar la sanción." });
  }
});

module.exports = router;
