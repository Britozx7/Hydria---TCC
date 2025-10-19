const express = require('express');
const router = express.Router(); 

router.get('/', function(req, res) {
    res.render('pages/index-adm')
});

router.get('/usuarios-adm', function(req, res) {
    res.render('pages/usuarios-adm')
});

router.get('/newsletter-adm', function(req, res) {
    res.render('pages/newsletter-adm')
});

router.get('/ongs-adm', function(req, res) {
    res.render('pages/ongs-adm')
});

router.get('/suporte-adm', function(req, res) {
    res.render('pages/suporte-adm')
});



module.exports = router;