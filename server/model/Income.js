const { DataTypes, Op } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");

const incomes = sequelize.define(
  "income",
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
    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      defaultValue: Date.now(),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = incomes;
