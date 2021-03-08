const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const listSchema = new Schema({
  // name: type,
  name: {
    type: String,
    require: true,
  },

  lastName: {
    type: String,
    require: true,
  },
  // all fields are required : but maybe to name or last name could be optionnal

  gifts: [
    {
      type: Schema.Types.ObjectId,
      ref: "gifts",
    },
  ],
});

const ListModel = mongoose.model("lists", listSchema);
module.exports = ListModel;
