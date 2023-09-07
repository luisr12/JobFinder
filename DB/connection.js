const { Sequelize } = require('sequelize');

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize('app', 'root', 'usbw', {
  host: 'localhost', // O host do seu banco de dados
  dialect: 'mysql',  // O dialeto do banco de dados (neste caso, MySQL)
});

module.exports = sequelize
