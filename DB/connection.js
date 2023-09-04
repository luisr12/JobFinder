const Sequelize = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './DB/app.db' // Cria um caminho absoluto
});

module.exports = sequelize
