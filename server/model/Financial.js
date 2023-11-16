const { DataTypes, Op } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");
const FinancialsCategory = require("./financialCategory");

const Financials = sequelize.define(
  "financial",
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
    cat_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: FinancialsCategory,
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
    type: {
      type: DataTypes.ENUM("financial", "income"),
      allowNull: false,
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

module.exports = Financials;
