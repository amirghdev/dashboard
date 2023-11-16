/* eslint-disable no-undef */
import axios from "axios";

const localUrl = "http://localhost/dashboard2/auth/";
const siteUrl = "https://amirmohammadgharibi.ir/api/dashboard/";

export default {
  methods: {
    logOut(user) {
      const time = new Date().getTime();
      $.ajax({
        type: "get",
        url: `${localUrl}auth.php?action=logOut&username=${user}&time=${time}`,
        // url: `${siteUrl}auth/auth.php?action=logOut&username=${user}&time=${time}`,
        success: function (response) {
          const res = JSON.parse(response);
          if (res.status == 1) {
            sessionStorage.clear();
            location.href = "/";
          }
        },
      });
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
    activeInfo(info) {
      info.classList.add("active-info");
      setTimeout(() => {
        info.classList.remove("active-info");
      }, 1000);
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
    dateChanger(timestamp) {
      let date = new Date(Number(timestamp));
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      if (h == 0) {
        h = 12;
      }

      // if (h > 12) {
      //     h -= 12;
      // }

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      const fullTime = `${h}:${m}:${s}`;
      date = new Date(Number(timestamp)).toLocaleDateString("fa-ir");
      let month = this.monthChanger(this.toEnglishNumber(date.split("/")[1]));
      let day = this.toEnglishNumber(date.split("/")[2]);
      const full = `${day} ${month} ماه ساعت ${fullTime} میباشد`;
      return full;
    },
    timeChanger(timestamp) {
      const date = new Date(Number(timestamp));
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let session = "AM";

      if (h == 0) {
        h = 12;
      }

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      const fullTime = `${h}:${m}:${s}`;
      return fullTime;
    },
    splitNumber(number) {
      let x, y, z;
      number += "";
      number = number.replace(",", "");
      x = number.split(".");
      y = x[0];
      z = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
      return y + z;
    },
    nameToUrl(name) {
      let checkName = name.split(" ");
      if (checkName.length > 1) {
        let newName = checkName.join("-"); // اصول فناوری   اصول-قناوری
        return newName;
      } else {
        return name;
      }
    },
    nameToShow(name) {
      let arr = name.split("-");
      if (arr.length > 1) {
        let newName = arr.join(" "); // اصول-فناوری  اصول فناوری
        return newName;
      } else {
        return name;
      }
    },
    generateDate() {
      const shamsi = new Date().toLocaleDateString("fa-IR");
      const day = mixing.methods.toEnglishNumber(shamsi.split("/")[2]);
      const month = mixing.methods.toEnglishNumber(shamsi.split("/")[1]);
      const year = mixing.methods.toEnglishNumber(shamsi.split("/")[0]);
      return `${day} / ${month} / ${year}`;
    },
    addToItems(items, text, href) {
      let addItem = { text, href };
      // let search = items.find((item) => item.text = addItem.text);
      let add = true;
      items.forEach((item) => {
        item.text == addItem.text ? (add = false) : "";
      });
      if (add) {
        items.push(addItem);
      }
    },
    getItems(url, data, showPage, showLoader, showError, errMessage, saveData, showItems) {
      axios.post(url, data).then((response) => {
        // showPage = true;
        // showLoader = false;
        // if (response.data.status == 1) {
        //   showError = false;
        //   saveData = response.data.items;
        //   response.data.items.length > 0 ? showItems = true : showItems = false;
        // } else {
        //   showError = true;
        //   errMessage = response.data.message;
        // }
      });
    },
  },
};
