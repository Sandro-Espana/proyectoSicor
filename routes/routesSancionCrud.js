const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crud = require("../model/modelTbSancion");

// CREATE A SANCTION IN DB
router.post("/newSanction", async (req, res) => {
  try {
    // Verificar si se proporcionan todos los campos requeridos
    if (
      !req.body.estado ||
      !req.body.descripcion ||
      !req.body.fecha_hora ||
      !req.body.foto_evidencia ||
      !req.body.residente_id
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos del server." });
    }

    // Crear un objeto con los datos de la nueva sanción
    const nuevaSancion = {
      estado: req.body.estado,
      descripcion: req.body.descripcion,
      fecha_hora: req.body.fecha_hora,
      foto_evidencia: req.body.foto_evidencia,
      residente_id: req.body.residente_id,
    };

    // Llamar a la función createSancion para insertar la nueva sanción en la base de datos
    crud.createSancion(nuevaSancion, (error, insertId) => {
      if (error) {
        console.error("Error al crear la sanción:", error);
        return res.status(500).json({ error: "Error al crear la sanción en la db." });
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


// ACTUALIZAR UNA SANCIÓN EN LA BASE DE DATOS
router.put("/updateSanction/:id", async (req, res) => {
  try {
    const { id } = req.params;

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

    // Crear un objeto con los datos actualizados de la sanción
    const sancionActualizada = {
      Tipo: req.body.tipo,
      Descripcion: req.body.descripcion,
      FechaInicio: req.body.fechaInicio,
      FechaFin: req.body.fechaFin,
      UsuarioID: req.body.usuarioId,
    };

    // Llamar a la función de actualización de la sanción en la base de datos
    crud.updateSanction(id, sancionActualizada, (error) => {
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
