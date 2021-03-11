const userModel = require("./../model/user");

module.exports = async function getUserGifts(req, res, next) {
  try {
    if (req.user) {
      const user = await userModel.findById(req.user._id).populate({
        path: "lists",
        populate: {
          path: "gifts",
        },
      });
      const lists = user.lists;
      let gifts = [];
      lists.forEach((list) => (gifts = gifts.concat(list.gifts)));
      req.userGifts = [...new Set(gifts)];
      req.userLists = lists;
    }

    next();
  } catch (err) {
    next(err);
  }
};

