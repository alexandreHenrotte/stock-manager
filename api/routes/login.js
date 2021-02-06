var express = require('express');
const User = require('./../models/User')
const bcrypt = require('bcrypt');
var router = express.Router();

router.post('/', async (req, res) => {
    const user = await User.findOne({email:req.body.email});
    console.log(req.body);
    if (user === null) {
        res.status(400).json({
            success: false,
            errorMessage: "User not found"
        })
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).json({
                success: true,
                redirectUrl: "/products"
            });
        }
        else {
            res.status(400).json({
                sucess: false,
                errorMessage: "Wrong password"
            })
        }
    } catch {
        return res.status(500).json({
            success: false,
            errorMessage: "Authentication Error"
        })
    }
})

module.exports = router;