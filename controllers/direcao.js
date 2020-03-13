const express = require('express')
const Direcao = require('../models/direcao')
const bodyParser = require('body-parser');
const moment = require('moment')
const router = express.Router()
const app = express()


//Body-Parser permite a obtenção dos dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.get('/telaInicial', function (req, res) {
  res.render('includes/telaInicial');
})

router.get('/direcao', function (req, res){
  Direcao.findAll().then(function(direcao){
    res.render('includes/Direcao/telaDirecao', {direcao: direcao, title: 'Direção', departamento: 'Direcao'})
  })
})

router.get('/novoDirecao', function (req, res) {
  res.render('includes/Direcao/formularioDirecao');
})

router.post('/add', function(req, res){
  console.log(req.body.nome);
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

router.get('/deletarDirecao/:id', function(req, res){
  Direcao.destroy({where:{'id': req.params.id}}).then(function(){
    res.redirect('../direcao')
  })
})

router.get('/alterar:id', function (req, res) {
  Direcao.findAll({where:{'id': req.params.id}}).then(function(direcao){
    res.render('includes/formularioAlterar',{direcao: direcao});
  })
})

router.post('/atualizar:id', function (req, res) {
  const dia = moment(req.body.dt_nasc)
  if(req.body.nova_senha == ''){
    Direcao.update({nome: req.body.nome, cpf: req.body.cpf, dt_nasc:dia},{where:{'id': req.params.id}}).then(function(direcao){
      res.redirect('direcao')
    })
  }
  else{
    Direcao.update({nome: req.body.nome, cpf: req.body.cpf, dt_nasc:dia, senha: req.body.nova_senha},{where:{'id': req.params.id}}).then(function(direcao){
      res.redirect('direcao')
    })
  }
})

router.get('/procurar', function (req, res) {
  Direcao.findAll({where:{'nome': req.body.pesquisa}}).then(function(direcao){
    res.redirect('direcao',{direcao: direcao});
  })
})


module.exports = router