require("dotenv").config();
var express = require("express");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var router = express.Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body);
  if (user === null) {
    res.status(400).json({
      success: false,
      errorMessage: "User not found",
    });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { username: user.username },
        process.env.SECRET_TOKEN_KEY
      );
      res.status(200).json({
        success: true,
        token: token,
        redirectUrl: "/products",
      });
    } else {
      res.status(400).json({
        sucess: false,
        errorMessage: "Wrong password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      errorMessage: "Authentication Error",
    });
  }
});

module.exports = router;
