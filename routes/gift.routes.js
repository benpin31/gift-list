const express = require("express");
const router = new express.Router();
const GiftModel = require("./../model/gift"); //Path to GiftModel
const uploader = require("./../config/cloudinary");

//* GET all gifts
router.get("/users", async (req, res, next) => {
  try {
    const gifts = GiftModel.find();
    res.render("gift/allGifts", { gifts });
  } catch (error) {
    next(error);
  }
});

//* GET gifts by user
router.get("/users/:id", async (req, res, next) => {
  try {
    const { userId } = req.params.id;
    res.render("gift/giftByUser", userId);
  } catch (error) {
    next(error);
  }
});

//* GET gifts by list
router.get("/lists/:id", async (req, res, next) => {
  try {
    const { listId } = req.params.id;
    res.render("gift/giftByList", listId);
  } catch (error) {
    next(error);
  }
});

//* GET - create a gift
router.get("/create", async (req, res, next) => {
  try {
    res.render("gift/createGift");
  } catch (error) {
    next(error);
  }
});

//* DELETE delete a gift
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { giftId } = req.params.id;
    await AlbumModel.findById(giftId);
  } catch (error) {
    rs;
    next(error);
  }
});

//* POST - Create a new gift
router.post("/create", uploader.single("picture"), async (req, res, next) => {
  const newGift = { ...req.body };
  if (!req.file) newGift.image = req.file.path;

  try {
    await GiftModel.create(newGift);
    res.redirect("gifts/users");
  } catch (error) {
    next(error);
  }
});

//* PATCH - update a given gift
router.patch("update/:id", uploader.single("cover"), async (req, res, next) => {
  const giftToUpdate = { ...req.body };
  if (!req.file) giftToUpdate.image = req.file.path;

  try {
    await GiftModel.findByIdAndUpdate(req.params.id, giftToUpdate);
    res.redirect("gifts/users");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
