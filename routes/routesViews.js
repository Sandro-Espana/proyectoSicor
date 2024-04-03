const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/registro', (req, res) => {
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/admin', (req, res) => {
    res.render('admin');
});

router.get('/residen', (req, res) => {
    res.render('residen');
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
