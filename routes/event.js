const express = require('express');
const router = express.Router();
const eventModel = require('./../model/event')
const listsModel = require('./../model/list.js')
const giftsModel = require('./../model/gift.js')
const getUserGifts = require("./../middleware/userGift");
const userModel = require("./../model/user")


///////////////////
// GET - all events
///////////////////

// const list = await listModel.findById(req.params.id).populate("gifts") ;

router.get("/", async (req, res,next) => {
    
    try {
        const event = await eventModel.find();
        res.render("events", {event} );
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
    const {name, date, description, lists} = req.body
    await eventModel.create({name, date, description, lists})
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
      await eventModel.findOneAndRemove(req.params.id);
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
      .update({$addToSet: { lists: req.params.id}}) ;
    res.redirect("/events/"+req.params.id)
  } catch(err) {
    next(err)
  }
})

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
    res.render("event", {event, lists: req.userLists}) ;
  } catch(err) {
    next(err)
  }
})



module.exports = router;
