const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Session extends Model {}

Session.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'session',
  }
);

module.exports = Session;