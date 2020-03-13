const express = require('express')
const Aluno = require('../models/aluno')
const bodyParser = require('body-parser');
const moment = require('moment')
const router = express.Router()
const app = express()

//Body-Parser permite a obtenção dos dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Rota para a tela inicial do Aluno
router.get('/aluno', function (req, res){
  Aluno.findAll().then(function(docente){
    res.render('includes/Aluno/telaAluno', {docente: docente})
  })
})

//Rota para o formulario para adicionar novo aluno
router.get('/novoAluno', function (req, res) {
  res.render('includes/Aluno/formularioAluno');
})

//Rota para adicionar um novo aluno a partir do formulario
router.post('/addAluno', function(req, res){
  Aluno.create({
    nome:req.body.nome,
    cpf:req.body.cpf,
    dt_nasc:req.body.dt_nasc,
    email:req.body.email,
  }).then(function(){
    res.redirect('aluno')
  })
})

//Rota para deletar aluno
router.get('/deletarAluno/:id', function(req, res){
  Aluno.destroy({where:{'id': req.params.id}}).then(function(){
    res.redirect('../aluno')
  })
})

//Rota para o formulário alterar aluno 
router.get('/alterarAluno:id', function (req, res) {
  Aluno.findAll({where:{'id': req.params.id}}).then(function(direcao){
    res.render('includes/formularioAlterar',{direcao: direcao});
  })
})

//Rota para atualizar os dados do aluno a partir do formulário
router.post('/atualizar:id', function (req, res) {
  const dia = moment(req.body.dt_nasc)
  Aluno.update({nome: req.body.nome, cpf: req.body.cpf, dt_nasc:dia},{where:{'id': req.params.id}}).then(function(){
    res.redirect('aluno')
  })
})

module.exports = router