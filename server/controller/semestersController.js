//- models
const Semesters = require("../model/Semesters");
const Courses = require("../model/Courses");
const Users = require("../model/Users");
const SemesterTexts = require("../model/SemesterTexts");
const Exams = require("../model/Exams");
//-schemas
const semesterSchema = require("../schemas/semesters");

async function findAll(req, res, next) {
  // find all semesters with order
  try {
    let semesters = await Semesters.findAll({ where: { userId: req.user.id }, order: [["unit", "ASC"]] });
    res.status(200).json({ semesters });
  } catch (error) {
    next(error);
  }
}

async function findSingle(req, res, next) {
  try {
    // 1: find semester
    const { unit } = req.body;
    let semester = await Semesters.findOne({ where: { unit, userId: req.user.id } });
    // 2: check if semester is valid
    if (semester == null) {
      const error = new Error(`ترم ${unit} وجود ندارد`);
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ semester });
  } catch (error) {
    next(error);
  }
}

async function createSemester(req, res, next) {
  try {
    // 1: data validation
    await semesterSchema.validate(req.body, { abortEarly: false });
    try {
      const { year, unit } = req.body;
      // 2: check if there is a semester with the same year and unit
      let semester = await Semesters.findOne({ where: { unit, userId: req.user.id } });
      if (semester != null) {
        // 3: create new semester
        const error = new Error(`ترمی از قبل با شماره ${unit} وجود دارد`);
        error.statusCode = 422;
        throw error;
      }
      await Semesters.create({
        userId: req.user.id,
        year,
        unit,
      });
      res.status(201).json({ message: `ترم ${unit} با موفقیت ساخته شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    // validation catch
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

//* not nececery function
function setUserSemester(req, res) {
  const { unit, userId } = req.body;
  Semesters.findOne({ where: { userId, unit } })
    .then((semester) => {
      if (semester != null) {
        Users.findByPk(userId)
          .then((user) => {
            user.semesterId = semester.id;
            user
              .save()
              .then(() => {
                res.json({ status: 1 });
              })
              .catch((err) => {
                console.log(err);
                res.json({
                  status: 0,
                  message: "مشکلی در بروزرسانی وجود دارد",
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 0,
              message: "مشکلی در پیدا کردن کاربر وجود دارد",
            });
          });
      } else {
        res.json({ status: 0, message: "این ترم در پایگاه داده پیدا نشد" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 0, message: "مشکلی در پیدا کردن ترم وجود دارد" });
    });
}

async function deleteSemester(req, res, next) {
  //* semester courses || semester texts
  try {
    //:1 find semester
    const semester = await Semesters.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (semester == null) {
      const error = new Error("ترم در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    //:3 check for text or course or exam
    const semesterCourses = await Courses.findAll({
      where: { semesterId: semester.id },
    });
    const semesterTexts = await SemesterTexts.findAll({
      where: { semesterId: semester.id },
    });
    const semesterExams = await Exams.findAll({
      where: { semester_unit: semester.unit, userId: req.user.id },
    });
    //:4 check if there is a text or course or exam
    if (semesterExams.length > 0) {
      semesterExams.forEach(async (exam) => {
        await Exams.destroy({ where: { id: exam.id } });
      });
    }
    if (semesterCourses.length > 0) {
      semesterCourses.forEach(async (course) => {
        await Courses.destroy({ where: { id: course.id } });
      });
    }
    if (semesterTexts.length > 0) {
      semesterTexts.forEach(async (text) => {
        await SemesterTexts.destroy({ where: { id: text.id } });
      });
    }
    await Semesters.destroy({ where: { id: semester.id } });

    //:5 check for updating user university and user unit
    if (semester.unit == req.user.unit) {
      let userSemesters = await Semesters.findAll({ where: { userId: req.user.id } });
      if (userSemesters.length == 0) {
        req.user.unit = 0;
        req.user.university = false;
        req.user.updatedAt = Math.floor(Date.now() / 1000);
        await req.user.save();
        return res.status(200).json({
          unit: semester.unit,
          message: `ترم ${semester.unit} با موفقیت حذف شد و بخش دانشگاه غیر فعال شد`,
          reset: true,
          change: false,
        });
      } else {
        req.user.unit = userSemesters[0].dataValues.unit;
        req.user.updatedAt = Math.floor(Date.now() / 1000);
        await req.user.save();
        return res.status(200).json({
          unit: userSemesters[0].dataValues.unit,
          semesterId: userSemesters[0].dataValues.id,
          message: `ترم ${semester.unit} با موفقیت حذف شد`,
          reset: false,
          change: true,
        });
      }
    }
    res.status(200).json({ unit: semester.unit, message: `ترم ${semester.unit} با موفقیت حذف شد`, reset: false, change: false });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getSemesterData(req, res, next) {
  // 1: find semester
  try {
    let semester = await Semesters.findOne({ where: { id: req.body.id, userId: req.user.id } });
    if (semester == null) {
      const error = new Error("این ترم در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ semester });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findSingle,
  findAll,
  createSemester,
  deleteSemester,
  getSemesterData,
  setUserSemester,
};
