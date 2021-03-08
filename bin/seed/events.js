const mongoose = require("mongoose") ;
require("dotenv").config();
require("./../../config/mongo"); 
const eventModel = require("./../../model/events"); 
const userModel = require("./../../model/users"); 

async function create() {
    const event = [
        {
            name: "Christmas",
            date: "2021-12-25",
            description: "oh oh oh !!!!",
            users: await userModel.find({$and: [{name: {$in: ["Mélanie", "Charles"]}}, {lastName: "Féron"}]})
        },
        {
            name: "Benjamin Birthday",
            date: "2021-05-14",
            description: "I wan't a ps5",
            users: await userModel.find({name: "Benjamin"})
        }
    ] ;
    return event ;
} ;

(async function insert() {
    try {
      await eventModel.deleteMany(); 
      const inserted = await eventModel.insertMany(await create()); 
      console.log(`seed labels done : ${inserted.length} documents inserted !`);
      mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    } catch (err) {
      console.error(err);
      mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    }
}()) ;
  