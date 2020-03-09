const Sequelize = require('sequelize')

//Conexão com o banco
const sequelize = new Sequelize('infatec', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}