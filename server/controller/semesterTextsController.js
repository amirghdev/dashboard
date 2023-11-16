//- models
const SemesterTexts = require("../model/SemesterTexts");
const Semesters = require("../model/Semesters");
//- schemas
const { schema, updateSchema } = require("../schemas/semesterTexts");

module.exports.findAll = async (req, res, next) => {
  try {
    const semester = await Semesters.findOne({ where: { id: req.body.semesterId, userId: req.user.id } });

    if (semester == null) {
      const error = new Error("ترم در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    let texts = await SemesterTexts.findAll({ where: { semesterId: semester.id, userId: req.user.id } });

    res.status(200).json({ texts });
  } catch (error) {
    next(error);
  }
};

module.exports.findSingle = async (req, res, next) => {
  try {
    let text = await SemesterTexts.findOne({ where: { id: req.body.id, userId: req.user.id } });
    if (text == null) {
      const error = new Error("نوشته در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ text });
  } catch (error) {
    next(error);
  }
};

module.exports.createText = async (req, res, next) => {
  try {
    const { subject, semesterId, text, day, month, year } = req.body;
    // 1: validate
    await schema.validate(req.body, { abortEarly: false });
    // 2: find if semester texts exists
    try {
      let semester = await Semesters.findOne({ where: { id: semesterId, userId: req.user.id } });

      if (semester == null) {
        const error = new Error("ترم در پایگاه داده پیدا نشد");
        error.statusCode = 404;
        throw error;
      }

      let item = await SemesterTexts.findOne({ where: { subject, semesterId, userId: req.user.id } });

      if (item != null) {
        // 3: create a new semester text
        const error = new Error("نوشته ای با این موضوع برای این ترم از قبل وجود دارد");
        error.statusCode = 422;
        throw error;
      }

      await SemesterTexts.create({ subject, semesterId, text, userId: req.user.id, day, month, year });

      res.status(201).json({ message: `${subject} با موفقیت ساخته شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

module.exports.deleteText = async (req, res, next) => {
  try {
    const text = await SemesterTexts.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (text == null) {
      const error = new Error("نوشته در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    await SemesterTexts.destroy({ where: { id: text.id } });

    res.status(200).json({ message: `${text.subject} با موفقیت  حذف شد` });
  } catch (error) {
    next(error);
  }
};

module.exports.updateText = async (req, res, next) => {
  try {
    await updateSchema.validate(req.body, { abortEarly: false });
    try {
      const item = await SemesterTexts.findOne({ where: { id: req.body.id, userId: req.user.id } });

      if (item == null) {
        const error = new Error("نوشته در پایگاه داده پیدا نشد");
        error.statusCode = 404;
        throw error;
      }

      item.text = req.body.text;
      await item.save();

      res.status(200).json({ message: `${item.subject} با موفقیت بروزرسانی شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};
