var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  passport.authenticate("local", (error, user, info) => {
    res.render("index");
  })(req, res);
});

module.exports = router;
