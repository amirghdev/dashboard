const { handleError } = require("../utils/jwt");

module.exports.errorHandle = (error, req, res, next) => {
  handleError(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ data, message });
};
