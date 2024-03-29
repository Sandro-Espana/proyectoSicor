//ROUTES TO PROCESS THE FORM DATA
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const Crud = require("../model/modelPqrsCrud");
const { createPQRS, getAllPQRS } = require("../model/modelPqrsCrud");


// FOR CREATING A NEW PQRS
router.post("/formPQRS", async (req, res) => {
  //Manejar la solicitud de registro en el servidor
  try {
    // Verificar si se proporcionan todos los campos requeridos
    if (
      !req.body.tipo ||
      !req.body.asunto ||
      !req.body.descripcion ||
      !req.body.imagen ||
      !req.body.fechaCreacion ||
      !req.body.usuarioId
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // Crear un objeto con los datos del nuevo PQRS
    const newPQRS = {
      Tipo: req.body.tipo,
      Asunto: req.body.asunto,
      Descripcion: req.body.descripcion,
      ImagenPath: req.body.imagen,
      FechaCreacion: req.body.fechaCreacion,
      UsuarioID: req.body.usuarioId,
    };
    // Llamar a la función createPQRS para insertar el nuevo PQRS en la base de datos
    createPQRS(newPQRS, (error, insertId) => {
      if (error) {
        console.error("Error al crear el PQRS:", error);
        return res.status(500).json({ error: "Error al crear el PQRS." });
      }
      console.log("PQRS creado con éxito");
      res.status(201).json({ mensaje: "PQRS creado correctamente.", insertId });
    });
  } catch (error) {
    console.error("Error al registrar el PQRS:", error);
    res.status(500).json({ error: "Error al registrar el PQRS." });
  }
});

// ROUTES TO OBTAIN ALL PQRS
router.get("/listarPQRS", async (req, res) => {
  try {
    getAllPQRS((error, pqrs) =>{
      if (error) {
        console.error("Error en la solicitud: ", error);
        res.status(500).json({ error: error.message});
      } else {
        res.json(pqrs);
        console.log("listar pqrs ",pqrs)
      }
    });
  } catch (error) {
    console.log("Error en la solicitud:", error)
    res.status(500).json({ error: error.message });
  }
});

// ROUTES TO OBTAIN A PQRS BY YOUR ID
router.get("/pqrs/:id", async (req, res) => {
  try {
    const pqrsId = req.params.id;
    const pqrs = await pqrsModel.getPQRSById(pqrsId);
    if (!pqrs) {
      res.status(404).json({ message: "PQRS no encontrada" });
    } else {
      res.json(pqrs);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROUTES FOR UPDATING A PQRS BY YOUR ID
router.put("/pqrs/:id", async (req, res) => {
  try {
    const pqrsId = req.params.id;
    const updatedPQRS = req.body;
    const success = await pqrsModel.updatePQRS(pqrsId, updatedPQRS);
    if (success) {
      res.json({ message: "PQRS actualizada con éxito" });
    } else {
      res.status(404).json({ message: "PQRS no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROUTES TO DELETE A PQRS BY ID
router.delete("/pqrs/:id", async (req, res) => {
  try {
    const pqrsId = req.params.id;
    const success = await pqrsModel.deletePQRS(pqrsId);
    if (success) {
      res.json({ message: "PQRS eliminada con éxito" });
    } else {
      res.status(404).json({ message: "PQRS no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;