const Users = require("../model/Users");

// function change(req, res) {
//   const { id, theme } = req.body;
//   Users.findByPk(id)
//     .then((user) => {
//       user.theme = theme;
//       user
//         .save()
//         .then((result) => {
//           res.status(200).json({ status: 1 });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(200).json({ status: 0 });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(200).json({ status: 0 });
//     });
// }

// module.exports = {
//   change,
// };

module.exports.change = async (req, res, next) => {
  try {
    const { id, theme } = req.body;
    const user = await Users.findByPk(id);

    if (user == null) {
      const error = new Error("کاربر در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    user.theme = theme;
    await user.save();
    res.status(200).json({ message: "تم شما با موفقیت عوض شد" });
  } catch (error) {
    next(error);
  }
};
