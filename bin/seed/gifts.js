const mongoose = require("mongoose") ;
require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const giftedPersonModel = require("./../../model/gifted_persons"); 
const eventModel = require("./../../model/events"); 
const giftsModel = require("./../../model/gifts"); 

async function create() {
    const giftedPerson = [
        {
            name: "PS5",
            brand: "Sony",
            picture: "https://www.playstation.com/fr-fr/ps5/",
            price: 500,
            comment: "I really really want it <3",
            isFavorite: true,
            giftedPersons: await giftedPersonModel.find({$and: [{name: "Benjamin"}, {lastName: "Pinard"}]}),
            donor: [
                {
                    name: "Papa et Maman",
                    comment: "On t'a aussi pris demon souls"
                },
                {
                    name: "Mélanie"
                }
            ],
            events: await eventModel.find({name: "Benjamin Birthday"})
        }]

    return giftedPerson ;
} ;

(async function insert() {
    try {
      await giftsModel.deleteMany(); 
      const inserted = await giftsModel.insertMany(await create()); 
      console.log(`seed labels done : ${inserted.length} documents inserted !`);
      mongoose.connection.close().then(success => console.log('WELL CLOSED')) ;
    } catch (err) {
      console.error(err);
      await mongoose.connection.close().then(success => console.log('WELL CLOSED')) ;
    }
}()) ;