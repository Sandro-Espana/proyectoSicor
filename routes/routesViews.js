const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('index');
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



module.exports = router;
