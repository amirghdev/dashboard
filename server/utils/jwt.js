// module.exports.handleError = (res, msg) => {
//   let statusCode;
//   let message;
//   if (msg == "jwt must be provided") {
//     message = "لطفا توکن را وارد کنید";
//     statusCode = 422;
//   }
//   if (msg == "invalid signature") {
//     message = "شما اجازه دسترسی ندارید";
//     statusCode = 401;
//   }
//   if (msg == "invalid token") {
//     message = "توکن شما اشتباه است";
//     statusCode = 401;
//   }
//   if (msg == "jwt expired") {
//     message = "تاریخ توکن شما تمام شده است";
//     statusCode = 422;
//   }
//   return res.status(statusCode).json({ message });
// };

module.exports.handleError = (error) => {
  if (error.message == "jwt must be provided") {
    error.message = "لطفا توکن را وارد کنید";
    error.statusCode = 401;
  } else if (error.message == "invalid signature") {
    error.message = "شما اجازه دسترسی ندارید";
    error.statusCode = 401;
  } else if (error.message == "invalid token") {
    error.message = "توکن شما اشتباه است";
    error.statusCode = 401;
  } else if (error.message == "jwt expired") {
    error.message = "تاریخ توکن شما تمام شده است";
    error.statusCode = 401;
  }
  return error;
};
