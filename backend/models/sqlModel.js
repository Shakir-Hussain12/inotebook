
// with sequelize ORM

const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the Sequelize configuration

const User = sequelize.define('User', {
 id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
 },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;