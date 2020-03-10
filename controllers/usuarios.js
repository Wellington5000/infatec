const express = require('express')
const router = express.Router()
const Direcao = require('../models/direcao')
const bodyParser = require('body-parser');
const app = express()

//Body-Parser permite a obtenção dos dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

router.get('/novoDiretor', function (req, res) {
  res.render('includes/formularioDirecao');
})

router.post('/add', function(req, res){
  Direcao.create({
    nome:req.body.nome,
    cpf:req.body.cpf,
    dt_nasc:req.body.dt_nasc,
    email:req.body.email,
    senha:req.body.senha    
  }).then(function(){
    res.redirect('direcao')
  })
})

router.get('/delete/:id', function(req, res){
  Direcao.destroy({where:{'id': req.params.id}}).then(function(){
    res.redirect('../direcao')
  })
})

router.get('/alterar', function (req, res) {
  res.render('includes/formularioAlterar');
})

module.exports = router