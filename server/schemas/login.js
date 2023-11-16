const Yup = require("yup");

const loginSchema = Yup.object().shape({
  password: Yup.string().required("رمز عبور الزامی می باشد"),
  username: Yup.string().required("نام کاربری الزامی می باشد"),
});

module.exports = loginSchema;
