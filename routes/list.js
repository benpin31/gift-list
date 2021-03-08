let express = require('express');
let router = express.Router();
const listModel = require("./../model/lists"); 

router.get('/list/:id', async function(req, res, next) {
  // id is the list id
  try {
    const list = await listModel.findById(req.params.id).populate("gifts") ;
    res.render("/list", {list})

  } catch(err) {
    next(err) ;
  }

});

router.get('/list/create/:id', async function(req, res, next) {
    // id is current user id
  try {
    const user = await userModel.findById(req.params.id).populate("lists") ;
    const lists = user.lists ;
    
    res.render("/list", {lists})
  
    res.json(gifts);
  } catch(err) {
    next(err) ;
  }

});

module.exports = router;
