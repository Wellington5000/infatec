const db = require('./db')
const docente = require('./docente')
const aluno = require('./aluno')
const disciplina = require('./disciplina')

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
disciplina.hasMany(Turma);
aluno.hasMany(Turma);

module.exports = Turma