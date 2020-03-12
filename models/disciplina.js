const db = require('./db')

const Disciplina = db.sequelize.define('disciplina', {
  nome: {
    type: db.Sequelize.STRING
  },
  dt_criacao: {
    type: db.Sequelize.DATE
  },
})

module.exports = Disciplina