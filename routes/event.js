var express = require('express');
var router = express.Router();


///////////////////
// GET - all events
///////////////////

router.get("/", async (req, res, next) => {
    try {
      res.render("dashboard");
    } catch (err) {
      next(err);
    }
  });


///////////////////////////
// GET - create a new event
///////////////////////////

router.get("/create", async (req, res, next) => {
    await eventModel.create(req.body);
    res.redirect("dashboard/createEvent");
});


////////////////////////
// GET - delete an event
////////////////////////

router.get("/delete/:id", async (req, res, next) => {
    try {
      await eventModel.findByIdAndRemove(req.params.id);
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
      res.render("dashboard/eventUpdate", await eventModel.findById(req.params.id));
    } catch (err) {
      next(err);
    }
  });


module.exports = router;
