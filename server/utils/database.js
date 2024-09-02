const Sequelize = require('sequelize');

const sequelize = new Sequelize('real-estate', 'root', 'Manasoko@1', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;