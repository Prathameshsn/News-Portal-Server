var Sequelize = require('Sequelize');
var sequelizeConnection = require('../util/database');

const category = sequelizeConnection.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

module.exports = category;