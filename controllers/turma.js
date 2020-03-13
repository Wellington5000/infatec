const express = require('express')
const Turma = require('../models/turma')
const Docente = require('../models/docente')
const Disciplina = require('../models/disciplina')
const bodyParser = require('body-parser');
const moment = require('moment')
const router = express.Router()
const app = express()

//Body-Parser permite a obtenção dos dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rota para a tela inicial do docente
router.get('/turma', function (req, res){
  Turma.findAll().then(function(turma){
    res.render('includes/Turma/telaTurma', {turma: turma})
  })
})
var historia = 'História';
//Rota para o formulario para adicionar novo aluno
router.get('/novaTurma', function (req, res) {
  Docente.findAll().then(function(docente){
    Disciplina.findAll().then(function(disciplina){
      res.render('includes/Turma/formularioTurma', {docente: docente, disciplina:disciplina})
    })
  })
})

router.get('/erro', function (req, res){
  res.send("Não consegui fazer a tempo")
})

module.exports = router