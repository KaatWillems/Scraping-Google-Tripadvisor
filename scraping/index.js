const { scrapGoogle } = require("./codes/google");
const { scrapDatlinq } = require("./codes/datlinq");
const fs = require("fs");

// GOOGLE

const writeBars = async () => {
  console.log("Scrapping google...");
  let googleBars = await scrapGoogle();
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

  console.log("Scrapping datlinq...");

  // it will only save 200 bars because it only goes until the page 8 and then it bugs
  let datLinqBars = await scrapDatlinq();
  fs.writeFile(
    "./pre-data/datlinq-bars.json",
    JSON.stringify(datLinqBars),
    (err) => {
      if (err) console.log(err);
      else {
        console.log("Datlinq Bars saved succesfully\n");
        console.log("The written has the following contents:");
        console.log(
          JSON.parse(fs.readFileSync("./pre-data/datlinq-bars.json"))
        );
      }
    }
  );
};

const sendToDB = async () => {
    await writeBars()
    let allBars = []
    let googleBars = JSON.parse(fs.readFileSync("./pre-data/google-bars.json"))
    googleBars.forEach(bar => {
        allBars.push(bar)
    });
    let datlinqBars = JSON.parse(fs.readFileSync("./pre-data/datlinq-bars.json"))
    datlinqBars.forEach(bar => {
        allBars.push(bar)
    });
    // here we send all the data to the database
    // for now we will write it in a json file
    fs.writeFile(
        "./pre-data/allbars.json",
        JSON.stringify(allBars),
        (err) => {
          if (err) console.log(err);
          else {
            console.log("All Bars saved succesfully\n");
            console.log("The written has the following contents:");
            console.log(
              JSON.parse(fs.readFileSync("./pre-data/allbars.json"))
            );
          }
        }
      );
}

// CALL MAIN FUNCTION

sendToDB()
