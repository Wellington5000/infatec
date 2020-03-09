const db = require('./db')
var data = new Date();

const Direcao = db.sequelize.define('direcao', {
  nome: {
    type: db.Sequelize.STRING
  },
  cpf: {
    type: db.Sequelize.STRING
  },
  dt_nasc: {
    type: db.Sequelize.DATE
  },
  email: {
    type: db.Sequelize.STRING
  },
  senha: {
    type: db.Sequelize.STRING
  },
})  

module.exports = Direcao

