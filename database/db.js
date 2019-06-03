const Sequelize = require ('sequelize')
const db = {};
const sequelize = new Sequelize('test', 'root', 'password',{
    host: 'localhost',
    dialect: "mysql",
    operatorsAliases: false,
    pool:{
        ma: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db