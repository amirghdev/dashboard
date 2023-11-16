const Yup = require("yup");

const registerSchema = Yup.object().shape({
  lastName: Yup.string().required("نام خانوادگی شما الزامی میباشد"),
  firstName: Yup.string().required("نام شما الزامی میباشد"),
  email: Yup.string().required("ایمیل الزامی می باشد").email("ایمیل معتبر نمی باشد"),
  password: Yup.string()
    .required("کلمه عبور الزامی می باشد")
    .min(8, "کلمه عبور نباید کمتر از 8 کاراکتر باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد"),
  username: Yup.string()
    .required("نام کاربری شما الزامی میباشد")
    .min(4, "نام کاربری شما نمیتواند کمتر از ۴ کاراکتر باشد")
    .max(20, "نام کاربری شما نمیتواند بیشتر از ۲۰ کاراکتر باشد"),
});

module.exports = registerSchema;
