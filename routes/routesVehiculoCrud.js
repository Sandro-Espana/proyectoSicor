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
            return res.status(500).json({
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

// ROUTES TO OBTAIN ALL VEHICLE POR ID_APT
router.get("/listVehicle/:userId", async (req, res) => {
  try {
    const Id_Apt = req.params.userId;
    console.log("Id_Apt ", Id_Apt);
    crudVehicle.vehiclesByIdApt(Id_Apt, (error, vehicle) => {
      if (error) {
        console.error("Error en la solicitud: ", error);
        res.status(500).json({ error: error.message });
      } else {
        res.json(vehicle);
        console.log("Listado de vehiculos", vehicle);
      }
    });
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// ROUTE TO DELETE A VEHICLE
router.delete("/deleteVehicle/:vehicleId", async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    console.log("Vehicle ID to delete: ", vehicleId);
    crudVehicle.deleteVehicleById(vehicleId, (error, deletVehi) => {
      if (error) {
        console.error("Error deleting vehicle: ", error);
        res.status(500).json({ error: error.message });
      } else {
        console.log("Vehicle deleted successfully ", deletVehi);
        res.status(201).json({ message: "Vehicle deleted successfully" });
      }
    });
  } catch (error) {
    console.log("Error in request:", error);
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
