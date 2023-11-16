const Yup = require("yup");

const schema = Yup.object().shape({
  subject: Yup.string()
    .required("عنوان درامد الزامی میباشد")
    .min(4, "عنوان درامد نمیتواند کمتر از 4 کاراکتر باشد")
    .max(100, "عنوان درامد نمیتواند بیشتر از 100 کاراکتر باشد"),
  price: Yup.number().typeError("لطفا مبلغ درامد را درست وارد کنید").required(),
});

module.exports = schema;
