const Sequelize = require('sequelize');

const sequelize = new Sequelize('DB name', 'user', 'password', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;