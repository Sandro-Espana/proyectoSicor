const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');


// HOME APP

router.get('/', (req, res) => {
    res.render('index');
});


// PROFILES

router.get('/admin', (req, res) => {
    const viewPath = path.join(__dirname,  '../views/profile/admin.ejs');
    res.render(viewPath);
});

router.get('/residen', (req, res) => {
    const viewPath = path.join(__dirname,  '../views/profile/residen.ejs');
    res.render(viewPath);
});

// MANAGE PQRS

router.post('/formPQRS', (req, res) => {
});

router.get('/listarPQRS', (req, res) => {
});

router.put('/updatePQRS/:id', (req, res) => {
});

router.delete('/deletePQRS/:id', (req, res) => {
});


// MANEGE RESIDENT

router.post('/newResident', (req, res) => {
}); //OK

router.post('/formUser', (req, res) => {
});

router.get('/listResident', (req, res) => {
}); //OK

router.put('/updateUser/:id', (req, res) => {
});

router.delete('/deleteResident/:id', (req, res) => {
}); //OK

// MANEGE SANCTION

router.post('/newSanction', (req, res) => {
}); //OK

router.get('/listSanction', (req, res) => {
}); // OK

router.put('/updateSanction/:id', (req, res) => {
});

router.delete('/deleteSanction/:id', (req, res) => {
});

// MANEGE VEHICLE

router.post('/newVehicle', (req, res) => {
});// OK

router.get('/listVehicle', (req, res) => {
});

router.get('/listVehicle/:id_apartament', (req, res) => {
});//OK

router.delete('/deleteVehicle/:id_Vehicle', (req, res) => {
});//OK


// MANEGE PET

router.post('/newPet', (req, res) => {
}); // OK

router.get('/listPet', (req, res) => {
});

router.put('/updatePet/:id_apt', (req, res) => {
}); //OK

router.delete('/deletePet/:id_pet', (req, res) => {
}); //OK


// MANEGE SUPPLIER

router.post('/newSupplier', (req, res) => {
});

router.get('/listSupplier', (req, res) => {
});

router.put('/updateSupplier/:id', (req, res) => {
});

router.delete('/deleteSupplier/:id', (req, res) => {
});

// MANEGE COMMON ZONE

router.post('/newCommonArea', (req, res) => {
});

router.get('/listCommonArea', (req, res) => {
});

router.put('/updateCommonArea/:id', (req, res) => {
});

router.delete('/deleteCommonArea/:id', (req, res) => {
});

module.exports = router;
