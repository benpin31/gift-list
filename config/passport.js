const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./../model/user");

// Passport serializer
passport.serializeUser((user, cb) => cb(null, user._id));
// Passport deserializer
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then((user) => cb(null, user))
    .catch((err) => cb(err));
});
// Passport strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",

      passwordField: "password", // by default
    },
    (email, password, done) => {
      console.log(email, password, done);
      UserModel.findOne({ email })

        .then((user) => {
          console.log(email, password);
          console.log(user, "this is user");
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          console.log("user", user);
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password" });
          }
          console.log("everything ok");
          done(null, user);
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    }
  )
);
