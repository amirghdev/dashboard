const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");
const Users = require("./Users");

const sessions = sequelize.define(
  "sessions",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: Users,
      //   key: "id",
      // },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires: {
      type: DataTypes.BIGINT,
      defaultValue: Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60),
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = sessions;
