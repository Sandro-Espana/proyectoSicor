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
<<<<<<< HEAD

router.post('/createPQRS', (req, res) => {
});
=======
>>>>>>> desarrollo

router.post('/newPqrs', (req, res) => {
}); //OK

router.get('/listPqrs', (req, res) => {
}); //OK

router.get('/listPqrsResident/:id_resident', (req, res) => {
}); //

router.put('/updatePqrs/:id_pqrs', (req, res) => {
}); //OK

router.delete('/deletePqrs/:id_pqrs', (req, res) => {
}); //OK


<<<<<<< HEAD
// MANEGE USERS

router.post('/register', (req, res) => {
});
=======
// MANEGE RESIDENT
>>>>>>> desarrollo

router.post('/newResident', (req, res) => {
}); //OK

router.get('/listResident', (req, res) => {
}); //OK

router.put('/updateUser/:id', (req, res) => {
});

router.delete('/deleteResident/:id', (req, res) => {
}); //OK


// MANEGE PROPRIETOR

router.post('/newProprietor', (req, res) => {
});

router.get('/listProprietor', (req, res) => {
});

router.put('/updateProprietor/:id', (req, res) => {
});

router.delete('/deleteProprietor/:id', (req, res) => {
});


// MANEGE SANCTION

router.post('/newSanction', (req, res) => {
}); //OK

router.get('/listSanction', (req, res) => {
}); // OK

router.put('/updateSanction/:id_resident', (req, res) => {
}); //OK

router.delete('/deleteSanction/:id', (req, res) => {
});

// MANEGE VEHICLE
<<<<<<< HEAD

router.post('/newVehicle', (req, res) => {
});

router.get('/listVehicle', (req, res) => {
});

router.put('/updateVehicle/:id', (req, res) => {
});

router.delete('/deleteVehicle/:id', (req, res) => {
});

=======
>>>>>>> desarrollo

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
}); //OK

router.get('/listSupplier', (req, res) => {
});  //OK

router.put('/updateSupplier/:id', (req, res) => {
}); //OK


// MANEGE COMMON AREA ADMIN

router.post('/newCommonArea', (req, res) => {
});

router.get('/listCommonArea', (req, res) => {
});

router.put('/updateCommonArea/:id', (req, res) => {
});

router.delete('/deleteCommonArea/:id', (req, res) => {
});

// MANEGE COMMON AREA RESIDENT

router.post('/reserveCommonArea', (req, res) => {
});
module.exports = router;
