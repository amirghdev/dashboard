const Yup = require("yup");

const schema = Yup.object().shape({
  name: Yup.string()
    .required("نام کتاب اجباری میباشد")
    .min(4, "نام کتاب نباید کمتر از 4 کاراکتر باشد")
    .max(100, "نام کتاب نباید بیشتر از 100 کاراکتر باشد"),
  // price: Yup.number()
  //   .required("هزینه کتاب اجباری میباشد")
  //   .typeError("لطفا هزینه کتاب را به عدد وارد کنید")
  //   .min(0, "هزینه کتاب نمیتواند کمتر از 0 باشد"),
  author: Yup.string()
    .required("نام نویسنده کتاب اجباری میباشد")
    .min(4, "نام نویسنده کتاب نمیتواند کمتر از 4 کاراکتر  باشد")
    .max(255, "نام نویسنده کتاب نمیتواند بیشتر از 255 کاراکتر باشد"),
});

const imageSchema = Yup.object().shape({
  image: Yup.object().shape({
    name: Yup.string().required("عکس الزامی میباشد"),
    size: Yup.number().max(3000000, "عکس نباید بیشتر از 3 مگابایت باشد"),
    mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png", "image/jpg"], "تنها پسوند های jpg , png , jpeg پشتیبانی میشود"),
  }),
});

const updateSchema = Yup.object().shape({
  summary: Yup.string()
    .required("لطفا خلاصه کتاب را وارد کنید")
    .min(4, "خلاصه کتاب نمیتواند کمتر از 4 کاراکتر  باشد")
    .max(255, "خلاصه کتاب نمیتواند بیشتر از 255 کاراکتر باشد"),
});

module.exports = {
  schema,
  imageSchema,
  updateSchema,
};
