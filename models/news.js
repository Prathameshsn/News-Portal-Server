var Sequelize = require('Sequelize');
var sequelizeConnection = require('../util/database');

const news = sequelizeConnection.define('news', {
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
    category: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
      // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = news;