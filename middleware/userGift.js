const userModel = require("./../model/user");

module.exports = async function getUserGifts(req, res, next) {
  try {
    const user = await userModel.findById(req.app.locals.userId).populate({
      path: "list",
      populate: {
        path: "gifts",
      },
    });
    const lists = user.lists;
    let gifts = [];
    lists.forEach((list) => (gifts = gifts.concat(list.gifts)));
    req.userGifts = [...new Set(gifts)];
    next();
  } catch (err) {
    next(err);
  }
};
