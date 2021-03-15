const express = require("express");
const router = express.Router();
const eventModel = require("./../model/event");
const listsModel = require("./../model/list.js");
const GiftModel = require("./../model/gift"); //Path to GiftModel
const getUserGifts = require("./../middleware/userGift");
const userModel = require("./../model/user");
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middleware/protectRoute");
const { findById } = require("./../model/user");
const dateFormat = require("dateformat");



///////////////////
// GET - all events
///////////////////

// const list = await listModel.findById(req.params.id).populate("gifts") ;

router.get("/", protectPrivateRoute, async (req, res,next) => {
    
    try {
      // console.log("totototoottoo" , req.user)
      const user = await userModel
          .findById(req.user._id)
          .populate("events");
      res.render("events", { events: user.events });
    } catch (err) {
      next(err);
    }

});
    
///////////////////////////
// GET - create a new event
///////////////////////////

router.get("/create", protectPrivateRoute, async (req, res, next) => {
  try {
    // await eventModel.create(req.body);
    const user = await userModel.findById(req.user._id).populate("lists");
    res.render("createEvent", { lists:user.lists });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const {name, date, description, lists} = req.body ;
    const newEvent = await eventModel.create({name, date, description, lists}) ;
    const user = await userModel.findById(req.user._id);
    const userEvents = user.events;
    userEvents.push(newEvent._id);
    await userModel.findByIdAndUpdate(req.user._id, { events: userEvents });
    res.redirect("/events")

  } catch(err) {
    next(err)
  }
});

////////////////////////
// GET - delete an event
////////////////////////

router.get("/delete/:id", protectPrivateRoute, async (req, res, next) => {
  try {
    await eventModel.findByIdAndRemove(req.params.id);
    res.redirect("/events");
  } catch (err) {
    next(err);
  }
});

////////////////////////
// GET - update an event
////////////////////////

router.get("/update/:id", protectPrivateRoute, async (req, res, next) => {
  try {
    const event = await eventModel.findById(req.params.id)
    if(event.date) {
      event.truncdate = dateFormat(event.date, "yyyy-mm-dd") ;
    }
    res.render("eventUpdate", {event});
  } catch (err) {
    next(err);
  }
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const {name, description, date} = req.body ;
    await eventModel.findByIdAndUpdate(req.params.id, {name, description, date})
    res.redirect("/events");
  } catch (err) {
    next(err);
  }
});

/////////////////////////
// ADD list to an event
/////////////////////////

router.post("/addlist/:id", async (req, res, next) => {
  try {
    await eventModel
      .findById(req.params.id)
      .update({ $addToSet: { lists: req.body.list } });
    res.redirect("/events/" + req.params.id);
  } catch (err) {
    next(err);
  }
});

/////////////////////////
//  ADD event to a user
/////////////////////////

router.post("/addToUser/:id", async function (req, res, next) {
  // id is the list id
  try {
    await userModel
      .find({ email: req.body.email })
      .update({ $addToSet: { events: req.params.id } });
    res.redirect("/events/" + req.params.id);
  } catch (err) {
    next(err);
  }
});

//////////////////////////////
// book gift
//////////////////////////////

//* GET - book a gift
router.get("/:idEvent/book/:idGift", async (req, res, next) => {
  try {
    const giftToBook = await GiftModel.findById(req.params.idGift);
    res.render("giftBook", { gift: giftToBook, eventId: req.params.idEvent });
  } catch (error) {
    next(error);
  }
});

//* POST - book a given gift
router.post("/:idEvent/book/:idGift", uploader.single("cover"), async (req, res, next) => {
  const { name, message } = req.body;
  const gifters = [{ name, message }];
  try {
    const updatedGift = await GiftModel.findByIdAndUpdate(
      req.params.idGift,
      { isAvailable: false, gifters },
      { new: true }
    );
    res.redirect("/events/"+req.params.idEvent);
  } catch (error) {
    next(error);
  }
});

/////////////////////////
// Specific event
/////////////////////////

router.get("/:id", getUserGifts, async (req, res, next) => {
  try {
    let event ;
    // const availableField = req.query.isAvailable ? "isAvailable" : "other";
    const priceField = req.query.price ? "price" : "other";

    // const isAvailable = req.query.isAvailable ? true : false;
    const priceOrder = req.query.price ;

    if(req.query.isAvailable) {
      event = await eventModel.findById(req.params.id).populate({
        path: "lists",
        populate: {
          path: "gifts",
          match: {isAvailable: true},
          options: { sort: { [priceField]: priceOrder } }
        },
      });
    } else {
      event = await eventModel.findById(req.params.id).populate({
        path: "lists",
        populate: {
          path: "gifts",
          options: { sort: { [priceField]: priceOrder } }
        },
      });    
    }

    let isConnected = false;
    if (req.user) {
      isConnected= (await userModel.find({$and: [{_id: req.user._id}, {events: {$in: [req.params.id]}}]})).length > 0
    }

    res.render("event", {event, lists: req.userLists, isConnected: isConnected});
  } catch(err) {
    next(err)
  }
});

module.exports = router;
