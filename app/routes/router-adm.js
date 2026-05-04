const express = require('express');
const router = express.Router();
const { UsuarioModel } = require("../models/usuarioModel");

router.get('/', function(req, res) {
    res.render('pages/index-adm')
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

router.get('/perfil-adm', function(req, res) {
    res.render('pages/perfil-adm')
});


router.get('/usuarios-adm', async function(req, res) {
    try {
        const usuarios = await UsuarioModel.findAll()
        res.render('pages/usuarios-adm', 'pages/index-adm', { usuarios: usuarios })
    } catch(erro) {
        console.log('Erro ao buscar usuários:', erro)
        res.render('pages/usuarios-adm', 'pages/index-adm', { usuarios: [] })
    }
});

router.post("/manter-usuario", async (req, res) => {
    const objDados = {
        id : req.body.id,
        nome: req.body.nome,
        email: req.body.email,
    }

    try {
        if(objDados.id == 0){
            const result = await UsuarioModel.create(objDados);  
        }else{
            const result = await UsuarioModel.update(objDados);  
        }
        
        res.redirect("/adm/usuarios-adm");
    } catch (erro) {
        console.log(erro);
    }

})


//exclusão física - hard delete
router.get("/deletar-fisico", async (req, res) => {
    const id = req.query.id;
    try {
        const result = await UsuarioModel.deleteFisic(id);
        res.redirect("/adm/usuarios-adm");
    } catch (erro) {
        console.log(erro);
    }
});

//exclusão lógica - soft delete
router.get("/deletar-logico", async (req, res) => {
    const id = req.query.id;
    try {
        const result = await UsuarioModel.deleteLogic(id);
        res.redirect("/adm/usuarios-adm");
    } catch (erro) {
        console.log(erro);
    }
});

module.exports = router;