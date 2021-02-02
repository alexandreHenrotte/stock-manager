var express = require('express');
const User = require('./../models/User')
var router = express.Router();

router.get('/', (req, res) => {
    res.send({token : '12345'});
})

module.exports = router;