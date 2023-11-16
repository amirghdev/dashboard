//- schemas
const { schema, updateSchema } = require("../schemas/texts");
//- models
const Texts = require("../model/Texts");
//- utils
const { date2 } = require("../utils/dateValidation");

async function findAll(req, res, next) {
  // 1: find all texts
  try {
    date2(req, res);
    const { month, year } = req.body;
    let texts = await Texts.findAll({
      where: { userId: req.user.id, month, year },
    });
    res.status(200).json({ texts });
  } catch (error) {
    next(error);
  }
}

async function count(req, res, next) {
  // 1: count all texts
  try {
    date2(req, res);
    const { month, year } = req.body;
    let textsCount = await Texts.count({
      where: { userId: req.user.id, month, year },
    });
    res.status(200).json({ textsCount });
  } catch (error) {
    next(error);
  }
}

async function findSingle(req, res, next) {
  // 1: find one text
  try {
    let text = await Texts.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (text == null) {
      const error = new Error("نوشته در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ text });
  } catch (error) {
    next(error);
  }
}

async function createText(req, res, next) {
  // 1: validate data with YUP
  try {
    await schema.validate(req.body, { abortEarly: false });
    try {
      date2(req, res);
      const { subject, month, year, text } = req.body;
      // 2: find if there is text in the database with similar subject
      let item = await Texts.findOne({ where: { subject, month, year, userId: req.user.id } });
      if (item != null) {
        // 3: create a new text
        const error = new Error(`نوشته ای با موضوع ${subject} برای این تاریخ وجود دارد`);
        error.statusCode = 422;
        throw error;
      }
      await Texts.create({ subject, month, year, text, userId: req.user.id });
      res.status(201).json({ message: `${subject} با موفقیت ساخته شد` });
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

async function deleteText(req, res, next) {
  try {
    // 1: find text
    let text = await Texts.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (text == null) {
      const error = new Error("نوشته در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    // 2: delete text
    await Texts.destroy({ where: { id: text.id } });
    res.status(200).json({ message: `${text.subject} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
}

async function updateText(req, res, next) {
  try {
    // 1: validate text data with YUP
    await updateSchema.validate(req.body, { abortEarly: false });
    try {
      // 2: find text
      let item = await Texts.findOne({ where: { id: req.body.id, userId: req.user.id } });

      if (item == null) {
        const error = new Error("نوشته در پایگاه داده پیدا نشد");
        error.statusCode = 404;
        throw error;
      }
      // 3: update text
      item.text = req.body.text;
      item.updatedAt = Date.now() / 1000;
      item.save();
      res.status(200).json({ message: `${item.subject} با موفقیت بروزرسانی شد` });
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
  createText,
  deleteText,
  updateText,
  findSingle,
  count,
};
