const mongoose = require("mongoose") ;
require("dotenv").config();
require("./../../config/mongo"); 
const userModel = require("./../../model/users"); 
const bcrypt = require("bcrypt");

const users = [
    {
        name: "Mélanie",
        lastName: "Féron",
        email: "melanie@wanadoo.fr",
        password: bcrypt.hashSync("1234", 10)
    },
    {
        name: "Charles",
        lastName: "Féron",
        email: "charles@wanadoo.fr",
        password: bcrypt.hashSync("12345", 10)
    },
    {
        name: "Benjamin",
        lastName: "Pinard",
        email: "benji@gmail.com",
        password: bcrypt.hashSync("123456", 10)
    }
] ;

(async function insert() {
    try {
      await userModel.deleteMany(); 
      const inserted = await userModel.insertMany(users); 
      console.log(`seed labels done : ${inserted.length} documents inserted !`);
      mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    } catch (err) {
      console.error(err);
      mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    }
}()) ;
  