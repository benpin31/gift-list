const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const giftSchema = new Schema(
  {
    // name: type,
    name: {
      type: String,
      require: true,
    },
    brand: String,
    picture: String,
    url: String,
    price: Number,
    currency: {
      type: String,
      default: "eur",
    },
    priceRemainder: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
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
  },
  { timestamps: true }
);

const GiftModel = mongoose.model("gifts", giftSchema);
module.exports = GiftModel;
