module.exports.date2 = (req, res) => {
  if (req.body.year == undefined || req.body.month == undefined || req.body.year == "" || req.body.month == "") {
    return res.status(422).json({ message: "لطفا تاریخ را وارد کنید" });
  }
};

module.exports.date3 = (req, res) => {
  if (req.body.year == undefined || req.body.month == undefined || req.body.day == undefined || req.body.year == "" || req.body.month == "") {
    return res.status(422).json({ message: "لطفا تاریخ را وارد کنید" });
  }
};
