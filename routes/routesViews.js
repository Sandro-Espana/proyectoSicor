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

router.post('/createPQRS', (req, res) => {
});

router.get('/listarPQRS', (req, res) => {
});

router.put('/updatePQRS/:id', (req, res) => {
});

router.delete('/deletePQRS/:id', (req, res) => {
});


// MANEGE USERS

router.post('/register', (req, res) => {
});

router.post('/formUser', (req, res) => {
});

router.get('/listUsers', (req, res) => {
});

router.put('/updateUser/:id', (req, res) => {
});

router.delete('/deleteUser/:id', (req, res) => {
});

// MANEGE SANCTION

router.post('/newSanction', (req, res) => {
});

router.get('/listSanction', (req, res) => {
});

router.put('/updateSanction/:id', (req, res) => {
});

router.delete('/deleteSanction/:id', (req, res) => {
});

// MANEGE VEHICLE

router.post('/newVehicle', (req, res) => {
});

router.get('/listVehicle', (req, res) => {
});

router.put('/updateVehicle/:id', (req, res) => {
});

router.delete('/deleteVehicle/:id', (req, res) => {
});


module.exports = router;
