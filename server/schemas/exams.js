const Yup = require("yup");

const examSchema = Yup.object().shape({
  name: Yup.string().required("نام امتحان الزامی میباشد").notOneOf(["default"], "لطفا نام امتحان را انتخاب کنید"),
  subject: Yup.string()
    .required("موارد امتحان الزامی میباشد")
    .min(4, "موارد امتحان نمیتواند کمتر از 4 کاراکتر باشد")
    .max(255, "موارد امتحان نمیتواند بیشتر از 255 کاراکتر باشد"),
  // date: Yup.string().required("تاریخ امتحان اجباری میباشد").notOneOf([""], "تاریخ امتحان الزامی میباشد"),
});

const updateExamSchema = Yup.object().shape({
  subject: Yup.string().min(4, "موارد امتحان نمیتواند کمتر از 4 کاراکتر باشد").max(255, "موارد امتحان نمیتواند بیشتر از 255 کاراکتر باشد"),
  day: Yup.number().typeError("لطفا تاریخ امتحان را درست مشخص کنید"),
  month: Yup.number().typeError("لطفا تاریخ امتحان را درست مشخص کنید"),
  year: Yup.number().typeError("لطفا تاریخ امتحان را درست مشخص کنید"),
  grade: Yup.number()
    .typeError("لطفا نمره امتحان را درست مشخص کنید")
    .min(0, "نمره امتحان نمیتواند کمتر از 0 باشد")
    .max(20, "نمره امتحان نمیتواند بیشتر از 20 باشد"),
});

module.exports = {
  examSchema,
  updateExamSchema,
};
