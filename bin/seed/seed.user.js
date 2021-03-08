//* create a test data set of valid users
const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/mongo");
const UserModel = require("./../../model/user");
const ListModel = require("./../../model/list");
const EventModel = require("./../../model/event");
const bcrypt = require("bcryptjs");

//* Define data sample
async function create() {
  const users = [
    {
      name: "Mélanie",
      lastName: "Féron",
      email: "melanie@wanadoo.fr",
      password: bcrypt.hashSync("1234", 10),
      lists: await ListModel.find({
        $and: [
          { name: { $in: ["Mélanie", "Charles", "Félix", "Eliott"] } },
          { lastName: "Féron" },
        ],
      }),
      events: await EventModel.find({ name: "Christmas" }),
    },
    {
      name: "Charles",
      lastName: "Féron",
      email: "charles@wanadoo.fr",
      password: bcrypt.hashSync("12345", 10),
      lists: await ListModel.find({
        $and: [
          { name: { $in: ["Charles", "Félix", "Eliott"] } },
          { lastName: "Féron" },
        ],
      }),
      events: await EventModel.find({ name: "Christmas" }),
    },
    {
      name: "Benjamin",
      lastName: "Pinard",
      email: "benji@gmail.com",
      password: bcrypt.hashSync("123456", 10),
      lists: await ListModel.find({
        $and: [{ name: "Benjamin" }, { lastName: "Pinard" }],
      }),
      events: await EventModel.find({
        name: { $in: ["Christmas", "Benjamin Birthday"] },
      }),
    },
  ];
  return users;
}

async function insertUsers() {
  try {
    await UserModel.deleteMany();
    const inserted = await UserModel.insertMany(await create());
    console.log(`seed users done : ${inserted.length} documents inserted !`);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  } catch (err) {
    console.error(err);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  }
}

insertUsers();
