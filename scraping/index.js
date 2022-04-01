const { scrapGoogle } = require("./codes/google");
const { scrapDatlinq } = require("./codes/datlinq");
const fs = require("fs");

const writeBars = async (googleBars) => {
  // console.log("Scrapping google...");
  // let googleBars = await scrapGoogle();
  fs.writeFile(
    "./pre-data/google-bars.json",
    JSON.stringify(googleBars),
    (err) => {
      if (err) console.log(err);
      else {
        console.log("Google Bars saved succesfully\n");
        console.log("The written has the following contents:");
        console.log(JSON.parse(fs.readFileSync("./pre-data/google-bars.json")));
      }
    }
  );
  // console.log("Scrapping datlinq...");
  // let datLinqBars = await scrapDatlinq();
  // fs.writeFile(
  //   "./pre-data/datlinq-bars.json",
  //   JSON.stringify(datLinqBars),
  //   (err) => {
  //     if (err) console.log(err);
  //     else {
  //       console.log("Datlinq Bars saved succesfully\n");
  //       console.log("The written has the following contents:");
  //       console.log(
  //         JSON.parse(fs.readFileSync("./pre-data/datlinq-bars.json"))
  //       );
  //     }
  //   }
  // );
};

const handleBars = () => {
  let googleBars = JSON.parse(fs.readFileSync("./pre-data/google-bars.json"));
  googleBars.forEach((bar) => {
    let newArray = bar.address.split(" "),
      newstring = "";
    for (let index = 0; index < newArray.length; index++) {
      const element = newArray[index];
      if (element != "") {
        if (element === newArray.slice(-1)) {
          newstring = newstring + element;
        } else {
          newstring = newstring + element + " ";
        }
      }
    }
    let lastArray = newstring.split(""),
      laststring = "";
      lastArray.pop()
    lastArray.forEach((word) => {
      laststring = laststring + word
    });
    bar.address = laststring + " Belgium"
  });
  writeBars(googleBars)
};


const sendToApp = async () => {
  let allBars = [];
  let googleBars = JSON.parse(fs.readFileSync("./pre-data/google-bars.json"))
  googleBars.forEach(bar => {
      allBars.push(bar)
  });
  // let datlinqBars = JSON.parse(fs.readFileSync("./pre-data/datlinq-bars.json"));
  // datlinqBars.forEach((bar) => {
  //   allBars.push(bar);
  // });
  fs.writeFile(
    "../app_setup/models/bars/allbars.json",
    JSON.stringify(allBars),
    (err) => {
      if (err) console.log(err);
      else {
        console.log("All Bars saved succesfully\n");
        console.log("The written has the following contents:");
        console.log(
          JSON.parse(fs.readFileSync("../app_setup/models/bars/allbars.json"))
        );
      }
    }
  );
};

// CALL MAIN FUNCTION
sendToApp()