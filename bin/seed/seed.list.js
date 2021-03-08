//* create a test data set of valid users
const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/mongo");
const ListModel = require("./../../model/list");
const GiftModel = require("./../../model/gift");

//* Define data sample
async function create() {
  const lists = [
    {
      name: "Mélanie",
      lastName: "Féron",
      gifts: await GiftModel.find({ name: "Robe midi" }),
    },
    {
      name: "Charles",
      lastName: "Féron",
      gifts: await GiftModel.find({ name: "RAPA NUI TRAIL" }),
    },
    {
      name: "Eliott",
      lastName: "Féron",
    },
    {
      name: "Félix",
      lastName: "Féron",
    },
    {
      name: "Benjamin",
      lastName: "Pinard",
      gifts: await GiftModel.find({ name: "PS5" }),
    },
  ];
  return lists;
}

async function insertLists() {
  try {
    await ListModel.deleteMany();
    const inserted = await ListModel.insertMany(await create());
    console.log(`seed Lists done : ${inserted.length} documents inserted !`);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  } catch (err) {
    console.error(err);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  }
}

insertLists();
