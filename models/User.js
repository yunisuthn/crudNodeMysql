const Sequelize = require('sequelize');
const db = require('../database/db')

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)