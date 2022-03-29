const {Scraping} = require('./codes/google');
const {scrapBars} = require('./codes/datlinq');
const fs = require("fs");





// fs.writeFile("./urls/trip-be.json", JSON.stringify(baseurlList), (err) => {
//     if (err)
//       console.log(err);
//     else {
//       console.log("File written successfully\n");
//       console.log("The written has the following contents:");
//       console.log(fs.readFileSync("./urls/trip-be.json", "utf8"));
//     }
//   });