//- internal
const fs = require("fs");
//- external
const sharp = require("sharp");
const appRoot = require("app-root-path");
const uuid = require("uuid").v4;
//-models
const Books = require("../model/Books");
const Messages = require("../model/Messages");
const Users = require("../model/Users");
//- utils
const { sendHtml } = require("../utils/mailer");
const { date3 } = require("../utils/dateValidation");
//- schemas
const { imageSchema, schema, updateSchema } = require("../schemas/books");

// @desc : find all books for user
module.exports.findAll = async (req, res, next) => {
  try {
    let books = await Books.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
};

// @desc : find single book
module.exports.findSingle = async (req, res, next) => {
  try {
    let book = await Books.findOne({ where: { id: req.body.id, userId: req.user.id } });
    if (book == null) {
      const error = new Error("کتاب در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

// @desc : create book (name , author , price)
// for image there is another controller
module.exports.createBook = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    try {
      const { name, author } = req.body;
      let book = await Books.findOne({ where: { name, userId: req.user.id } });

      if (book != null) {
        const error = new Error(`کتاب ${name} از قبل ساخته شده است`);
        error.statusCode = 422;
        throw error;
      }

      await Books.create({
        name,
        author,
        userId: req.user.id,
      });

      res.status(201).json({ message: `کتاب ${name} با موفقیت ساخته شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

// @desc : delete book : notice : if book has image delete the image as well
module.exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Books.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (book == null) {
      const error = new Error("کتاب در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // check for image
    if (book.image == null || book.image == "none" || book.image == "book.jpg") {
      await Books.destroy({ where: { id: book.id } });
    } else {
      // delete the image
      fs.unlink(`${appRoot}/public/images/uploads/books/${book.image}`, async (err) => {
        if (err) {
          console.log(err);
          const error = new Error(`مشکلی در حذف کردن عکس ${book.name} وجود دارد`);
          throw error;
        } else {
          await Books.destroy({ where: { id: book.id } });
        }
      });
    }
    res.status(200).json({ message: `کتاب ${book.name} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
};

// @desc : update book (update req.body with req.body.data array)
module.exports.updateBook = async (req, res, next) => {
  try {
    await updateSchema.validate(req.body, { abortEarly: false });
    try {
      const book = await Books.findOne({ where: { id: req.body.id, userId: req.user.id } });

      if (book == null) {
        const error = new Error("کتاب در پایگاه داده وجود ندارد");
        error.statusCode = 404;
        throw error;
      }

      book.summary = req.body.summary;

      book.updatedAt = Math.floor(Date.now() / 1000);
      await book.save();
      res.status(200).json({ message: `${book.name} با موفقیت بروزرسانی شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    // validation catch
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

// @desc : upload image and send a email for admin to accept that image or decline it
module.exports.uploadImage = async (req, res, next) => {
  try {
    // using express file-uploads
    let image = req.files ? req.files.image : {};
    let imageName = `${uuid()}_${image.name}`;
    let uploadPath = `${appRoot}/public/images/uploads/books/${imageName}`;
    req.body = { ...req.body, image };

    await imageSchema.validate(req.body, { abortEarly: false });
    try {
      const book = await Books.findOne({ where: { id: req.body.id, userId: req.user.id } });

      if (book == null) {
        const error = new Error("کتاب در پایگاه داده وجود ندارد");
        error.statusCode = 404;
        throw error;
      }

      if (book.image != null && book.image != "none" && book.image != "book.jpg") {
        fs.unlink(`${appRoot}/public/images/uploads/books/${book.image}`, (err) => {
          if (err) {
            console.log(err);
            const error = new Error("مشکلی در حذف کردن عکس قبلی کتاب وجود دارد");
            throw error;
          }
        });
      }

      // @desc : using sharp for decrease image size and upload it
      await sharp(image.data)
        .jpeg({ quality: 60 })
        .toFile(uploadPath)
        .catch((err) => {
          if (err) {
            console.log(err);
            const error = new Error("مشکلی در آپلود کردن عکس وجود دارد");
            throw error;
          }
        });

      book.image = imageName;
      await book.save();

      //     book.image_confirmation = false;

      //     // create html page for email
      //     let html =
      //       /*html*/
      //       `
      //     <div>
      //     <center> سلام ادمین عزیز </center><br>
      //     <p>لطفا عکس زیر را برای کتاب تایید کنید</p><br>
      //     <p>${process.env.LINK}Books/confirm/${book.id}</p>
      //       <img src="cid:image" style="width:100%">
      //     </div>
      // `;

      // send confirmation email to owner
      // sendHtml(process.env.MAIN_EMAIL, "تاییدیه عکسه کتاب", html, imageName, uploadPath);

      res.status(200).json({ message: "عکس شما با موفقیت آپلود شد" });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    // validation catch
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

// @desc : count user books for start page
module.exports.count = async (req, res, next) => {
  try {
    let booksCount = await Books.count({
      where: { userId: req.user.id },
    });
    res.status(200).json({ booksCount });
  } catch (error) {
    next(error);
  }
};

// @desc : confirm book (check admin and book)
module.exports.confirm = async (req, res, next) => {
  try {
    if (req.user.is_admin == false) {
      const error = new Error("شما اجازه دسترسی به این صحفه را ندارید");
      error.statusCode = 401;
      throw error;
    }

    const book = await Books.findByPk(req.body.id);

    if (book == null) {
      const error = new Error("کتاب در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

//TODO : manage who accepted message for admin log
//TODO : create admin log for larger projects

// @desc : handle book image (if response is true accept image if its false delete image and create a new message)
module.exports.handleConfirm = async (req, res, next) => {
  try {
    const admin = await Users.findByPk(req.user.id);

    if (admin.is_admin == false) {
      const error = new Error("شما اجازه دسترسی ندارید");
      error.statusCode = 401;
      throw error;
    }

    if (!req.body.response) {
      const error = new Error("لطفا عکس را مدیریت کنید");
      error.statusCode = 422;
      throw error;
    }

    const book = await Books.findByPk(req.body.id);

    if (book == null) {
      const error = new Error("کتاب در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    if (req.body.response == "true") {
      book.image_confirmation = true;
      book.update = Math.floor(Date.now() / 1000);
      await book.save();
      res.status(200).json({ message: `عکس کتاب ${book.name} توسط ادمین تایید شد` });
    }

    if (req.body.response == "false") {
      date3(req, res);
      const { year, month, day } = req.body;
      fs.unlink(`${appRoot}/public/images/uploads/books/${book.image}`, (err) => {
        if (err) {
          console.log(err);
          const error = new Error("مشکلی در حذف کردن عکس کتاب وجود دارد");
          throw error;
        }
      });
      await Messages.create({
        userId: book.userId,
        adminId: req.user.id,
        text: `عکس کتاب ${book.name} توسط ادمین تایید نشد لطفا عکس جدیدی آپلود کنید`,
        place: "books",
        year,
        month,
        day,
      });
      book.image = "none";
      book.update = Math.floor(Date.now() / 1000);
      await book.save();
      res.status(200).json({ message: "عکس مورد نظر از پایگاه داده حذف شد و پیام ارسال شد" });
    }
  } catch (error) {
    next(error);
  }
};
