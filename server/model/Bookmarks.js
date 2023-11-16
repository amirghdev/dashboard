const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");
const BookmarksCategory = require("./BookmarksCategory");

const Bookmarks = sequelize.define(
  "bookmarks",
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
        model: BookmarksCategory,
        key: "id",
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.TEXT,
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

module.exports = Bookmarks;
