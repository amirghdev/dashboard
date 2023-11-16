// const Sessions = require("../model/Sessions");
// const Users = require("../model/Users");

// async function auth(req, res, next) {
//   try {
//     // 1: find token
//     let session = await Sessions.findOne({ where: { token: req.body.token } });
//     if (session != null) {
//       // 2: find user
//       let user = await Users.findByPk(session.userId);
//       if (user != null) {
//         req.user = user;
//         next();
//       } else {
//         return res.json({ status: 0, message: "کاربری وجود ندارد" });
//       }
//     } else {
//       return res.json({ status: 0, message: "مشکلی در توکن وارد شده وجود دارد" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ status: 0, message: "مشکلی در سمت سرور بوجود آمده است" });
//   }
// }

// module.exports = {
//   auth,
// };

const Users = require("../model/Users");
const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/jwt");
const Sessions = require("../model/Sessions");

module.exports.auth = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (!decodedToken) {
      const error = new Error("شما مجوز دسترسی ندارید");
      error.statusCode = 401;
      throw error;
    }

    const session = await Sessions.findOne({ where: { token: req.body.token } });

    if (session == null) {
      const error = new Error("توکن شما در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    const user = await Users.findByPk(decodedToken.user.id);

    if (!user || user == null) {
      const error = new Error("این کاربر در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    req.user = user;

    next();
  } catch (error) {
    handleError(error);
    next(error);
  }
};
