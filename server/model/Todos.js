const { DataTypes, Op } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");

const Todos = sequelize.define(
  "todos",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    time: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    day: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.BIGINT,
      defaultValue: Math.floor(Date.now() / 1000),
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Todos;
