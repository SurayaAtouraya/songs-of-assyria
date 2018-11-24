const passport          = require("passport"),
      googleStrategy    = require("passport-google-oauth20"),
      facebookStrategy  = require('passport-facebook'),
      instagramStrategy = require('passport-instagram'),
      envVars           = require('./envVars'),
      User              = require("../models/user.js"),
      localStrategy     = require("passport-local"),
      validateInputs    = require("../middleware/validateInputs");

//Setting Up Local Strategy For Sign Up/Login
passport.use(new localStrategy(User.authenticate()));

//Setting Up Google Strategy For Sign Up/Login
passport.use(
    new googleStrategy({
    callbackURL: envVars.google.callbackURL,
    clientID: envVars.google.clientID,
    clientSecret: envVars.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleID: profile.id}).then((foundUser) => {
        if (foundUser) {
            done(null, foundUser);
        }
        else {
            new User ({
                username: profile.displayName,
                googleID: profile.id,
                email: profile.emails[0].value,
                verified: false
                }).save().then((newUser) => {
                    done(null, newUser);
            });
        }
    });
})
);

//Setting Up Facebook Strategy For Sign Up/Login
passport.use(new facebookStrategy({
    passReqToCallback : true,
    clientID: envVars.facebook.clientID,
    clientSecret: envVars.facebook.clientSecret,
    callbackURL: envVars.facebook.callbackURL,
    profileFields: ['id', 'emails', 'displayName']
    },
    
    function(req, token, refreshToken, profile, done) {
        
        //Check if user already exists in the db through fb.
        User.findOne({facebookID: profile.id}).then((foundUser) => {
        if (foundUser) {
            done(null, foundUser);
        }
        
        //Not found, create account
        else {
            //Check if fb account has email, set name to username
            var emailSetter = "", verifySetter = false, userSetter = "";
            if (profile.emails) {emailSetter = profile.emails[0].value; verifySetter = true;}
            profile.displayName = validateInputs.toAlphaNumeric(profile.displayName);
            
            //Make new User.
            new User ({
            username: profile.displayName,
            facebookID: profile.id,
            email: emailSetter,
            verified: verifySetter
            }).save(function(error, newUser) {
                if (error) {
                    req.flash("error", error.message);
                    done(error);
                } else {
                req.flash("success", "Account successfully created.");
                done(null, newUser);
                }
                done(null, newUser);
            });
        }
        });
    }
));

passport.use(new instagramStrategy({
    clientID: envVars.instagram.clientID,
    clientSecret: envVars.instagram.clientSecret,
    callbackURL: envVars.instagram.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({instagramID: profile.id}).then((foundUser) => {
    if (foundUser) {
        done(null, foundUser);
    }
    else {
        new User ({
            username: profile.username,
            instagramID: profile.id
            }).save().then((newUser) => {
                done(null, newUser);
        });
    }
    });
  }
));
