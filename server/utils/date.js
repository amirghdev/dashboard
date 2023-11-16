const { toEnglishNumber } = require("./number");

const static = new Date().toLocaleDateString("fa-IR");
const day = toEnglishNumber(static.split("/")[2]);
const month = toEnglishNumber(static.split("/")[1]);
const year = toEnglishNumber(static.split("/")[0]);

function dynamic(timestamps) {
  const date = new Date(timestamps).toLocaleDateString("fa-IR");
  const day = toEnglishNumber(date.split("/")[2]);
  const month = toEnglishNumber(date.split("/")[1]);
  const year = toEnglishNumber(date.split("/")[0]);
  return {
    day,
    month,
    year,
  };
}

module.exports = {
  day,
  month,
  year,
  dynamic,
};
