const express = require("express");
const router = new express.Router();
const GiftModel = require("./../model/gift"); //Path to GiftModel
const uploader = require("./../config/cloudinary");

//* GET all gifts
router.get("/users", async (req, res, next) => {
  try {
    const gifts = GiftModel.find();
    res.render("allGifts", { gifts });
  } catch (error) {
    next(error);
  }
});

// //* GET gifts by user
// router.get("/users/:id", async (req, res, next) => {
//   try {
//     const { userId } = req.params.id;
//     res.render("gift/giftByUser", userId);
//   } catch (error) {
//     next(error);
//   }
// });

// //* GET gifts by list
// router.get("/lists/:id", async (req, res, next) => {
//   try {
//     const { listId } = req.params.id;
//     res.render("gift/giftByList", listId);
//   } catch (error) {
//     next(error);
//   }
// });

//* GET - create a gift
router.get("/create", async (req, res, next) => {
  try {
    res.render("giftCreate");
  } catch (error) {
    next(error);
  }
});

//* POST - Create a new gift
router.post("/create", uploader.single("picture"), async (req, res, next) => {
  const newGift = { ...req.body };
  console.log("newGift", newGift);
  if (req.file) {
    newGift.picture = req.file.path;
  } else {
    newGift.picture = undefined;
  }
  try {
    await GiftModel.create(newGift);
    console.log("New gift created");
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

//* DELETE delete a gift
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { giftId } = req.params.id;
    await GiftModel.findById(giftId);
  } catch (error) {
    rs;
    next(error);
  }
});

//* GET - update a gift
router.get("/update/:id", async (req, res, next) => {
  try {
    const giftToUpdate = await GiftModel.findById(req.params.id);
    console.log("giftToUpdate", giftToUpdate);
    res.render("giftUpdate", giftToUpdate);
  } catch (err) {
    next(err);
  }
});

//* POST - update a given gift
router.post("/update/:id", uploader.single("cover"), async (req, res, next) => {
  const giftToUpdate = { ...req.body };
  if (req.file) {
    giftToUpdate.picture = req.file.path;
  } else {
    giftToUpdate.picture = undefined;
  }
  try {
    await GiftModel.findByIdAndUpdate(req.params.id, giftToUpdate);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
