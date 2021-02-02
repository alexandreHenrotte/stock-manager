var express = require('express');
const User = require('./../models/User')
var router = express.Router();

router.post('/', async function (req, res, next) {
    req.user = new User()
    next()
  }, saveUserAndGiveFeedback())
  
  function saveUserAndGiveFeedback() {
    return async (req, res) => {
        let user = req.user;
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;

        try{
            user = await user.save();
            res.json({registered : true});
        } catch(e) {
            res.json(e);
            console.log(e);
        }
    }
  }
  

module.exports = router;