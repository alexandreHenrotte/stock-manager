var jwt = require("jsonwebtoken");

const tokenIsExpired = () => {
  var tokenExpired = false;

  const token = localStorage.getItem("token");
  var decodedToken = jwt.decode(token, { complete: true });
  var dateNow = new Date();

  if (decodedToken !== null && decodedToken.exp < dateNow.getTime()) {
    localStorage.removeItem('token');
    tokenExpired = true;
  }

  return tokenExpired;
};

const isLogin = () => {
  console.log("a", localStorage.getItem("token") === null);
  console.log("b", tokenIsExpired())
  if (localStorage.getItem("token") === null) {
    return false;
  }
  else if (localStorage.getItem("token") === true && tokenIsExpired()) {
    return false;
  }
  else {
    return true;
  }
};

export default isLogin;
