const Yup = require("yup");

const schema = Yup.object().shape({
  subject: Yup.string()
    .required("موضوع نوشته الزامی میباشد")
    .min(4, "موضوع نوشته نمیتواند کمتر از 4 کاراکتر باشد")
    .max(50, "موضوع نوشته نمیتواند بیشتر از 50 کاراکتر باشد"),
  text: Yup.string()
    .required("متن نوشته الزامی میباشد")
    .min(4, "متن نوشته نمیتواند کمتر از 4 کاراکتر باشد")
    .max(255, "متن نوشته نمیتواند بیشتر از 255 کاراکتر باشد"),
});

const updateSchema = Yup.object().shape({
  text: Yup.string()
    .required("متن نوشته الزامی میباشد")
    .min(4, "متن نوشته نمیتواند کمتر از 4 کاراکتر باشد")
    .max(255, "متن نوشته نمیتواند بیشتر از 255 کاراکتر باشد"),
});

module.exports = {
  schema,
  updateSchema,
};
