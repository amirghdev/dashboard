// async function findOne(id, res, model) {
//   try {
//     if (!id || id == "") {
//       res.status(422).json({ message: "لطفا آیدی را وارد کنید" });
//     }
//     let item = await model.findByPk(id);
//     if (item != null) {
//       return item;
//     } else {
//       return res.status(404).json({
//         message: "مشکلی در پیداکردن این آیتم وجود دارد",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "مشکلی در سمت سرور وجود دارد",
//     });
//   }
// }

// module.exports = {
//   findOne,
// };

module.exports.findOne = async (req, res, next) => {
  try {
    if (!req.body.id || req.body.id == "") {
      const error = new Error("لطفا آیدی را وارد کنید");
      error.statusCode = 422;
      throw error;
    }
    req.id = req.body.id;
    next();
  } catch (error) {
    next(error);
  }
};
