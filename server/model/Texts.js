const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");

const Texts = sequelize.define(
  "texts",
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
    subject: {
      type: DataTypes.TEXT,
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
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Texts;
