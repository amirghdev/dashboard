const Yup = require("yup");

const todoSchema = Yup.object().shape({
  text: Yup.string()
    .required("لطفا متنی برای کار خود انتخاب کنید")
    .min(4, "متن کار روزانه نمیتواند کمتر از 4 کاراکتر باشد")
    .max(50, "متن کار روزانه نمیتواند بیشتر از 50 کاراکتر باشد"),
});

module.exports = todoSchema;
