const express = require("express");
const router = express.Router();
const crudSupplier = require("../model/modelTbProveedor");


// PATH TO CREATE A NEW SUPPLIER.
router.post("/newSupplier", async (req, res) => {
  try {
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

    // CREATE NEW OBJECT SUPPLIER
    const newSupplier = {
      tipo_servicio: req.body.tipo_servicio,
      razon_social: req.body.razon_social,
      descripcion: req.body.descripcion,
      nombre_contacto: req.body.nombre_contacto,
      celular: req.body.celular,
      email: req.body.email,
    };

    // TO INSERT THE NEW SUPPLIER IN DB
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

// ROUTE TO OBTAIN ALL SUPPLIERS
router.get("/listSupplier", async (req, res) => {
  try {
    crudSupplier.suppliersList((error, suppliers) => {
      if (error) {
        console.error("Error en la solicitud: ", error);
        res.status(500).json({ error: error.message });
      } else {
        console.log("Listado de proveedores", suppliers);
        res.status(201).json(suppliers);
      }
    });
  } catch (error) {
    console.log("Error en la solicitud:", error);
    res.status(500).json({ error: error.message });
  }
});

// PATH TO UPDATE A SUPPLIER BY ITS ID
router.put("/updateSupplier/:id", async (req, res) => {
  try {
    const supplierId = req.params.id;
     // UPDATE OBJECT SUPPLIER
    const updatSupplier = {
      tipo_servicio: req.body.tipo_servicio,
      razon_social: req.body.razon_social,
      descripcion: req.body.descripcion,
      nombre_contacto: req.body.nombre_contacto,
      celular: req.body.celular,
      email: req.body.email,
    };
    // UPDATE IN THE DB
    crudSupplier.updateSupplier(supplierId, updatSupplier, (error, result) => {
      if (error) {
        console.error("Error al actualizar el proveedor:", error);
        return res.status(500).json({ message: "Proveedor no encontrado" });
      }
      console.log("Proveedor actualizado con éxito");
      res.status(201).json({ message: "Proveedor actualizado con éxito", result });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// PATH TO REMOVE SUPPLIER BY ID
router.delete("/deleteSupplier/:id", async (req, res) => {
  try {
    const supplierId = req.params.id;
    console.log("Supplier ID to delete: ", supplierId);
    crudSupplier.deleteSupplierById(supplierId, (error, deletedSupplier) => {
      if (error) {
        console.error("Error deleting supplier: ", error);
        res.status(500).json({ error: error.message });
      } else {
        console.log("Proveedor eliminado", deletedSupplier);
        res.status(201).json({ message: "Proveedor eliminado." });
      }
    });
  } catch (error) {
    console.log("Error in request:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
