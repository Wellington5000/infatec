const app = require('express')
const router = app.Router()
const Direcao = require('../models/direcao')

router.get('/login', function (req, res) {
  res.render('includes/formularioLogin');
})

router.get('/telaInicial', function (req, res) {
  res.render('includes/telaInicial');
})

router.get('/direcao', function (req, res){
  Direcao.findAll().then(function(direcao){
    res.render('includes/telaDirecao', {direcao: direcao})
  })
})

module.exports = router