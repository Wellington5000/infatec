const db = require('./db')

const Docente = db.sequelize.define('docente', {
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

module.exports = Docente
