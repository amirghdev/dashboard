const yup = require("yup");

const schema = yup.object().shape({
  subject: yup
    .string()
    .required("عنوان  الزامی میباشد")
    .min(4, "عنوان  نمیتواند کمتر از 4 کاراکتر باشد")
    .max(100, "عنوان  نمیتواند بیشتر از 100 کاراکتر باشد"),
  price: yup.number().min(0, "قیمت نمیتواند کمتر از 0 باشد").required("قیمت الزامی میباشد").typeError("لطفا قیمت را درست وارد کنید"),
});

module.exports = schema;
