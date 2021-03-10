const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./../model/user");

// Passport serializer
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Passport deserializer
passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});

// Passport strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password", // by default
    },
    (email, password, done) => {
      UserModel.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: "Incorrect password" });
          }
          done(null, user);
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    }
  )
);
