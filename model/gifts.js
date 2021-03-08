const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  // gift description
  name: {
    type: String,
    require: true,
  },
  brand: String,
  picture: String,
  price: Number,
  currency: {
    type: String,
    default: "eur"
  },
  priceRemainder: {
    type: Number,
    default: 0
  },
  comment: String,
  isFavorite: {
    type: Boolean,
    default: false
  },

  // for who(s) ?
  giftedPersons: [
    {
      type: Schema.Types.ObjectId,
      ref: "gifted_persons",
    }
  ],

  // Who took it
  donor : [
    {
      name: String,
      comment: String
    }
  ],

  // what event(s) ?
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "events",
    }
  ]
  
});

const giftModel = mongoose.model("gifts", giftSchema);

module.exports = giftModel;
