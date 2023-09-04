const Sequelize = require('sequelize'); // chama o framework sequelize
const db = require('../DB/connection');// cria a conexão com o banco de dados


const Job = db.define('job', {
    title:{
        type:Sequelize.STRING,
    },
    description:{
        type:Sequelize.STRING,
    },
    salary:{
        type:Sequelize.STRING,
    },
    company:{
        type:Sequelize.STRING,
    },
    email:{
        type:Sequelize.STRING,
    },
    new_job:{
        type:Sequelize.INTEGER,
    }

});

module.exports = Job