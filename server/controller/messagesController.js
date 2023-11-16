const Messages = require("../model/Messages");

module.exports.findAll = async (req, res, next) => {
  try {
    let count = await Messages.findAndCountAll({ where: { userId: req.user.id } });
    res.status(200).json({ messages: count.rows, total: count.count });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    let message = await Messages.findByPk(req.body.id);

    if (message == null) {
      const error = new Error("پیام شما در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    await Messages.destroy({ where: { id: message.id } });

    res.status(200).json({ message: "پیام از پایگاه داده حذف شد" });
  } catch (error) {
    next(error);
  }
};
