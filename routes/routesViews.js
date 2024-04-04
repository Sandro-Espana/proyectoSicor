const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/registro', (req, res) => {
});

router.get('/admin', (req, res) => {
    const viewPath = path.join(__dirname,  '../views/profile/admin.ejs');
    res.render(viewPath);
});

router.get('/residen', (req, res) => {
    const viewPath = path.join(__dirname,  '../views/profile/residen.ejs');
    res.render(viewPath);
});


router.post('/formPQRS', (req, res) => {
});

router.get('/listarPQRS', (req, res) => {
});

router.put('/updatePQRS/:id', (req, res) => {
});

router.delete('/deletePQRS/:id', (req, res) => {
});


module.exports = router;
