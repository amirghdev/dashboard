const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");
const BooksCategory = require("./BooksCategory");

const Books = sequelize.define(
  "books",
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
        model: BooksCategory,
        key: "id",
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "book.jpg",
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
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

module.exports = Books;
