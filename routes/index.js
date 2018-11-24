var express = require("express");
var router  = express.Router();
const User = require("../models/user");

router.get('/', function (req, res) {
  res.render("index.ejs");
});

router.get('/assyrian', function (req, res) {
  res.render("assyrian.ejs");
});

router.get('/photo', function (req, res) {
  User.findOne({username: "zowaa"}, function (err, doc) {
    if (err) {
      console.log("fuckin error");
    }
    console.log(doc);
  });
});

module.exports = router;