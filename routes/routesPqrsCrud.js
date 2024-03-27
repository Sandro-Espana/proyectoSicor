const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Crud = require("../model/modelPqrsCrud");
const { createPQRS } = require("./modelPqrsCrud"); // Importar la función createPQRS del archivo modelPqrsCrud.js

// RutaS para procesar el formulario

// FOR CREATING A NEW PQRS
router.post("/registro", async (req, res) => {
  //Manejar la solicitud de registro en el servidor
  try {
    // Verificar si se proporcionan todos los campos requeridos
    if (
      !req.body.tipo ||
      !req.body.asunto ||
      !req.body.descripcion ||
      !req.body.respuesta ||
      !req.body.fechaCreacion ||
      !req.body.estado ||
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
      Respuesta: req.body.respuesta,
      FechaCreacion: req.body.fechaCreacion,
      Estado: req.body.estado,
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
router.get("/pqrs", async (req, res) => {
  try {
    const pqrs = await pqrsModel.getAllPQRS();
    res.json(pqrs);
  } catch (error) {
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
