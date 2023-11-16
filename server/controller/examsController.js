//- models
const Exams = require("../model/Exams");
const Courses = require("../model/Courses");
const Semesters = require("../model/Semesters");
//- my creation
const { date3 } = require("../utils/dateValidation");

//- schemas
const { examSchema, updateExamSchema } = require("../schemas/exams");

async function findAll(req, res, next) {
  // 1: find all exams for this month
  try {
    const { semester_unit } = req.body;
    let semester = await Semesters.findOne({ where: { unit: semester_unit, userId: req.user.id } });
    if (semester == null) {
      const error = new Error(`ترم ${semester_unit} در پایگاه داده وجود ندارد`);
      error.statusCode = 404;
      throw error;
    }
    let exams = await Exams.findAll({ where: { semester_unit, userId: req.user.id } });
    res.status(200).json({ exams });
  } catch (error) {
    next(error);
  }
}

//* not nececery function
async function findCourses(req, res, next) {
  // 1: find semester
  try {
    if (!req.body.semesterId || req.body.semesterId == "") {
      const error = new Error("لطفا شماره ترم را وارد کنید");
      error.statusCode = 422;
      throw error;
    }

    if (!req.body.unit || req.body.unit == "") {
      const error = new Error("لطفا شماره ترم را وارد کنید");
      error.statusCode = 422;
      throw error;
    }
    const { semesterId, unit } = req.body;
    let semester = await Semesters.findByPk(semesterId);
    if (semester != null) {
      // 2: find courses
      let courses = await Courses.findAll({ where: { userId: req.user.id, semesterId } });
      if (courses != null) {
        res.status(200).json({ courses });
      } else {
        const error = new Error(`ترم ${semester.unit} واحدی ندارد لطفا ابتدا واحدی برای این ترم بسازید`);
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error = new Error(`ترم ${unit} وجود ندارد`);
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function createExams(req, res, next) {
  try {
    // 1: validate exam
    await examSchema.validate(req.body, { abortEarly: false });
    // 2: find course with exam name
    try {
      let semester = await Semesters.findOne({ where: { id: req.body.semesterId, userId: req.user.id } });

      if (semester == null) {
        const error = new Error(`ترمی با آیدی ${req.body.semesterId} در پایگاه داده پیدا نشد`);
        error.statusCode = 404;
        throw error;
      }

      date3(req, res);
      const { name, semesterId, day, month, year, subject } = req.body;
      let course = await Courses.findOne({ where: { name, semesterId, userId: req.user.id } });

      if (course == null) {
        const error = new Error("درس انتخاب شده در پایگاه داده وجود ندارد");
        error.statusCode = 404;
        throw error;
      }

      let exam = await Exams.findOne({ where: { name, semester_unit: semester.unit, userId: req.user.id, completed: false } });

      if (exam != null) {
        const error = new Error(`امتحان انجام نشده ای برای این ترم با این نام وجود دارد`);
        error.statusCode = 422;
        throw error;
      }

      await Exams.create({
        name,
        subject,
        day,
        month,
        year,
        courseId: course.id,
        semester_unit: semester.unit,
        userId: req.user.id,
      });
      res.status(201).json({ message: `${name} با موفقیت ساخته شد` });
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

async function deleteExam(req, res, next) {
  try {
    let exam = await Exams.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (exam == null) {
      const error = new Error("امتحان در پایگاه داده وجود ندارد");
      exam.statusCode = 404;
      throw error;
    }

    await Exams.destroy({ where: { id: exam.id } });
    res.json({ message: `${exam.name} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
}

async function findSingle(req, res, next) {
  try {
    let exam = await Exams.findOne({ where: { id: req.body.id, userId: req.user.id } });
    if (exam == null) {
      const error = new Error("این امتحان در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ exam });
  } catch (error) {
    next(error);
  }
}

async function updateExam(req, res, next) {
  // 1: validate exam
  try {
    await updateExamSchema.validate(req.body, { abortEarly: false });
    try {
      // 2: find exam
      let exam = await Exams.findOne({ where: { id: req.body.id, userId: req.user.id } });

      if (exam == null) {
        const error = new Error("امتحان در پایگاه داده وجود ندارد");
        error.statusCode = 404;
        throw error;
      }

      // 3: dynamically update
      if (!req.body.data || Object.keys(req.body.data).length == 0) {
        const error = new Error("لطفا مقادیری را بروزرسانی کنید");
        error.statusCode = 422;
        throw error;
      }

      Object.keys(req.body.data).forEach((key) => {
        exam[key] = req.body.data[key];
      });
      if (req.body.data.grade) {
        exam.completed = true;
      }
      exam.updatedAt = Math.floor(Date.now() / 1000);
      await exam.save();
      res.json({ message: `${exam.name} بروزرسانی شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

module.exports = {
  findAll,
  findCourses,
  createExams,
  deleteExam,
  findSingle,
  updateExam,
};
