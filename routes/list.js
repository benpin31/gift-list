const mongoose = require("mongoose");
let express = require("express");
let router = express.Router();
const listModel = require("./../model/list");
const giftModel = require("./../model/gift");
const userModel = require("./../model/user");
const getUserGifts = require("./../middleware/userGift");

router.get("/create", getUserGifts, function (req, res, next) {
  try {
    res.render("listCreate", {
      userId: req.app.locals.userId,
      gifts: req.userGifts,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async function (req, res, next) {
  try {
    const newList = await listModel.create(req.body);
    const user = await userModel.findById(req.app.locals.userId);
    const userLists = user.lists;
    userLists.push(newList._id);
    console.log(user, req.app.locals.userId)
    await userModel.findByIdAndUpdate(req.app.locals.userId, { lists: userLists });
    res.redirect("/lists");
  } catch (err) {
    next(err);
  }
});

router.post("/addGift/:id", async function (req, res, next) {
  // id is the list id
  try {
    await listModel
      .findById(req.params.id)
      .update({ $addToSet: { gifts: req.body.gifts } }); //Pour dédoublonner
    res.redirect("/lists/" + req.params.id);
  } catch (err) {
    next(err);
  }
});

router.get("/delete/:id", async function (req, res, next) {
  // id is the list id
  try {
    const result = await listModel.findByIdAndRemove(req.params.id);
    res.redirect("/lists");
  } catch (err) {
    next(err);
  }
});

router.post("/addToUser/:id", async function (req, res, next) {
  // id is the list id
  try {
    await userModel.find({email: req.body.email}) 
      .update({$addToSet: { lists: req.params.id}}) ;
    res.redirect("/lists/"+req.params.id)
  } catch(err) {
    next(err)
  }
});

router.get("/", getUserGifts, async function (req, res, next) {
  // id is the list id

  try {
    const user = await userModel
      .findById(req.app.locals.userId)
      .populate("lists");
    res.render("lists", { lists: user.lists });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", getUserGifts, async function (req, res, next) {
  // id is the list id
  try {
    const list = await listModel.findById(req.params.id).populate("gifts");
    // list.gifts.forEach((gift) => (gift.isTaken = gift.isAvailable));
    res.render("list", { list, gifts: req.userGifts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
