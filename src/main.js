import Vue from "vue";

import App from "./App.vue";

Vue.config.productionTip = false;

//- tools -//
import VueRouter from "vue-router";
// import VueResource from "vue-resource";
import axios from "axios";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Toast from "vue-toastification";
// import CKEditor from "@ckeditor/ckeditor5-vue2";
import loader from "vue-ui-preloader";
// import VueEasytable from "vue-easytable"; // import library

//- End tools -//

//- import my creation -//
import { Routes } from "./routes";
import { store } from "./store";
//- End import my creation -//

//- vue-router config -//
const router = new VueRouter({
  routes: Routes,
  mode: "history",
});
//- End vue-router config -//

//- css section -//
import "../public/css/bootstrap.min.css";
import "../public/css/font-awesome.min.css";
import "animate.css";
import "vue-toastification/dist/index.css";
import "../public/css/style.css";
//- End css section -//

//- font awesome -//

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//- End font awesome -//

//- components -//
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
Vue.use(VuePersianDatetimePicker, {
  name: "date-picker",
  props: {
    // format: "YYYY-MM-DD HH:mm",
    // displayFormat: "jYYYY/jMM/jDD",
    editable: false,
    inputClass: "form-control noBorder",
    placeholder: "تاریخ خود را انتخاب کنید",
    altFormat: "YYYY-MM-DD",
    color: "#1A1A1A",
    autoSubmit: true,
  },
});

import err from "./components/layouts/Error.vue";
Vue.component("err", err);

import breadcrumb from "./components/layouts/Breadcrumb.vue";
Vue.component("breadcrumb", breadcrumb);

import PulseLoader from "vue-spinner/src/PulseLoader.vue";
Vue.component("PulseLoader", PulseLoader);

//- End components -//

//- use -//
Vue.use(VueRouter);
Vue.use(Toast, {
  timeout: 2000,
});
Vue.prototype.$http = axios;
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://localhost:3000/";
} else {
  axios.defaults.baseURL = "https://api.dashboard.amirmohammadgharibi.ir/";
}
Vue.use(loader);
//- End use -//

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
