const puppeteer = require("puppeteer");
const fs = require("fs");

process.setMaxListeners(Infinity);

const baseurlList = [
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa30-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa60-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa90-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa120-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa150-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa180-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa210-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa240-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa270-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa300-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa330-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa360-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa390-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa420-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa450-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa480-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa510-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa540-Belgium.html",
  "https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa570-Belgium.html",
];

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
  console.log(databar[databar.length - 1]);

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
    await page.waitForTimeout(20000);

    //====FIX ISSUE OF UNDEFINDED OR NULL
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

  await createjson(barData);
};

for (const i of baseurlList) {
  scrapUrls(i);
}
