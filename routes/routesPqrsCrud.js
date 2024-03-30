//ROUTES TO PROCESS THE FORM DATA
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Crud = require("../model/modelPqrsCrud");
//const { createPQRS, getAllPQRS, updatePQRS } = require("../model/modelPqrsCrud");

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
    Crud.createPQRS(newPQRS, (error, insertId) => {
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
    Crud.getAllPQRS((error, pqrs) => {
      if (error) {
        console.error("Error en la solicitud: ", error);
        res.status(500).json({ error: error.message });
      } else {
        res.json(pqrs);
        console.log("listar pqrs ", pqrs);
      }
    });
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// ROUTES TO OBTAIN A PQRS BY YOUR ID
router.get("/pqrs/:id", async (req, res) => {
  try {
    const pqrsId = req.params.id;
    const pqrs = await Crud.getPQRSById(pqrsId);
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
router.put("/updatePQRS/:id", async (req, res) => {
  try {
    const pqrsId = req.params.id;
    const updatedPQRS = req.body;
    Crud.updatePQRS(pqrsId, updatedPQRS, (error, resul) => {
      if (error) {
        console.error("Error al actualizar el PQRS:", error);
        return res.status(500).json({ message: "PQRS no encontrada" });
      }
      console.log("PQRS actualizada con éxito");
      res.status(200).json({ mensaje: "PQRS actualizada con éxito", resul });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ROUTES TO DELETE A PQRS BY ID
router.delete("/deletePQRS/:id", async (req, res) => {
  try {
    const pqrsId = req.params.id;
    await Crud.deletePQRS(pqrsId, (error, resul) => {
      if (error) {
        console.error("Error al eliminar el PQRS:", error);
        return res.status(500).json({ message: "PQRS no eliminado" });
      }
      console.log("PQRS eliminado con éxito");
      res.status(200).json({ mensaje: "PQRS eliminado con éxito", resul });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
