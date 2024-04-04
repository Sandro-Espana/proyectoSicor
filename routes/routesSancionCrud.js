const express = require("express");
const router = express.Router();
const crud = require("../model/modelSancionCrud");

// CREATE A SANCTION IN DB
// RUTA PARA CREAR UNA NUEVA SANCIÓN
router.post("/newSanction", async (req, res) => {
  try {
    // Verificar si se proporcionan todos los campos requeridos
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

    // Crear un objeto con los datos de la nueva sanción
    const nuevaSancion = {
      Tipo: req.body.tipo,
      Descripcion: req.body.descripcion,
      FechaInicio: req.body.fechaInicio,
      FechaFin: req.body.fechaFin,
      UsuarioID: req.body.usuarioId,
    };

    // Llamar a la función createSancion para insertar la nueva sanción en la base de datos
    crud.createSancion(nuevaSancion, (error, insertId) => {
      if (error) {
        console.error("Error al crear la sanción:", error);
        return res.status(500).json({ error: "Error al crear la sanción." });
      }
      console.log("Sanción creada con éxito");
      res
        .status(201)
        .json({ mensaje: "Sanción creada correctamente.", insertId });
    });
  } catch (error) {
    console.error("Error al registrar la sanción:", error);
    res.status(500).json({ error: "Error al registrar la sanción." });
  }
});
