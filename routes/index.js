var express = require("express");
var router = express.Router();
const protectPrivateRoute = require("./../middleware/protectRoute");

/* GET home page. */
router.get("/", protectPrivateRoute, function (req, res, next) {
  // passport.authenticate("local", (error, user, info) => {
    // console.log("-----------------", req.user.name)
    res.render("index", {req});
  // })(req, res);
});

module.exports = router;
