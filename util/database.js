const Sequelize = require('sequelize');

const sequelizeConnection = new Sequelize('news_portal', 'root', 'root123', {
     dialect: 'mysql',
     host: 'localhost'
})

sequelizeConnection.authenticate()
.then(() => {
     console.log('Connection has been established successfully.');
})
.catch(err => {
     console.error('Unable to connect to the database:', err);
});

module.exports = sequelizeConnection;