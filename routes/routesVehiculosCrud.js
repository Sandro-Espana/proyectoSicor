const express = require("express");
const router = express.Router();
const crudVehicle = require("../model/modelTbVehiculo");

router.post("/newVehicle", async (req, res) => {
  try {
    if (
      !req.body.propietarioID ||
      !req.body.tipoVehiculo ||
      !req.body.marca ||
      !req.body.modelo ||
      !req.body.placa ||
      !req.body.unidadResidencialID
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // Crear un objeto con los datos del nuevo vehículo
    const nuevoVehiculo = {
      propietarioID: req.body.propietarioID,
      tipoVehiculo: req.body.tipoVehiculo,
      marca: req.body.marca,
      modelo: req.body.modelo,
      placa: req.body.placa,
      unidadResidencialID: req.body.unidadResidencialID,
    };
 console.log("nuevoVehiculo: ",nuevoVehiculo)
    // Llamar a la función createVehicle para insertar el nuevo vehículo en la base de datos
    crudVehicle.createVehicle(nuevoVehiculo, (error, insertId) => {
      if (error) {
        console.error("Error al crear el vehículo:", error);
        return res
          .status(500)
          .json({ error: "Error al crear el vehículo en la base de datos." });
      }
      console.log("Vehículo registrado con éxito");
      res
        .status(201)
        .json({ mensaje: "Vehículo registrado correctamente.", insertId });
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
