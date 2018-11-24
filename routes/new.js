const express = require("express");
const router  = express.Router();
const middleware = require("../middleware/middleware.js");

router.get('/new', middleware.isLoggedIn, function (req, res) {
    if (req.user) {
        res.render("new.ejs");
    }
});

module.exports = router;