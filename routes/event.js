const express = require('express');
const router = express.Router();
const eventModel = require('./../model/event')
const listsModel = require('./../model/list.js')
const GiftModel = require("./../model/gift"); //Path to GiftModel
const getUserGifts = require("./../middleware/userGift");
const userModel = require("./../model/user")
const uploader = require("./../config/cloudinary");



///////////////////
// GET - all events
///////////////////

// const list = await listModel.findById(req.params.id).populate("gifts") ;

router.get("/", async (req, res,next) => {
    
    try {
      const user = await userModel
          .findById(req.app.locals.userId)
          .populate("events");
      console.log(user)
      res.render("events", { events: user.events });
        // const event = await eventModel.find();
        // res.render("events", {event} );
    } catch (err) {
      next(err);
    }

});

router.get
    
///////////////////////////
// GET - create a new event
///////////////////////////

router.get("/create", async (req, res, next) => {
  try {
    // await eventModel.create(req.body);
    const lists = await listsModel.find() ;
    res.render("createEvent", {lists}) ;
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const {name, date, description, lists} = req.body ;
    const newEvent = await eventModel.create({name, date, description, lists}) ;
    const user = await userModel.findById(req.app.locals.userId);
    const userEvents = user.events;
    userEvents.push(newEvent._id);
    await userModel.findByIdAndUpdate(req.app.locals.userId, { events: userEvents });
    res.redirect("/events")

  } catch(err) {
    next(err)
  }
})


////////////////////////
// GET - delete an event
////////////////////////

router.get("/delete/:id", async (req, res, next) => {
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

router.get("/update/:id", async (req, res, next) => {
    try {
      await eventModel.findById(req.params.id);
      res.render("dashboard/eventUpdate");
    } catch (err) {
      next(err);
    }
  });

/////////////////////////
// ADD list to an event
/////////////////////////

router.post("/addlist/:id", async (req, res, next) => {
  try {
    await eventModel.findById(req.params.id) 
      .update({$addToSet: { lists: req.body.list}}) ;
    res.redirect("/events/"+req.params.id)
  } catch(err) {
    next(err)
  }
})

/////////////////////////
//  ADD event to a user
/////////////////////////

router.post('/addToUser/:id', async function(req, res, next) {
  // id is the list id
  try {
    await userModel.find({email: req.body.email}) 
      .update({$addToSet: { events: req.params.id}}) ;
    res.redirect("/events/"+req.params.id)
  } catch(err) {
    next(err)
  }
})

//////////////////////////////
// book gift
//////////////////////////////

//* GET - book a gift
router.get("/:idEvent/book/:idGift", async (req, res, next) => {
  try {
    const giftToBook = await GiftModel.findById(req.params.idGift);
    res.render("giftBook", { gift: giftToBook , eventId: req.params.idEvent});
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
    console.log(updatedGift)
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
    const event = await eventModel.findById(req.params.id).populate({
      path: "lists",
      populate: {
        path: "gifts",
      },
    });
    console.log("event" , event.lists)
    res.render("event", {event, lists: req.userLists}) ;
  } catch(err) {
    next(err)
  }
})



module.exports = router;
