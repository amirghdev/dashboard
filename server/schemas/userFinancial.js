const yup = require("yup");

const userSchema = yup.object().shape({
  financial: yup.number().min(0, "مبلغ نمیتواند کمتر از 0 باشد").required("مبلغ هزینه الزامی میباشد").typeError("لطفا مبلغ هزینه را درست وارد کنید"),
});

module.exports = userSchema;
