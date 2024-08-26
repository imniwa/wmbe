const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  let { id } = jwt.verify(token, process.env.APP_KEY);
  return id;
};

module.exports = {
  decodeToken,
};
