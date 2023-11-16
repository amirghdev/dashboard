const yup = require("yup");

const schema = yup.object().shape({
  name: yup
    .string()
    .required("نام دسته بندی الزامی میباشد")
    .min(4, "نام دسته بندی نمیتواند کمتر از 4 کاراکتر باشد")
    .max(100, "نام دسته بندی نمیتواند بیشتر از 100 کاراکتر باشد"),
});

module.exports = schema;
