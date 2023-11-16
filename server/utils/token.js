const Sessions = require("../model/Sessions");

async function token(token, res) {
  try {
    let session = await Sessions.findOne({ where: { token } });
    if (session != null) {
      let userId = session.userId;
      return {
        valid: true,
        id: userId,
      };
    } else {
      return res.json({ status: 0, message: "این کاربر وجود ندارد" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: 0, message: "مشکلی در سمت سرور بوجود آمده است" });
  }
}

module.exports = {
  token,
};
