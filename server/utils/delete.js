module.exports.deleteFunction = async (req, res, model) => {
  try {
    if (!req.body.id || req.body.id == "") {
      res.status(422).json({ message: "لطفا آیدی را وارد کنید" });
    }

    let item = await model.findByPk(req.body.id);

    if (item == null) {
      res.status(404).json({ message: "این آیتم در پایگاه داده وجود ندارد" });
    }

    await model.destroy({ where: { id: item.id } });

    return res.status(200).json({ message: "آیتم شما با موفقیت حذف شد" });
  } catch (error) {
    return res.status(500).json({ message: "مشکلی در سمت سرور وجود دارد" });
  }
};
