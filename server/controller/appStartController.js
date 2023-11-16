//- models
const Information = require("../model/Information");
const Todos = require("../model/Todos");
const Texts = require("../model/Texts");
const Semesters = require("../model/Semesters");
// const Courses = require("../model/Courses");
const Exams = require("../model/Exams");
const Financial = require("../model/Financial");
//- utils
// const { monthChanger } = require("../utils/monthChanger");
// const { month, year } = require("../utils/date");

async function sendData(req, res, next) {
  try {
    const { todoYear, todoMonth, textYear, textMonth, financialMonth, financialYear } = req.body.data;
    let userId = req.user.id;
    let result = {};
    let information = await Information.findOne({ id: 1 });
    let todos = await Todos.count({
      where: { userId, year: todoYear, month: todoMonth },
    });
    let texts = await Texts.count({
      where: { userId, year: textYear, month: textMonth },
    });

    if (req.body.data.semesterId) {
      let semester = await Semesters.findOne({ where: { id: req.body.data.semesterId, userId } });
      let lastExams = await Exams.findAll({
        where: { userId, completed: false, semester_unit: semester.unit },
        order: [["day", "ASC"]],
      });
      result.semester = semester;
      result.exams = lastExams;
    }

    let totalYear = await Financial.sum("price", { where: { year: financialYear, userId } });
    let totalMonth = await Financial.sum("price", { where: { year: financialYear, month: financialMonth, userId } });

    result.information = information.text;
    result.todosCount = todos;
    result.textsCount = texts;
    // result.totalMonth = `هزینه های ماه ${monthChanger(financialMonth)} : ${totalMonth}`;
    // result.totalYear = `هزینه های سال  ${financialYear} : ${totalYear}`;
    result.totalMonth = totalMonth;
    result.totalYear = totalYear;
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  sendData,
};
