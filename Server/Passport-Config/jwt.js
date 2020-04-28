const express = require("express");
const router = express.Router();
const jwtSecret = 'secret';
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../Models/users')

router.post('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log('Message:' + ' ' + info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                User.findOne({ username: user.username }).then(user => {
                    console.log(user)
                    const token = jwt.sign({ id: user.username }, jwtSecret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        user: user.username,
                        message: 'user found & logged in',
                    });
                });
            });
        }
    })(req, res, next);
});

module.exports = router;
