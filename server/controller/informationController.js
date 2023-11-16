const Information = require("../model/Information");

function findAll(req, res) {
  Information.findOne({ where: { id: 1 } })
    .then((info) => {
      res.status(200).json({ status: 1, info : info.text });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ status: 0, message: "مشکلی در پیدا کردن اعلان ها وجود دارد" });
    });
}

function update(req, res) {
  const { text } = req.body;
  Information.findOne({ where: { id: 1 } })
    .then((info) => {
      info.text = text;
      info
        .save()
        .then(() => {
          res.status(200).json({ status: 1 });
        })
        .catch((err) => {
          console.log(err);
          res.status(200).json({ status: 0, message: "مشکلی در سرور بوجود آمده است" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ status: 0, message: "مشکلی در سرور بوجود آمده است" });
    });
}

module.exports = {
  findAll,
};
