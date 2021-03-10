const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const listSchema = new Schema(
  {
    // name: type,
    name: {
      type: String,
      require: true,
    },

    gifts: [
      {
        type: Schema.Types.ObjectId,
        ref: "gifts",
      },
    ],
  },
  { timestamps: true }
);

const ListModel = mongoose.model("lists", listSchema);
module.exports = ListModel;
