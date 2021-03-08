const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftedPersonsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  lastName: {
    type: String,
    require: true,
  },
  // all fields are required : but maybe to name or last name could be optionnal

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const giftedPersonsModel = mongoose.model("gifted_persons", giftedPersonsSchema);

module.exports = giftedPersonsModel;
