const jwt = require("jsonwebtoken");
const appError = require("../utilites/appError");
const statusCodeText = require("../utilites/statusCodeText");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    throw new appError(
      statusCodeText.FAIL,
      401,
      "Authorization header is required"
    );
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new appError(statusCodeText.FAIL, 401, "Token is required");
  }
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRTER_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    throw new appError(statusCodeText.FAIL, 401, "Invalid token");
  }
};

module.exports = verifyToken;
