const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();

//Define o Layout default do 
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body-Parser permite a obtenção dos dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//carrega a estilização
app.use(express.static(path.join(__dirname, 'css')))

//Rotas
app.get('/login', function (req, res) {
  res.render('formularioLogin');
})



app.listen(8080);