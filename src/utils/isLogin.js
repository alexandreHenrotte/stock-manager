var jwt = require("jsonwebtoken");

const tokenIsExpired = () => {
  var tokenExpired = false;

  const token = localStorage.getItem("token");
  var decodedToken = jwt.decode(token, { complete: true });
  var dateNow = new Date();

  if (decodedToken.exp < dateNow.getTime()) tokenExpired = true;

  return tokenExpired;
};

const isLogin = () => {
  if (localStorage.getItem("token") === null || tokenIsExpired()) {
    return false;
  } else return true;
};

export default isLogin;
