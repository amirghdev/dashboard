const Yup = require("yup");

const schema = Yup.object().shape({
  subject: Yup.string()
    .required("موضوع نوشته اجباری میباشد")
    .min(4, "موضوع نوشته نمیتواند کمتر از 4 کاراکتر باشد")
    .max(50, "موضوع نوشته نمیتواند بیشتر از 50 کاراکتر باشد"),
  text: Yup.string()
    .required("نوشته اجباری میباشد")
    .min(4, "نوشته نمیتواند کمتر از ۴ کاراکتر باشد")
    .max(200, "نوشته نمیتواند بیشتر از 200 کاراکتر باشد"),
});

const updateSchema = Yup.object().shape({
  text: Yup.string()
    .required("نوشته اجباری میباشد")
    .min(4, "حداقل برای نوشته خود 4 کاراکتر بنویسید")
    .max(200, "نوشته نمیتواند بیشتر از 200 کاراکتر باشد"),
});

module.exports = {
  schema,
  updateSchema,
};
