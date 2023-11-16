const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");

const Semesters = sequelize.define(
  "semesters",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      onDelete: "cascade",
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    unit: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    total: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    total_pass: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.BIGINT,
      defaultValue: Math.floor(Date.now() / 1000),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Semesters;
