const { DataTypes, Op } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");

const information = sequelize.define(
  "information",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = information;
