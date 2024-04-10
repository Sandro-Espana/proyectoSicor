const express = require("express");
const router = express.Router();
const crudSupplier = require("../model/modelTbProveedor");

router.post("/newSupplier", async (req, res) => {
  try {
    // Verificar que se proporcionen todos los campos requeridos
    if (
      !req.body.tipo_servicio ||
      !req.body.razon_social ||
      !req.body.descripcion ||
      !req.body.nombre_contacto ||
      !req.body.celular ||
      !req.body.email
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // Crear un objeto con los datos del nuevo proveedor
    const newSupplier = {
      tipo_servicio: req.body.tipo_servicio,
      razon_social: req.body.razon_social,
      descripcion: req.body.descripcion,
      nombre_contacto: req.body.nombre_contacto,
      celular: req.body.celular,
      email: req.body.email,
    };

    // Llamar a la función createSupplier para insertar el nuevo proveedor en la base de datos
    crudSupplier.createSupplier(newSupplier, (error, insertId) => {
      if (error) {
        console.error("Error al crear el proveedor:", error);
        return res
          .status(500)
          .json({ error: "Error al crear el proveedor en la base de datos." });
      }
      console.log("Proveedor registrado con éxito");
      res
        .status(201)
        .json({ message: "Proveedor registrado correctamente.", id: insertId });
    });
  } catch (error) {
    console.error("Error al registrar el proveedor:", error);
    res.status(500).json({ error: "Error al registrar el proveedor." });
  }
});

// RUTA PARA OBTENER TODOS LOS PROVEEDORES
router.get("/listSupplier", async (req, res) => {
  try {
    crudSupplier.suppliersList((error, suppliers) => {
      if (error) {
        console.error("Error en la solicitud: ", error);
        res.status(500).json({ error: error.message });
      } else {
        console.log("Listado de proveedores", suppliers);
        res.status(201).json({
          message: "Proveedor registrado correctamente.",
          id: suppliers,
        });
      }
    });
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
