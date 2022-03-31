const fs = require("fs");
const { Bar, BarSchema } = require("../bar.js");
const mongoose = require("mongoose");

const sendBarsToDB = () => {
  mongoose
    .connect(
      "mongodb+srv://Setthebar:Setthebar100@cluster0.pxj0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("connected with Setthebar DB"))
    .catch((err) => console.log(err));
  let jsonBars = JSON.parse(fs.readFileSync("./allbars.json"));
  jsonBars.forEach((bar) => {
    let newArray = bar.address.split("\n");
    let newstring = "";
    let zipCode, city, country;
    newArray.forEach((element) => {
      newstring = newstring + element + " ";
      console.log(newstring);
      let lastArray = newstring.split(" ");
      let newString2 = "";
      lastArray.forEach((elemento) => {
        zipCode = lastArray[0];
        city = lastArray[1];
        country = lastArray[2];
      });
    });
    const newBar = new Bar({
      name: bar.barname,
      addressZip: zipCode,
      addressCity: city,
      addressCity: " ",
      addressNumber: " ",
      addressCountry: country,
      siteUrl: " ",
      schedule: bar.schedule,
      pictureUrl: bar.pictureUrl,
      ratings: bar.rating,
      // reviews: [] // reviewDB
    });
    newBar
      .save()
      .then((value) => {
        console.log(value);
      })
      .catch((value) => console.log(value));
  });
};

sendBarsToDB();