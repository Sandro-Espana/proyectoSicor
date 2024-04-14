const express = require("express");
const router = express.Router();
const {
  validatePlate,
  availableParking,
  createVehicle,
  vehiclesByIdApt,
  deleteVehicleById
} = require("../model/tbVehicle");
const { validateParking } = require("../model/tbApartament");

router.post("/newVehicle", async (req, res) => {
  try {
    if (
      !req.body.id_resident ||
      !req.body.type_vehicle ||
      !req.body.brand ||
      !req.body.model ||
      !req.body.plate ||
      !req.body.id_apartament ||
      !req.body.parking
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // FUNCTION TO CHECK IF THE VEHICLE LICENSE PLATE ALREADY EXISTS
    const existsPlate = await validatePlate(req.body.plate);
    console.log(existsPlate);
    if (existsPlate != "") {
      return res
        .status(400)
        .json({ error: `La placa ${req.body.plate} ya esta registrada.` });
    }

    // VERIFY IF THE PARKING EXISTS
    const existsParking = await validateParking(req.body.parking);
    if (existsParking == "") {
      return res
        .status(400)
        .json({ error: `El parqueadero ${req.body.parking} no existe.` });
    }

    // VERIFY IF THE PARKING IS ALREADY OCCUPIED
    const occupiedParking = await availableParking(req.body.parking);
    if (occupiedParking != "") {
      return res.status(400).json({
        error: `El parqueaddero ${req.body.parking} no se encuentra disponible.`,
      });
    }

    // CREATE AN OBJECT WITH THE VEHICLE FORM DATA
    const newVehicle = {
      id_resident: req.body.id_resident,
      type_vehicle: req.body.type_vehicle,
      brand: req.body.brand,
      model: req.body.model,
      plate: req.body.plate,
      id_apartament: req.body.id_apartament,
      parking: req.body.parking,
    };

    // FUNCTION TO INSERT THE NEW VEHICLE INTO THE DB
    const vehicleCreated = await createVehicle(newVehicle);
    if (vehicleCreated) {
      return res.status(201).json({
        message: `Vehículo con claca ${req.body.plate} registrado correctamente.`,
      });
    }
    console.error("Error al crear el vehículo:", error);
    return res.status(500).json({
      error: "Error al crear el vehículo.",
    });
  } catch (error) {
    console.error(" catch Error al registrar el vehículo:", error);
    res.status(500).json({ error: "Error al registrar el vehículo." });
  }
});

// ROUTES TO OBTAIN ALL VEHICLE POR ID_APT
router.get("/listVehicle/:id_apartament", async (req, res) => {
  try {
    const vehicleListIdApt = await vehiclesByIdApt(req.params.id_apartament);
    if (vehicleListIdApt) {
      return res.json(vehicleListIdApt);
    }
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// ROUTE TO DELETE A VEHICLE
router.delete("/deleteVehicle/:id_Vehicle", async (req, res) => {
  try {
    const vehicleDelete = await deleteVehicleById( req.params.id_vehicle);
    if (vehicleDelete) {
      return res.status(201).json({
        message: `Vehiculo ${req.params.id_vehicle} eliminado corractamente.`,
      });
    }
  } catch (error) {
    console.log("Error in request:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

/*
THIS FILE CONTAINS THE FOLLOWING PATHS
newVehicle == REGISTER A NEW VEHICLE
listVehicle/:id_apartament == LIST VEHICLES BY APARTAMENT ID
deleteVehicle/:id_Vehicle == DELETE VEHICLE BY ID
*/