const Yup = require("yup");

const imageSchema = Yup.object().shape({
  image: Yup.object().shape({
    name: Yup.string().required("عکس الزامی میباشد"),
    size: Yup.number().max(3000000, "عکس نباید بیشتر از 3 مگابایت باشد"),
    mimetype: Yup.mixed().oneOf(["image/jpeg", "image/png", "image/jpg"], "تنها پسوند های jpg , png , jpeg پشتیبانی میشود"),
  }),
});

module.exports = {
  imageSchema,
};
