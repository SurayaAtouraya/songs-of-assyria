var express = require("express");
var router  = express.Router();

router.get('/profile', function (req, res) {
  res.render("profile.ejs");
})

module.exports = router;