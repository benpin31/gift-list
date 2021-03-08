const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel;
