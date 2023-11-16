//- my creation
const Courses = require("../model/Courses");
const Semesters = require("../model/Semesters");
const Exams = require("../model/Exams");
//- schemas
const { courseUpdateSchema, coursesSchema } = require("../schemas/courses");

async function findAll(req, res, next) {
  try {
    if (!req.body.semesterId || req.body.semesterId == "") {
      const error = new Error("لطفا آیدی ترم را وارد کنید");
      error.statusCode = 422;
      throw error;
    }
    // 1: find semester
    const { semesterId } = req.body;
    const semester = await Semesters.findByPk(semesterId);
    if (semester == null) {
      const error = new Error("ترم داده شده در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }
    let courses = await Courses.findAll({ where: { semesterId, userId: req.user.id } });
    res.status(200).json({ courses });
  } catch (error) {
    next(error);
  }
}

async function findSingle(req, res, next) {
  try {
    let semester = await Semesters.findOne({ where: { id: req.body.semesterId, userId: req.user.id } });

    if (semester == null) {
      const error = new Error("این ترم در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    let course = await Courses.findByPk(req.body.id);
    if (course == null) {
      const error = new Error("این واحد در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ course });
  } catch (error) {
    next(error);
  }
}

async function createCourse(req, res, next) {
  try {
    // 1: validation
    await coursesSchema.validate(req.body, { abortEarly: false });
    try {
      if (!req.body.semesterId || req.body.semesterId == "") {
        const error = new Error("لطفا شماره ترم را وارد کنید");
        error.statusCode = 422;
        throw error;
      }
      const { semesterId, unit, name } = req.body;
      // 2: check if semester exists
      let semester = await Semesters.findByPk(semesterId);
      // 3: check if there is a course with this name
      let course = await Courses.findOne({ where: { name, semesterId: semester.id, userId: req.user.id } });
      if (course != null) {
        const error = new Error(`واحد ${name} از قبل برای ترم ${semester.unit} وجود دارد`);
        error.statusCode = 422;
        throw error;
      }

      // check the semester total
      if (semester.total + Number(unit) > 24) {
        const error = new Error("تعداد واحد هر ترم نمیتواند بیشتر از 24 واحد باشد");
        error.statusCode = 422;
        throw error;
      }
      // 4: create course
      await Courses.create({
        userId: req.user.id,
        semesterId: semester.id,
        unit,
        name,
      });
      // 5: update semester total
      semester.total += Number(unit);
      await semester.save();
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

async function deleteCourse(req, res, next) {
  try {
    // 1: find course
    let course = await Courses.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (course == null) {
      const error = new Error("واحد در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 2: find semester
    let semester = await Semesters.findByPk(req.body.semesterId);

    console.log(semester);

    if (semester == null) {
      const error = new Error("ترم در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 3: find course exams
    let exams = await Exams.findAll({ where: { semester_unit: semester.unit, userId: req.user.id } });
    // 4: delete course exams
    if (exams.length > 0) {
      exams.forEach(async (exam) => {
        await Exams.destroy({ where: { id: exam.id } });
      });
    }
    // 5: delete course
    await Courses.destroy({ where: { id: course.id } });
    // 6: update semester total
    semester.total -= Number(course.unit);
    await semester.save();
    res.status(200).json({ message: `${course.name} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
}

async function updateCourse(req, res, next) {
  // 1: validation
  try {
    await courseUpdateSchema.validate(req.body, { abortEarly: false });
    // 2: find course
    try {
      let course = await Courses.findOne({ where: { id: req.body.id, userId: req.user.id } });

      if (course == null) {
        const error = new Error("واحد در پایگاه داده پیدا نشد");
        error.statusCode = 404;
        throw error;
      }

      // 3: update course
      if (!req.body.data || Object.keys(req.body.data).length == 0) {
        const error = new Error("لطفا مقادیری را بروزرسانی کنید");
        error.statusCode = 422;
        throw error;
      }

      Object.keys(req.body.data).forEach((key) => {
        course[key] = req.body.data[key];
      });

      course.updatedAt = Math.floor(Date.now() / 1000);
      await course.save();

      //: checkout
      if (req.body.data.status && req.body.data.status == 1) {
        let semester = await Semesters.findOne({ where: { id: course.semesterId, userId: req.user.id } });
        semester.total_pass += course.unit;
        await semester.save();
      }

      res.status(200).json({ message: `${course.name} با موفقیت بروزرسانی شد` });
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

module.exports = {
  findAll,
  createCourse,
  deleteCourse,
  findSingle,
  updateCourse,
};
