const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Property = sequelize.define('Property', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    propertyName: { type: Sequelize.STRING, allowNull: false },
    propertyDescription: { type: Sequelize.STRING, allowNull: false },
    price: {type: Sequelize.INTEGER, allowNull: false}
});
