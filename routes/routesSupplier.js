const express = require("express");
const router = express.Router();
const { createSupplier, suppliersList, updateSupplier } = require("../model/tbSupplier");

// PATH TO CREATE A NEW SUPPLIER.
router.post("/newSupplier", async (req, res) => {
  try {
    if (
      !req.body.type_contract ||
      !req.body.monthly_value ||
      !req.body.annual_value ||
      !req.body.start_date ||
      !req.body.end_date ||
      !req.body.contract_number ||
      !req.body.service_type ||
      !req.body.contract_status ||
      !req.body.social_reason ||
      !req.body.contac_name ||
      !req.body.mobile ||
      !req.body.description ||
      !req.body.email
    ) {
      return res
        .status(400)
        .json({ error: "Por favor, proporciona todos los campos requeridos." });
    }

    // CREATE NEW OBJECT SUPPLIER
    const newSupplier = {
      type_contract: req.body.type_contract,
      monthly_value: req.body.monthly_value,
      annual_value: req.body.annual_value,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      contract_number: req.body.contract_number,
      service_type: req.body.service_type,
      contract_status: req.body.contract_status,
      social_reason: req.body.social_reason,
      contact_name: req.body.contac_name,
      mobile: req.body.mobile,
      description: req.body.description,
      email: req.body.email,
    };

    // TO INSERT THE NEW SUPPLIER IN DB
    await createSupplier(newSupplier);
    return res
      .status(201)
      .json({
        message: ` Proveedor ${req.body.social_reason} registrado.`,
      });
  } catch (error) {
    console.error("Error al registrar el proveedor:", error);
    res.status(500).json({ error: "Error al registrar el proveedor." });
  }
});

// ROUTE TO OBTAIN ALL SUPPLIERS
router.get("/listSupplier", async (req, res) => {
  try {
    const response = await suppliersList();
    res.status(201).json(response);
    console.log(response)
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
      type_contract: req.body.type_contract,
      monthly_value: req.body.monthly_value,
      annual_value: req.body.annual_value,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      contract_number: req.body.contract_number,
      service_type: req.body.service_type,
      contract_status: req.body.contract_status,
      social_reason: req.body.social_reason,
      contact_name: req.body.contac_name,
      mobile: req.body.mobile,
      description: req.body.description,
      email: req.body.email,
    };
    // UPDATE IN THE DB
    await updateSupplier(supplierId, updatSupplier);
    res.status(201).json({
      message: ` Proveedor ${req.body.social_reason} actualizado.`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
