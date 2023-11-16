const Yup = require("yup");

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("کلمه عبور الزامی می باشد")
    .min(8, "کلمه عبور نباید کمتر از 8 کاراکتر باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد"),
});

module.exports = passwordSchema;
