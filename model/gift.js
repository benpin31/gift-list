const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const giftSchema = new Schema({
  // name: type,
  name: {
    type: String,
    require: true,
  },
  brand: String,
  picture: String,
  urls: [String],
  price: Number,
  currency: {
    type: String,
    default: "eur",
  },
  priceRemainder: {
    type: Number,
    default: 0,
  },
  comment: String,
  isFavorite: {
    type: Boolean,
    default: false,
  },
  gifters: [
    {
      name: String,
      message: String,
    },
  ],
});

const GiftModel = mongoose.model("gifts", giftSchema);
module.exports = GiftModel;
