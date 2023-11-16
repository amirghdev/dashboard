const Yup = require("yup");

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("لطفا رمز عبور خود را وارد کنید")
    .min(8, "رمز عبور نمیتواند کمتر از 8 کاراکتر باشد")
    .max(255, "رمز عبور نمیتواند بیشتر از 255 کاراکتر باشد"),
});

const universitySchema = Yup.object().shape({
  unit: Yup.number()
    .typeError("شماره ترم باید عدد و نمیتواند خالی باشد")
    .required("لطفا شماره ترم را وارد کنید")
    .max(12, "شماره ترم شما نمیتواند بیشتر از 12 باشد"),
});

const imageSchema = Yup.object().shape({
  image: Yup.object().shape({
    name: Yup.string().required("آپلود عکس اجباری میباشد"),
    size: Yup.number().max(2000000, "حجم عکس آپلود شده نباید بیشتر از 2 مگابایت باشد"),
    mimetype: Yup.mixed().oneOf(["image/jpg", "image/png", "image/jpeg"], "پسوند آپلود شده اشتباه است"),
  }),
});

module.exports = {
  passwordSchema,
  universitySchema,
  imageSchema,
};
