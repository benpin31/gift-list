const mongoose = require("mongoose") ;
require("dotenv").config();
require("./../../config/mongo"); 
const giftedPersonModel = require("./../../model/gifted_persons"); 
const userModel = require("./../../model/users");

async function create() {
    const giftedPerson = [
        {
            name: "Mélanie",
            lastName: "Féron",
            users: await userModel.find({$and: [{name: "Mélanie"}, {lastName: "Féron"}]})
        },
        {
            name: "Charles",
            lastName: "Féron",
            users: await userModel.find({$and: [{name: "Charles"}, {lastName: "Féron"}]})
        },
        {
            name: "Eliott",
            lastName: "Féron",
            users: await userModel.find({$and: [{name: {$in: ["Mélanie", "Charles"]}}, {lastName: "Féron"}]})
        },
        {
            name: "Félix",
            lastName: "Féron",
            users: await userModel.find({$and: [{name: {$in: ["Mélanie", "Charles"]}}, {lastName: "Féron"}]})
        },
        {
            name: "Benjamin",
            lastName: "Pinard",
            users: await userModel.find({$and: [{name: "Benjamin"}, {lastName: "Pinard"}]})
        }
    ] ;
    return giftedPerson ;
} ;

(async function insert() {
    try {
      await giftedPersonModel.deleteMany(); 
      const inserted = await giftedPersonModel.insertMany(await create()); 
      console.log(`seed labels done : ${inserted.length} documents inserted !`);
      mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    } catch (err) {
      console.error(err);
      mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    }
}()) ;
  