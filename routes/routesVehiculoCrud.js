const express = require("express");
const router = express.Router();
const crudVehicle = require("../model/modelTbVehicle");

router.post("/newVehicle", async (req, res) => {
  try {
    if (
      !req.body.tipo_vehiculo ||
      !req.body.marca ||
      !req.body.modelo ||
      !req.body.placa
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }
    const placa = req.body.placa;
    // Validar si la placa ya existe en la base de datos
    crudVehicle.validatePlate(placa, (error, result) => {
      if (error) {
        console.error("Error al validar la placa:", error);
        return res.status(500).json({ error: "Error al validar la placa." });
      }
      if (!result) {
        // Crear un objeto con los datos del nuevo vehículo
        const newVehicle = {
          id_residente: req.body.userId,
          tipo_vehiculo: req.body.tipo_vehiculo,
          marca: req.body.marca,
          modelo: req.body.modelo,
          placa: req.body.placa,
          id_apartamento: req.body.idApt,
        };
        // Llamar a la función createVehicle para insertar el nuevo vehículo en la base de datos
        crudVehicle.createVehicle(newVehicle, (error, insertId) => {
          if (error) {
            console.error("Error al crear el vehículo:", error);
            return res
              .status(500)
              .json({
                error: "Error al crear el vehículo en la base de datos.",
              });
          }
          console.log("Vehículo registrado con éxito");
          res
            .status(201)
            .json({ mensaje: "Vehículo registrado correctamente." });
        });
      } else {
        console.log("La placa ya está registrada");
        return res.status(404).json({ error: "La placa ya está registrada." });
      }
    });
  } catch (error) {
    console.error("Error al registrar el vehículo:", error);
    res.status(500).json({ error: "Error al registrar el vehículo." });
  }
});

// ROUTES TO OBTAIN ALL VEHICLE
router.get("/listVehicle", async (req, res) => {
  try {
    crudVehicle.vehiclesByIdApt((error, pqrs) => {
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

module.exports = router;
