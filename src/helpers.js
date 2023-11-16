import vue from "vue";
import VueResource from "vue-resource";

vue.use(VueResource);
vue.http.options.root = "http://localhost/dashboard2/";

export default {
  activeInfo(info) {
    info.classList.add("active-info");
    setTimeout(() => {
      info.classList.remove("active-info");
    }, 1000);
  },
  toEnglishNumber(number) {
    var pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    var en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var cache = number;
    for (var i = 0; i < 10; i++) {
      var regex_fa = new RegExp(pn[i], "g");
      cache = cache.replace(regex_fa, en[i]);
    }
    return cache;
  },
  monthChanger(month) {
    if (month == 1) {
      month = "فروردین";
    }
    if (month == 2) {
      month = "اردیبهشت";
    }
    if (month == 3) {
      month = "خرداد";
    }
    if (month == 4) {
      month = "تیر";
    }
    if (month == 5) {
      month = "مرداد";
    }
    if (month == 6) {
      month = "شهریور";
    }
    if (month == 7) {
      month = "مهر";
    }
    if (month == 8) {
      month = "آبان";
    }
    if (month == 9) {
      month = "آذر";
    }
    if (month == 10) {
      month = "دی";
    }
    if (month == 11) {
      month = "بهمن";
    }
    if (month == 12) {
      month = "اسفند";
    }
    return month;
  },
  toEnglishDigits(str) {
    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    var e = "۰".charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function(t) {
      return t.charCodeAt(0) - e;
    });

    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = "٠".charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function(t) {
      return t.charCodeAt(0) - e;
    });
    return str;
  },
  change(number) {
    let en = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31"
    ];
    let fa = [
      "۰",
      "۱",
      "۲",
      "۳",
      "۴",
      "۵",
      "۶",
      "۷",
      "۸",
      "۹",
      "۱۰",
      "۱۱",
      "۱۲",
      "۱۳",
      "۱۴",
      "۱۵",
      "۱۶",
      "۱۷",
      "۱۸",
      "۱۹",
      "۲۰",
      "۲۱",
      "۲۲",
      "۲۳",
      "۲۴",
      "۲۵",
      "۲۶",
      "۲۷",
      "۲۸",
      "۲۹",
      "۳۰",
      "۳۱"
    ];
    let result = number;
    for (let index = 0; index < fa.length; index++) {
      if (result == fa[index]) {
        fa[index] = en[index];
        result = en[index];
      }
    }
    return result;
  }
};
