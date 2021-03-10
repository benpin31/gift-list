const express = require("express");
const router = express.Router();
const UserModel = require("./../model/user"); //Path to UserModel
const passport = require("passport");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

//* GET signup
router.get("/signup", (req, res, next) => res.render("signup"));

//* POST signup
router.post("/signup", async (req, res, next) => {
  const newUser = { ...req.body }; // clone req.body with spread operator
  const foundUser = await UserModel.findOne({ email: newUser.email });

  //* 1. Check username and password are not empty
  if (!newUser.email || !newUser.password) {
    res.render("signup", { errorMessage: "Indicate email and password" });
    return;
  }

  //* 2. Check user does not already exist
  if (foundUser) {
    res.render("signup", { errorMessage: "The email already exists" });
    return;
  }
  try {
    //* 3. Create the hashed password and the user
    const hashedPassword = bcrypt.hashSync(newUser.password, bcryptSalt);
    newUser.password = hashedPassword;
    await UserModel.create(newUser);
    res.render("signin", {
      msg: { status: "success", text: "Congrats ! You are now registered !" },
    });
  } catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    res.render("signup", {
      msg: { status: "error", text: errorMessage },
    });
  }
});

//* GET signin
router.get("/signin", (req, res, next) => res.render("signin"));

//* POST signin
router.post(
  "/signin",
  (req, res, next) => {
    console.log("ici");
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: false,
  })
);

//* GET signout
router.get("/signout", (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("signin");
  });
});

module.exports = router;
