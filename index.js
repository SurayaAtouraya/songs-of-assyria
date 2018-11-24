const express            = require("express"),
      app                = express(),
      bodyParser         = require("body-parser"),
      mongoose           = require("mongoose"),
      passport           = require("passport"),
      cookieParser       = require("cookie-parser"),
      User               = require("./models/user.js"),
      session            = require("express-session"),
      envVars            = require('./config/envVars'),
      passportStrategies = require('./config/passportStrategies'),
      flash              = require("connect-flash");
    
    
mongoose.connect("mongodb://localhost/songs-of-assyria");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(envVars.cookieSecret));

// PASSPORT CONFIGURATION
app.use(session({
    secret: envVars.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());     
passport.deserializeUser(User.deserializeUser());

app.use(flash());
  
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

//Route Connection
var indexRoute = require("./routes/index.js");
var authRoute = require("./routes/auth.js");
var verifyRoute = require("./routes/verify.js");
var profileRoute = require("./routes/profile.js");
var newRoute = require("./routes/new.js");
app.use("/", indexRoute);
app.use("/", authRoute);
app.use("/", verifyRoute);
app.use("/", profileRoute);
app.use("/", newRoute);

app.listen(process.env.PORT, process.env.IP);