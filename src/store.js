import Vue from "vue";
import Vuex from "vuex";
// import helpers from "./helpers";
import mixing from "./mixing";
Vue.use(Vuex);

const shamsi = new Date().toLocaleDateString("fa-IR");
const day = mixing.methods.toEnglishNumber(shamsi.split("/")[2]);
const month = mixing.methods.toEnglishNumber(shamsi.split("/")[1]);
const year = mixing.methods.toEnglishNumber(shamsi.split("/")[0]);

export const store = new Vuex.Store({
  state: {
    currentDate: day,
    currentMonth: month,
    currentYear: year,
    currentUser: sessionStorage.getItem("username"),
    currentText: "",
    currentUnit: 0,
    isAdmin: sessionStorage.getItem("admin"),
    university: false,
    programming: false,
    user: {},
    todoDay: day,
    todoMonth: month,
    todoYear: year,
    todoDate: Date.now(),
    textMonth: month,
    textYear: year,
    financialMonth: month,
    financialYear: year,
    theme: String,
    showUniversity: false,
    showExam: false,
    showLoad: false,
    pageLoader: false,
    items: [
      // {
      //   text : "سلام",
      //   href : "home"
      // },{
      //   text : "سلام",
      //   href : "dashboard"
      // },
      // {
      //   text : "سلام",
      //   href : "home"
      // }
    ],
    // currentBg : currentBg
    // unit: unit
  },
});
