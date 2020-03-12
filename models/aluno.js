const db = require('./db')

const Aluno = db.sequelize.define('aluno', {
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
})

module.exports = Aluno

