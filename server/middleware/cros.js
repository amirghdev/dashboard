function cros(req, res, next) {
  // // Website you wish to allow to connect
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  // // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");

  // // Request methods you wish to allow
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  // );

  // // Request headers you wish to allow
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With,content-type"
  // );

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Pass to next layer of middleware
  next();
}

module.exports = {
  cros,
};
