const { DataTypes, Op } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");

const FinancialsCategory = sequelize.define(
  "financial_category",
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
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    total: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.BIGINT,
      defaultValue: Math.floor(Date.now() / 1000),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = FinancialsCategory;
