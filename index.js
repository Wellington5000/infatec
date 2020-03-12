const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
var mysql = require('mysql');
var session = require('express-session');
const moment = require('moment')
const direcao = require('./controllers/direcao')
const docente = require('./controllers/docente')
const aluno = require('./controllers/aluno')
const disciplina = require('./controllers/disciplina')
const app = express();

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'infatec'
});

//abrea sessão
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Define o Layout default do 
app.engine('handlebars', handlebars({defaultLayout: 'main', helpers: {
	formatDate: (date) => {
			return moment(date).format('YYYY-MM-DD')
	}
}}));
app.set('view engine', 'handlebars');

//Body-Parser permite a obtenção dos dados do formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//carrega a estilização
app.use(express.static(path.join(__dirname, 'css')))
var res;
app.post('/auth', function(request, response) {
	var username = request.body.usuario;
	var password = request.body.senha;
	if (username && password) {
		connection.query('SELECT * FROM usuario WHERE nome = ? AND senha = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('diretor/telaInicial');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function (req, res) {
  res.redirect('diretor/telaInicial');
})

//Rotas
app.use('/docente', docente)
app.use('/diretor', direcao)
app.use('/aluno', aluno)
app.use('/disciplina', disciplina)

app.listen(8080);