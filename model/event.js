const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    require: true,
  },

  description: String,

  gifts: [
    {
      type: Schema.Types.ObjectId,
      ref: "gifts",
    },
  ],
});

const EventModel = mongoose.model("events", eventSchema);
module.exports = EventModel;
