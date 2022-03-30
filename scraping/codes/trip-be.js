const puppeteer = require("puppeteer");
const fs = require("fs");

process.setMaxListeners(Infinity);



let baseurlList = JSON.parse(fs.readFileSync("./urls/trip-be.json"))

const scrapUrls = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const barURL = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".fVbwn.cdAAV.cagLQ.eZTON a:not(.iPqaD._F.G-.ddFHE.eKwUx.btBEK.fUpii)"
      )
    ).map((barUrl) => barUrl.href)
  );

  await browser.close();

  scrapContent(barURL);
};

const createjson = async (databar) => {
  //function to write it all in json file - gets called on line 149

  //console.log(databar[databar.length-1]); // to console log the last url

  fs.writeFile("./bars.json", JSON.stringify(databar, null, 3), (err) =>
    err ? console.log(err) : null
  );
};

const scrapContent = async (urls) => {
  let barData = [];

  // url = urls[0]
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let i = 0; i < urls.length; i++) {
    bar = {};

    await page.goto(urls[i]);
    await page.waitForTimeout(15000);

    const barNameDiv = await page.evaluate(() => {
      let a = document.querySelector(".WlYyy.cPsXC.GeSzT");
      return a ? a.innerText.trim() : "no name found";
    });

    bar.name = barNameDiv;

    const barAddressDiv = await page.evaluate(() => {
      let b = document.querySelector(".dIDBU.MJ");
      return b ? b.innerText : "no address found";
    });
    bar.address = barAddressDiv;

    const barSiteDiv = await page.evaluate(() => {
      let c = document.querySelector(
        "a.bfQwA._G.B-._S._T.c.G_.P0.ddFHE.cnvzr.bTBvn"
      );
      return c ? c.href : "no site found";
    });
    bar.siteUrl = barSiteDiv;

    const barScheduleDiv = await page.evaluate(() => {
      let el = document.querySelector(".fqXry.u .cOXcJ");
      return el ? el.innerText : "no schedule found";
    });
    bar.schedule = barScheduleDiv;

    const barPic = await page.evaluate(() => {
      let d = document.querySelector(".eMVst._R.w._Z.GA");
      return d ? d.style.backgroundImage : "no pic found";
    });
    bar.pictureUrl = barPic;

    const barRating = await page.evaluate(() => {
      let e = document.querySelector(".WlYyy.cPsXC.fksET.cMKSg");
      return e ? e.innerText : "no rating found";
    });
    bar.ratings = barRating;

    // PUSH TO ARRAY
    barData.push(bar);
  }

  await browser.close();
  //console.log(barData) // to have everything shown in the terminal instead of jsonfile

  await createjson(barData);
};

//looping over all pages:
for (const i of baseurlList) {
  //console.log(i);
  scrapUrls(i);
}

//scrapUrls(baseurl)
