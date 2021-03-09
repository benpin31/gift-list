var express = require('express');
var router = express.Router();
var eventModel = require('./../model/event')

///////////////////
// GET - all events
///////////////////

// const list = await listModel.findById(req.params.id).populate("gifts") ;

router.get("/", async (req, res,next) => {
    
    try {
        const event = eventModel.find().populate("gifts");
        res.render("dashboard", {event} );
    } catch (err) {
      next(err);
    }
  });
    
///////////////////////////
// GET - create a new event
///////////////////////////

router.get("/create", async (req, res, next) => {
  try {
    await eventModel.create(req.body);
    res.redirect("dashboard/createEvent");
  } catch (err) {
    next(err);
  }
});


////////////////////////
// GET - delete an event
////////////////////////

router.get("/delete/:id", async (req, res, next) => {
    try {
      await eventModel.findOneAndRemove(req.params.id);
      res.redirect("/dashboard");
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


module.exports = router;
