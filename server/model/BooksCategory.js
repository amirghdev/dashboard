const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");

const BooksCategory = sequelize.define(
  "books_category",
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

module.exports = BooksCategory;
