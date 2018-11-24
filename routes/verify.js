const express = require("express");
const router  = express.Router();
const User = require("../models/user");
const userMiddleware = require("../middleware/user");
const validateInputs    = require("../middleware/validateInputs");
const hash = require("../middleware/hash");

//handle user verification
router.get("/verify/:hash", function(req, res){
    //Find user based on hash, if found make verified true and delete the hash, if not found redirect to index
    User.findOneAndUpdate({verifyHash: req.params.hash}, {$set: {verified: true}, $unset : { verifyHash : 1}} , function(err, user) {
        if (err) {console.log(err); return res.redirect("/");}
        //Now try to log them in, if failed return to index.
        req.logIn(user, function(err) {
            if (err) {console.log(err); return res.redirect("/");} else {
                res.redirect("/profile");
            }
        });
    });
});

//set up user reset password
router.get("/verify/reset/:hash", function(req, res){
    User.findOne({resetHash: req.params.hash}).then((foundUser) => {
        //User not found matching hash
        if (!foundUser) {return res.redirect("/");} else {
            if (!userMiddleware.hasExpired(req.params.hash)) {
                res.render("index.ejs", {resetPassword: true, resetHash: req.params.hash});
            } else {
                //Expired
                res.redirect("/");
            }
        }
    });

});

//handle user reset password
router.post("/verify/reset/:hash", function(req, res) {
    //User enters a password that does not match criteria
    if(!validateInputs.validatePassword(req.body.password)) {
        return res.render("index.ejs", {resetPassword: true, resetHash: req.params.hash, invalidPassword: true});
    }
    console.log(req.params.hash);
    User.findOne({resetHash: req.params.hash}).then((foundUser) => {
        foundUser.resetHash = hash.emailHash();
        foundUser.createDate = Date.now();
        foundUser.setPassword(req.body.password, function(){
            foundUser.save();
            req.logIn(foundUser, function(err) {
                if (err) {console.log(err); return res.redirect("/index");} else {
                    res.redirect("/profile");
                }
            });
        });
    });
});

module.exports = router;