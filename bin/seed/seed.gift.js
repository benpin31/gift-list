//* create a test data set of valid users
const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const ListModel = require("./../../model/list");
const GiftModel = require("./../../model/gift");

//* Define data sample
const gifts = [
  {
    name: "PS5",
    brand: "Sony",
    picture:
      "https://www.playstation.https://blog.fr.playstation.com/tachyon/sites/10/2020/11/Featured-Image-PS5-preorder-update.jpg?resize=1088,612&crop_strategy=smart/fr-fr/ps5/",
    urls: [
      "https://fr.shopping.rakuten.com/offer/buy/5478214186/console-sony-ps5-edition-digital.html?bbaid=7729910695&t=180175&ptnrid=s_dc|pcrid|53440822523|pkw||pmt||ptaid|pla-982069145471|pgrid|14467372643|&gclid=Cj0KCQiAs5eCBhCBARIsAEhk4r55oDsi-Sou7IbkAPma1SWRqOgbEeflq8pZRqLyNA4P8J5FXD7oGkIaAjNhEALw_wcB",
    ],
    price: 500,
    comment: "I really really want it <3",
    isFavorite: true,
    gifters: [
      {
        name: "Papa et Maman",
        message: "On t'a aussi pris demon souls",
      },
      {
        name: "Mélanie",
      },
    ],
  },
  {
    name: "RAPA NUI TRAIL",
    brand: "Hoka One One",
    picture:
      "https://www.lepape.com/media/catalog/product/cache/4162369c3254ba374995714f35d9d344/3/0/30108022-CCYB_0_1.jpg",
    urls: [
      "https://www.lepape.com/hoka-one-one-rapa-nui-trail-jaune-bleu-homme",
    ],
    price: 130,
    comment: "Colour does not matter",
    isFavorite: false,
    gifters: [
      {
        name: "Beau-papa & belle-maman",
        message: "On te met au défi de courrir 400 km dans l'année",
      },
    ],
  },
  {
    name: "Robe midi",
    brand: "Claudie PIERLOT",
    picture:
      "https://fr.claudiepierlot.com/dw/image/v2/BCND_PRD/on/demandware.static/-/Sites-claudie-catalog-master-H13/default/dw0c1fb109/images/preAH15/Claudie_CFPRO01122-K009_H_2.jpg?sw=800&sh=1173&cx=0&cy=0&cw=1255&ch=1840",
    urls: [
      "https://fr.claudiepierlot.com/fr/categories/robes-2/221rosemary/CFPRO01122.html?dwvar_CFPRO01122_color=K009#start=1",
    ],
    price: 500,
    comment: "Size 34",
    isFavorite: true,
    gifters: [
      {
        name: "Papa et Maman",
        message: "Looking forward to the summer",
      },
      {
        name: "Benjamin",
      },
    ],
  },
];

async function insertGifts() {
  try {
    await GiftModel.deleteMany();
    const inserted = await GiftModel.insertMany(gifts);
    console.log(`seed gifts done : ${inserted.length} documents inserted !`);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  } catch (err) {
    console.error(err);
    mongoose.connection.close().then((success) => console.log("WELL CLOSED"));
  }
}

insertGifts(gifts);
