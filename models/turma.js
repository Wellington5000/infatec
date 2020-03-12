const db = require('./db')
const docente = require('./docente')

const Turma = db.sequelize.define('turma', {
  nome: {
    type: db.Sequelize.STRING
  },
  ano: {
    type: db.Sequelize.STRING
  },
  dt_criacao: {
    type: db.Sequelize.DATE
  },
})

docente.hasMany(Turma); // Will add userId to Task model
Turma.hasMany(docente)

Turma.sync({force:true})