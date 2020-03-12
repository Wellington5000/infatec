const express = require('express')
const Docente = require('../models/docente')
const bodyParser = require('body-parser');
const moment = require('moment')
const router = express.Router()
const app = express()

//Body-Parser permite a obtenção dos dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rota para a tela inicial do docente
router.get('/doc', function (req, res){
  Docente.findAll().then(function(docente){
    res.render('includes/telaDocente', {docente: docente})
  })
})

//Rota para o formulario para adicionar novo docente
router.get('/novoDocente', function (req, res) {
  res.render('includes/formularioDocente');
})

//Rota para deletar docente
router.get('/deletarDocente/:id', function(req, res){
  Docente.destroy({where:{'id': req.params.id}}).then(function(){
    res.redirect('../doc')
  })
})

//Rota para adicionar um novo docente a partir do formulario
router.post('/addDocente', function(req, res){
  Docente.create({
    nome:req.body.nome,
    cpf:req.body.cpf,
    dt_nasc:req.body.dt_nasc,
    email:req.body.email,
  }).then(function(){
    res.redirect('doc')
  })
})

//Rota para o formulário alterar docente 
router.get('/alterarDocente:id', function (req, res) {
  Docente.findAll({where:{'id': req.params.id}}).then(function(direcao){
    res.render('includes/formularioAlterar',{direcao: direcao});
  })
})

//Rota para atualizar os dados do docente a partir do formulário
router.post('/atualizar:id', function (req, res) {
  const dia = moment(req.body.dt_nasc)
  Docente.update({nome: req.body.nome, cpf: req.body.cpf, dt_nasc:dia},{where:{'id': req.params.id}}).then(function(){
    res.redirect('doc')
  })
})

module.exports = router