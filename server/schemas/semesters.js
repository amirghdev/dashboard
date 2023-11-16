const Yup = require("yup");

const semesterSchema = Yup.object().shape({
  unit: Yup.number()
    .typeError("لطفا شماره ترم را به درستی وارد کنید")
    .required("شماره ترم اجباری میباشد")
    .min(1, "شماره ترم نمیتواند کمتر از 1 باشد")
    .max(12, "شماره ترم نمیتواند بیشتر از 12 باشد"),
  year: Yup.number().typeError("لطفا سال ترم را به درستی وارد کنید").required("سال ترم اجباری میباشد"),
});

module.exports = semesterSchema;
