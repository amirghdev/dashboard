const path = require("path");
//-
const express = require("express");
const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");
// const helmet = require("helmet");

const { errorHandle } = require("./middleware/errors");

//- Database -//
// dotenv.config({
//   path: "./config/config.env",
// });
// if (process.env.NODE_ENV == "development") {
//   process.env.LINK = process.env.DEV_LINK;
// } else {
//   process.env.LINK = process.env.PRO_LINK;
// }
//- End of Database -//
//- my creation -//
const sequelize = require("./config/db");
const { cros } = require("./middleware/cros");
//- End of my creation -//

const app = express();

// extra
// app.use(
//   helmet({
//     xPermittedCrossDomainPolicies: false,
//   })
// );

//- middlewares -//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cros);
app.use(fileUpload());
//- End of middlewares -//

//- static -//
app.use(express.static(path.join(__dirname, "public")));
//- End of static -//

//- routes section -//
app.use(require("./routes/auth"));
app.use(require("./routes/theme"));
app.use("/Users", require("./routes/users"));
app.use("/Todos", require("./routes/todos"));
app.use("/Texts", require("./routes/texts"));
app.use("/Semesters", require("./routes/semesters"));
app.use("/Semester/Texts", require("./routes/semesterTexts"));
app.use("/Courses", require("./routes/courses"));
app.use("/Exams", require("./routes/exams"));
app.use("/Financial", require("./routes/financial"));
app.use("/Income", require("./routes/income"));
app.use("/Books", require("./routes/books"));
app.use("/Messages", require("./routes/messages"));
app.use("/Bookmarks", require("./routes/bookmarks"));
app.use(require("./routes/information"));
app.use(require("./routes/appStart"));
//- End of routes section -//

//- handle error
app.use(errorHandle);
//- End of handle error

const port = process.env.PORT || 2433;

sequelize.sync({ alter: false }).then((result) => {
  console.log(`mysql connected : ${result.config.host}`);
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});

//TODO : change activation email in auth controller
//TODO : change reset password in auth controller
