const fs = require("fs");
//-
const bcryptjs = require("bcryptjs");
const uuid = require("uuid").v4;
const appRoot = require("app-root-path");
const sharp = require("sharp");
//-models
const Users = require("../model/Users");
const Semesters = require("../model/Semesters");
//-schemas
const { passwordSchema, universitySchema, imageSchema } = require("../schemas/setting");
const schema = require("../schemas/semesters");

module.exports.changePassword = async (req, res, next) => {
  try {
    await passwordSchema.validate(req.body, { abortEarly: false });
    try {
      const isMatch = await bcryptjs.compare(req.body.password, req.user.password);

      if (isMatch) {
        const error = new Error("رمز عبور جدید نمیتواند با رمز عبور فعلی برابر باشد");
        error.statusCode = 422;
        throw error;
      }

      const hash = await bcryptjs.hash(req.body.password, 10);

      req.user.password = hash;
      req.user.updatedAt = Math.floor(Date.now() / 1000);
      await req.user.save();

      res.status(200).json({ message: "رمز عبور شما با موفقیت بروزرسانی شد" });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

module.exports.activeUniversity = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    try {
      const { unit, year } = req.body;

      //: create semester for user and check for extra validation

      // validation
      const semester = await Semesters.findOne({ where: { userId: req.user.id, unit } });

      if (semester != null) {
        const error = new Error("شماره ای با این ترم از قبل ساخته شده است");
        error.statusCode = 422;
        throw error;
      }

      // create semester
      let item = await Semesters.create({
        unit,
        year,
        userId: req.user.id,
      });

      req.user.unit = unit;
      req.user.university = true;
      req.user.updatedAt = Math.floor(Date.now / 1000);
      await req.user.save();
      res.status(200).json({ message: "بخش دانشگاه برای شما بروزرسانی شد", id: item.id });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

module.exports.updateUniversity = async (req, res, next) => {
  try {
    await universitySchema.validate(req.body, { abortEarly: false });
    try {
      const { unit } = req.body;

      let semester = await Semesters.findOne({ where: { userId: req.user.id, unit } });

      if (req.user.unit == unit) {
        const error = new Error("شماره ترم جدید نمیتواند با شماره ترم قبلی برابر باشد");
        error.statusCode = 422;
        throw error;
      }

      if (semester == null) {
        const error = new Error(`ترم ${unit} در پایگاه داده پیدا نشد`);
        error.statusCode = 404;
        throw error;
      }

      req.user.unit = unit;
      req.user.updatedAt = Math.floor(Date.now() / 1000);
      await req.user.save();

      res.status(200).json({ message: "ترم دانشگاه شما با موفقیت بروزرسانی شد", id: semester.id });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

module.exports.findSemester = async (req, res, next) => {
  try {
    const semester = await Semesters.findOne({ where: { unit: req.body.unit } });

    if (semester == null) {
      const error = new Error("ترم در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ semester, message: "اکانت شما با موفقیت بروزرسانی شد" });
  } catch (error) {
    next(error);
  }
};

module.exports.uploadImage = async (req, res, next) => {
  try {
    const image = req.files ? req.files.image : {};
    const imageName = `${uuid()}_${image.name}`;
    const uploadPath = `${appRoot}/public/images/uploads/avatars/${imageName}`;
    req.body = { ...req.body, image };
    await imageSchema.validate(req.body, { abortEarly: false });
    try {
      if (req.user.avatar != "avatar.png") {
        fs.unlink(`${appRoot}/public/images/uploads/avatars/${req.user.avatar}`, (err) => {
          if (err) {
            console.log(err);
            throw err;
          }
        });
      }

      await sharp(image.data)
        .jpeg({ quality: 60 })
        .toFile(uploadPath)
        .catch((err) => {
          if (err) {
            console.log(err);
            throw err;
          }
        });

      req.user.avatar = imageName;
      await req.user.save();

      res.status(200).json({ message: "عکس شما با موفقیت بروزرسانی شد", imageName });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};
