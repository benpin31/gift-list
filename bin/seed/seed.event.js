//* create a test data set of valid users
const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/mongo");
const EventModel = require("./../../model/event");
const GiftModel = require("./../../model/gift");

//* Define data sample
async function create() {
  const events = [
    {
      name: "Christmas",
      date: "2021-12-25",
      description: "oh oh oh !!!!",
      gifts: await GiftModel.find({
        $or: [
          { name: "Robe midi" },
          { name: "RAPA NUI TRAIL" },
          { name: "PS5" },
        ],
      }),
    },
    {
      name: "Benjamin Birthday",
      date: "2021-05-14",
      description: "I wan't a ps5",
      gifts: await GiftModel.find({ name: "PS5" }),
    },
  ];
  return events;
}

async function insertEvents() {
  try {
    await EventModel.deleteMany();
    const inserted = await EventModel.insertMany(await create());
    console.log(`seed Events done : ${inserted.length} documents inserted !`);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  } catch (err) {
    console.error(err);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  }
}

insertEvents();
