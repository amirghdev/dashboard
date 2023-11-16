const { DataTypes, Op } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");
const Semesters = require("./Semesters");

const Courses = sequelize.define(
  "courses",
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
    semesterId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Semesters,
        key: "id",
      },
      onDelete: "cascade",
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    teacher: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    place: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    absence: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    midterm: {
      type: DataTypes.ENUM("0", "1", "2"),
      defaultValue: "0",
      comment: "0 => not know 1=> yes 2=> no",
    },
    midterm_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    project: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    project_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    presentation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    presentation_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("0", "1", "2"),
      defaultValue: "0",
      comment: "0=> not know 1=> pass 2=> failed",
    },
    grade: {
      type: DataTypes.TINYINT,
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

module.exports = Courses;
