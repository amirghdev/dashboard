function toEnglishNumber(number) {
  var pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  var en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var cache = number;
  for (var i = 0; i < 10; i++) {
    var regex_fa = new RegExp(pn[i], "g");
    cache = cache.replace(regex_fa, en[i]);
  }
  return cache;
}

module.exports = {
    toEnglishNumber
};