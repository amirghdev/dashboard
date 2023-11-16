const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Users = require("./Users");
const Semesters = require("./Semesters");
const Courses = require("./Courses");

const Exams = sequelize.define(
  "exams",
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
    courseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Courses,
        key: "id",
      },
    },
    semester_unit: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      // references: {
      //   model: Semesters,
      //   key: "unit",
      // },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    grade: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM("quiz", "midterm", "final"),
      allowNull: true,
    },
    // date: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    // },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

module.exports = Exams;
