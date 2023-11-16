const Yup = require("yup");

const bookmarkSchema = Yup.object().shape({
  name: Yup.string()
    .required("نام بوک مارک الزامی میباشد")
    .min(4, "نام بوک مارک نمیتواند کمتر از 4 کاراکتر باشد")
    .max(50, "نام بوک مارک نمیتواند بیشتر از 50 کاراکتر باشد"),
  link: Yup.string().required("لینک بوک مارک الزامی میباشد").min(10, "لینک مارک نمیتواند کمتر از 10 کاراکتر باشد"),
});

const categorySchema = Yup.object().shape({
  name: Yup.string()
    .required("نام دسته بندی الزامی میباشد")
    .min(4, "نام دسته بندی نمیتواند کمتر از 4 کاراکتر باشد")
    .max(50, "نام دسته بندی نمیتواند بیشتر از 50 کاراکتر باشد"),
});

const updateSchema = Yup.object().shape({
  link: Yup.string().required("لینک بوک مارک الزامی میباشد").min(10, "لینک مارک نمیتواند کمتر از 10 کاراکتر باشد"),
});

module.exports = {
  bookmarkSchema,
  updateSchema,
  categorySchema,
};
