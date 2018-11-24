const express = require("express");
const hash = require("../middleware/hash");
const email = require("../middleware/email");
const router  = express.Router();
const passport = require("passport");
const validateInputs = require("../middleware/validateInputs");
const User = require("../models/user");
const envVars = require('../config/envVars');
const fs= require("fs");
//handle sign up logic
router.post("/register", function(req, res) {
    
    //Front end error handling data
    var sendBack = {email: req.body.email, username: req.body.username};
    var redBox = {email: false, username: false, password: false}; 
    var signupErrMsg = "";
    var err = false;
    
    //Validate inputs such that they match required criterion.
    if(!validateInputs.validateEmail(req.body.email))       {err = true; signupErrMsg += "Please enter a valid email.\n"; redBox.email = true;}  
    if(!validateInputs.validateUsername(req.body.username)) {err = true; signupErrMsg += "Username invalid! Must contain only alphanumeric characters or underscores.\n"; redBox.username = true;} 
    if(!validateInputs.validatePassword(req.body.password)) {err = true; signupErrMsg += "Invalid Password! Must be between 4 and 100 characters."; redBox.password = true;}
    if (err) {return res.render("index.ejs", {signupErrMsg: signupErrMsg, badRegister: true, sendBack: sendBack, redBox: redBox});}   

    //Generate hash for email verification
    var verifyHash = hash.emailHash();
    var resetHash = hash.emailHash();
    var createDate = Date.now();
    email.resetEmail.resetHash = resetHash;
    
    //Attempt to create a new user, if error (eg: username exists) alerts user, else creates user and sends confirmation email
    var newUser = new User({username: req.body.username, email: req.body.email, verifyHash: verifyHash, resetHash: resetHash, createDate: createDate});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            if (err.message === "A user with the given username is already registered") {redBox.username = true;}
            else {redBox.email = true;}
            return res.render("index.ejs", {signupErrMsg: err.message, badRegister: true, sendBack: sendBack, redBox: redBox});
        } else {
        email.confirmEmail.to = req.body.email;
        email.confirmEmail.verifyHash = verifyHash;
        email.confirmEmail.html = email.confirmEmail.html + '<a href =' + envVars.webURL + "verify/" + email.confirmEmail.verifyHash + '>click here</a>';
        email.transporter.sendMail(email.confirmEmail, function(err){if (err){console.log(err);} else {console.log("Sent")}});
        //Reset values since email has been sent
        email.confirmEmail.html = envVars.defaultVerifyEmailHTML;
        email.confirmEmail.verifyHash = "";
        email.confirmEmail.to = "";
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Account successfully created, confirmation email has been sent.");
            res.redirect("/profile"); 
        });
        }
    });
});

//handling login logic
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
  if (err) {return next(err);}
      //Account does not exist or invalid login.
      if (!user) {res.render("index.ejs", {badLogin: true});} 
      //Log user in
      else {req.logIn(user, function(err) {
        if (err) {return next(err);}
        else {return res.redirect('/profile');}
      });
      }
  })(req, res, next);
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Successfully logged out");
   res.redirect("/");
});

//Email sent to retrieve password
router.post("/reset", function(req, res) {
    if(!validateInputs.validateEmail(req.body.email)) {return res.render("index.ejs", {resetErrMsg: "Please enter a valid email.", badReset: true});}
    var newHash = hash.emailHash();
    email.resetEmail.resetHash = String(newHash);
    console.log(newHash);
    console.log(email.resetEmail.resetHash);
    User.findOneAndUpdate({email: req.body.email}, {$set:{resetHash:String(newHash), createDate:Date.now()}} ,function(err, user) {
        if (err) {console.log(err);return res.redirect("/");}
    });
    email.resetEmail.to = req.body.email;
    email.resetEmail.html = email.resetEmail.html + '<a href =' + envVars.webURL + "verify/reset/" + email.resetEmail.resetHash + '>click here</a>';
    email.transporter.sendMail(email.resetEmail, function(err){
        if (err) {console.log(err.message);} else {console.log("SENT");}
    });
    email.resetEmail.html = envVars.defaultResetEmailHTML;
    res.redirect("/");
});

//Authorize with Google 
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile','email']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), function(req, res){
    console.log(req.user.verified);
   if (req.user.verified === false) {res.redirect(307,"/auth/set-username" + "/?valid=" + req.user.googleID);}
   else {res.redirect("/profile");}
});

//Auth with Facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ["email"]
}));

router.get('/auth/facebook/redirect',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/register' }));

//Auth with Instagram
router.get('/instagram', passport.authenticate('instagram', { scope: ['basic']}));

router.get('/auth/instagram/redirect', passport.authenticate('instagram'), function(req, res){
   res.redirect("/profile");
});

router.get("/auth/set-username", function(req, res){
    User.findOne({$or:[{facebookID: req.query.valid}, {googleID: req.query.valid}]}, function(err, user) {
        if (user) {res.send("EGGCELLENT")}
        else {res.send("Nice try pal.")}
        if (err) {console.log("err")}
    });
});

module.exports = router;