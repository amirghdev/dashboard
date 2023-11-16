const fs = require("fs");
//-
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const appRootPath = require("app-root-path");
const sharp = require("sharp");
const formidable = require("formidable");
// const { pipeline, MultipartParser, formidable } = require("formidable");
//- models -//
const Users = require("../model/Users");
const Sessions = require("../model/Sessions");
//- utils -//
const { sendMail, sendRegister, sendHtml } = require("../utils/mailer");
const { handleError } = require("../utils/jwt");
//- schemas -//
const registerSchema = require("../schemas/register");
const loginSchema = require("../schemas/login");
const { imageSchema } = require("../schemas/avatar");
const passwordSchema = require("../schemas/password");

// register section
async function register(req, res, next) {
  try {
    const { firstName, lastName, username, password, email } = req.body;
    // 1: validation data
    await registerSchema.validate(req.body, { abortEarly: false });

    try {
      // 2: check for email
      const searchEmail = await Users.findOne({ where: { email } });

      if (searchEmail) {
        const error = new Error(`ایمیل ${email} از قبل وجود دارد`);
        error.statusCode = 422;
        throw error;
      }
      // 3: check for username
      const searchUsername = await Users.findOne({ where: { username } });

      if (searchUsername) {
        const error = new Error(`نام کاربری${username} از قبل وجود دارد`);
        error.statusCode = 422;
        throw error;
      }

      // 4: hash user password
      const hash = await bcrypt.hash(password, 10);

      // 5: create a token for activation with jwt
      const activeToken = jwt.sign({ username, email }, process.env.JWT_SECRET);

      // 6: create user

      let theme = req.body.theme;

      if (theme == null || theme == "") {
        theme = "dark";
      }

      await Users.create({
        username,
        email,
        password: hash,
        firstName,
        lastName,
        active_token: activeToken,
        theme,
      });

      // 7: send activation email
      // let link = `http://localhost:8080/active-user/${activeToken}`;
      let link = `https://dashboard.amirmohammadgharibi.ir/active-user/${activeToken}`;
      // sendMail(email, `${firstName} ${lastName}`, "تاییدیه ایمیل سامانه داشبورد", `لطفا ایمیل خود را تایید کنید ${link}`);
      sendRegister(email, `${firstName} ${lastName}`, link);

      res.status(201).json({ message: "اکانت شما با موفقیت ساخته شد" });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    // validation error
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

async function activeUser(req, res, next) {
  try {
    // 1: decode token and check if there is a valid sign
    const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error("شما مجوز دسترسی به این صحفه را ندارید");
      error.statusCode = 401;
      throw error;
    }

    // 2: find user with token payload
    const username = decodedToken.username;
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      const error = new Error("این کاربر در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 3: check if user is active before
    if (user.is_active == true) {
      const error = new Error("اکانت شما از قبل تایید شده است");
      error.statusCode = 422;
      throw error;
    }

    // 4: active user
    user.is_active = true;
    await user.save();

    // 5: create a token for easy login (one time only)
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "30day" });

    // 6: save jwt token in database
    await Sessions.create({
      token,
      userId: user.id,
    });

    res.status(200).json({ message: "اکانت شما با موفقیت تایید شد به داشبورد خوش آمدید", token });
  } catch (error) {
    handleError(error);
    next(error);
  }
}

// login section
async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    // 1: validation
    await loginSchema.validate(req.body, { abortEarly: false });
    try {
      // 2: check if username exist in database
      const user = await Users.findOne({ where: { username } });
      if (!user) {
        const error = new Error("نام کاربری یا رمز عبور اشتباه است");
        error.statusCode = 401;
        throw error;
      }

      // 3: check user hash password with input password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        const error = new Error("نام کاربری یا رمز عبور اشتباه است");
        error.statusCode = 401;
        throw error;
      }

      if (user.is_active == false || user.is_active == 0) {
        const error = new Error("لطفا اکانت خود را توسط ایمیل ارسال شده تایید کنید");
        error.statusCode = 401;
        throw error;
      }

      // 4: create a 30 day jwt token for user
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "30day" });

      // 5: save jwt token in database
      await Sessions.create({
        token,
        userId: user.id,
      });

      // 6: find all other tokens and delete them
      const sessions = await Sessions.findAll({
        where: { userId: user.id, [Op.not]: { token } },
      });

      sessions.forEach(async (session) => {
        await Sessions.destroy({ where: { id: session.id } });
      });

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  } catch (error) {
    // validation error
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

async function auth(req, res, next) {
  try {
    const { token } = req.body;
    // 1: decode token and ckeck it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error("شما اجازه دسترسی ندارید");
      error.statusCode = 401;
      throw error;
    }

    // 2: find token in database : not nececery
    const session = await Sessions.findOne({ where: { token } });

    if (session == null) {
      const error = new Error("توکن شما در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 3: check token expire with current date / 1000
    if (session.expires < Date.now() / 1000) {
      await Sessions.destroy({ where: { id: session.id } });
      const error = new Error("زمان سشن شما تموم شده است لطفا دوباره وارد شوید");
      error.statusCode = 401;
      throw error;
    }

    // // 4: find all other tokens and delete them
    // const sessions = await Sessions.findAll({
    //   where: { userId: session.userId, [Op.not]: { token } },
    // });

    // sessions.forEach(async (session) => {
    //   await Sessions.destroy({ where: { id: session.id } });
    // });

    // 6: check the user
    const user = await Users.findByPk(session.userId);

    if (user == null) {
      const error = new Error("مشخصات شما در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 7: send some user usefull data for front
    const { id, financial, firstName, lastName, programming, university, is_admin, is_active, unit, semesterId, theme, avatar, avatar_confirmation } =
      user;

    res.status(200).json({
      user: {
        id,
        financial,
        firstName,
        lastName,
        programming,
        university,
        is_active,
        is_admin,
        unit,
        semesterId,
        theme,
        avatar,
        avatar_confirmation,
      },
    });
  } catch (error) {
    handleError(error);
    next(error);
  }
}

//* not nececery function
// clear this users session execpt current one in database
async function clearSessions(req, res) {
  const { id, token } = req.body;
  // find all user sessions
  const sessions = await Sessions.findAll({
    where: { userId: id, [Op.not]: { token } },
  });
  if (sessions) {
    // remove all others session for user
    sessions.forEach((session) => {
      Sessions.destroy({ where: { id: session.id } });
    });
    res.status(200).json({ status: 1 });
  } else {
    res.status(200).json({ status: 0, response: "این کاربر سشن اضافه ای ندارد" });
  }
}

// clear user current session in database
async function logout(req, res, next) {
  try {
    const { token } = req.body;
    // 1: decode token and check it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error("شما اجازه دسترسی ندارید");
      error.statusCode = 401;
      throw error;
    }

    // 2: find session in database
    const session = await Sessions.findOne({ where: { token } });

    if (session == null) {
      const error = new Error("توکن شما در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 3: delete session in database
    await Sessions.destroy({ where: { token } });

    res.status(200).json({ message: "شما با موفقیت از سامانه خارج شدید" });
  } catch (error) {
    handleError(error);
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
    // 1: check for email in database
    const user = await Users.findOne({ where: { email: req.body.email } });

    if (user == null) {
      const error = new Error("کاربری با این مشخصات در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 2: create a new token
    const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    let link = `http://localhost:8080/reset-password/${token}`;

    // 3: update user token
    user.forgot_token = token;
    await user.save();

    // 4: send mail
    sendMail(user.email, `${user.firstName} ${user.lastName}`, "فراموشی رمز عبور", `برای ساخت رمز عبور جدید روی لینک کلیک کنید ${link}`);

    res.status(200).json({ message: "ایمیل برای شما ارسال شد" });
  } catch (error) {
    next(error);
  }
}

// @desc : get user id with forgot token for reset password
async function getUserData(req, res, next) {
  try {
    const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error("شما اجازه دسترسی ندارید");
      error.statusCode = 401;
      throw error;
    }

    const user = await Users.findOne({ where: { forgot_token: req.body.token } });

    if (user == null) {
      const error = new Error("کاربری با این مشخصات در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ id: user.id });
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { id, password } = req.body;
    await passwordSchema.validate(req.body, { abortEarly: false });
    try {
      // // 1: decode token
      // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // if (!decodedToken) {
      //   const error = new Error("شما اجازه دسترسی ندارید");
      //   error.statusCode = 401;
      //   throw error;
      // }

      // // 2: find user with payload
      // const user = await Users.findOne({ where: { email: decodedToken.email } });

      const user = await Users.findByPk(id);

      if (user == null) {
        const error = new Error("کاربری با این مشخصات در پایگاه داده وجود ندارد");
        error.statusCode = 404;
        throw error;
      }

      // 3: check if the password is the same
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const error = new Error("رمز عبور جدید نباید با رمز عبور قبلی برابر باشد");
        error.statusCode = 422;
        throw error;
      }

      // 4: hash the new password
      const hash = await bcrypt.hash(password, 10);

      // 5: change user password
      user.password = hash;
      user.forgot_token = "";
      await user.save();

      res.status(200).json({ message: "رمز عبور شما با موفقیت بروز شد" });
    } catch (error) {
      // if (
      //   error.message == "jwt must be provided" ||
      //   error.message == "invalid signature" ||
      //   error.message == "invalid token" ||
      //   error.message == "jwt expired"
      // ) {
      //   handleError(res, error.message);
      // } else {
      //   next(error);
      // }
      handleError(error);
      next(error);
    }
  } catch (error) {
    // validation error
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

async function uploadImage(req, res, next) {
  try {
    // const form = formidable({ multiples: true });
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log("---------------------");
      if (err) {
        next(err);
      }
      console.log(fields);
      console.log(files);
    });
  } catch (error) {
    next(error);
  }
  // try {
  //   let image = req.files ? req.files.image : {};
  //   let imageName = `${shortid.generate()}_${image.name}`;
  //   let uploadPath = `${appRootPath}/public/images/uploads/avatars/${imageName}`;
  //   req.body = { ...req.body, image };
  //   imageSchema.validate(req.body, { abortEarly: false });
  //   try {
  //     const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET);
  //     if (!decodedToken) {
  //       const error = new Error("شما اجازه دسترسی ندارید");
  //       error.statusCode = 401;
  //       throw error;
  //     }
  //     const user = await Users.findOne({ where: { email: decodedToken.email } });
  //     console.log(user);
  //     if (user == null) {
  //       const error = new Error("کاربری با این مشخصات در پایگاه داده وجود ندارد");
  //       error.statusCode = 404;
  //       throw error;
  //     }
  //     await sharp(image.data)
  //       .jpeg({ quality: 60 })
  //       .toFile(uploadPath)
  //       .catch((err) => {
  //         if (err) {
  //           const error = new Error("مشکلی در آپلود کردن عکس شما در سرور وجود دارد");
  //           throw error;
  //         }
  //       });
  //     user.avatar = imageName;
  //     await user.save();
  //     // create html page for email
  //     let html =
  //       /*html*/
  //       `
  //         <div>
  //         <center> سلام ادمین عزیز </center><br>
  //         <p>لطفا عکس زیر را برای پروفایل تایید کنید</p><br>
  //         <p>http://localhost:8080/profiles-confirmation</p>
  //           <img src="cid:image" style="width:100%">
  //         </div>
  //     `;
  //     // send confirmation email to owner
  //     sendHtml(process.env.MAIN_EMAIL, "تاییدیه عکسه پروفایل", html, imageName, uploadPath);
  //     res.status(200).json({ message: "عکس شما با موفقیت آپلود شد", imageName });
  //   } catch (error) {
  //     next(error);
  //   }
  // } catch (error) {
  //   error.message = error.errors.join(" , ");
  //   error.statusCode = 422;
  //   next(error);
  // }
}

async function confirmImage(req, res, next) {}

module.exports = {
  register,
  login,
  auth,
  clearSessions,
  logout,
  activeUser,
  forgotPassword,
  resetPassword,
  getUserData,
  uploadImage,
};
