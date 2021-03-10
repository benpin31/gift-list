const passport = require("passport");

module.exports = function protectPrivateRoute(req, res, next) {
  passport.authenticate("local", (error, user, info) => {
    // console.log("-----------------", req.user.name)
    if (req.user) next();
    else res.redirect("/signin");  
  })(req, res);
};


