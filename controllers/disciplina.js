const express = require('express')
const Disciplina = require('../models/disciplina')
const bodyParser = require('body-parser');
const moment = require('moment')
const router = express.Router()
const app = express()

//Body-Parser permite a obtenção dos dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rota para a tela inicial do Aluno
router.get('/disciplina', function (req, res){
  Disciplina.findAll().then(function(disciplina){
    res.render('includes/Disciplina/telaDisciplina', {disciplina: disciplina})
  })
})

//Rota para o formulario para adicionar novo aluno
router.get('/novoDisciplina', function (req, res) {
  res.render('includes/Disciplina/formularioDisciplina');
})

//Rota para adicionar um novo aluno a partir do formulario
router.post('/addDisciplina', function(req, res){
  Disciplina.create({
    nome:req.body.nome,
    dt_criacao:req.body.dt_nasc,
  }).then(function(){
    res.redirect('disciplina')
  })
})

//Rota para deletar aluno
router.get('/deletarDisciplina/:id', function(req, res){
  Disciplina.destroy({where:{'id': req.params.id}}).then(function(){
    res.redirect('../disciplina')
  })
})

//Rota para o formulário alterar aluno 
router.get('/alterarDisciplina:id', function (req, res) {
  Disciplina.findAll({where:{'id': req.params.id}}).then(function(direcao){
    res.render('includes/Disciplina/formularioAlterarDisciplina',{direcao: direcao});
  })
})

//Rota para atualizar os dados do aluno a partir do formulário
router.post('/atualizar:id', function (req, res) {
  const dia = moment(req.body.dt_nasc)
  Disciplina.update({nome: req.body.nome, dt_nasc:dia},{where:{'id': req.params.id}}).then(function(){
    res.redirect('disciplina')
  })
})


module.exports = router