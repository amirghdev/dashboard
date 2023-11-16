const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    programming: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    university: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    unit: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },
    semesterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    financial: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.BIGINT,
      defaultValue: Date.now(),
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    active_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    forgot_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    theme: {
      type: DataTypes.ENUM("light", "dark"),
      defaultValue: "light",
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "avatar.png",
    },
    avatar_confirmation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Users;
