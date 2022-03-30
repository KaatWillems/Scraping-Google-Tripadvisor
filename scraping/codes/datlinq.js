const puppeteer = require("puppeteer");
const xpath = require("xpath");

const url = "https://dox.datlinq.com/en/public/login";

const input = {
  email: "kaat_willems@hotmail.com",
  password: "Becode100%",
};

let bars = [],
  barsQuantity,
  pageAt;


const clickBar = async (page, index) => {
  try {
    await page.waitForNetworkIdle();
  } catch (error) {
    await page.reload();
    await page.waitForNetworkIdle();
    await page.$$eval(
      ".page-link",
      (elements, pageAt) => {
        Array.from(elements).forEach((element) => {
          if (element.innerText === pageAt) {
            element.click();
          }
        });
      },
      pageAt
    );
    await page.waitForNetworkIdle();
  }
  pageAt = await page.$$eval(".active", (actives) => actives[0].innerText[0]);
  console.log(pageAt);
  let bar = {};
  try {
    await page.$$eval(
      ".cdk-row.list-management-outlets-page__table__row",
      (elements, index) => elements[index].click(),
      index
    );
  } catch (error) {
    console.log("bar button not found");
    await page.reload();
    await page.waitForNetworkIdle();
    await page.$$eval(
      ".page-link",
      (elements, pageAt) => {
        Array.from(elements).forEach((element) => {
          console.log(element.innerText + " y pageAt = " + pageAt);
          if (element.innerText === pageAt) {
            element.click();
          }
        });
      },
      pageAt
    );

    await page.waitForNetworkIdle();
    await page.$$eval(
      ".cdk-row.list-management-outlets-page__table__row",
      (elements, index) => elements[index].click(),
      index
    );
  }
  await page.waitForNetworkIdle();
  try {
    await page.$$eval(".btn.btn-outline-primary.btn-sm", (elements) =>
      elements[0].click()
    );
  } catch (error) {
    console.log("detail button not found");
    await page.reload();
    await page.waitForNetworkIdle();
    await page.$$eval(
      ".page-link",
      (elements, pageAt) => {
        Array.from(elements).forEach((element) => {
          if (element.innerText === pageAt) {
            element.click();
          }
        });
      },
      pageAt
    );
    await page.waitForNetworkIdle();
    await page.$$eval(".cdk-row", (rows, index) => rows[index].click(), index);
    await page.waitForNetworkIdle();
    await page.$$eval(".btn.btn-outline-primary.btn-sm", (elements) =>
      elements[0].click()
    );
  }

  await page.waitForNetworkIdle();
  bar.barname = await page.$$eval(
    ".outlet-name",
    (elements) => elements[0].innerText
  );
  bar.address = await page.$$eval(
    ".address",
    (elements) => elements[1].innerText
  );
  try {
    await page.$$eval(".expansion-panel-tittle-container", (elements) =>
      elements[0].click()
    );
    await page.waitForNetworkIdle();
    const openingHours = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".opening-days-hours")).map((day) =>
        Array.from(day.children).map((real) => real.innerText)
      )
    );
    let schedule = "";
    openingHours.forEach((day) => {
      day.forEach((yeap) => {
        schedule = schedule + yeap + " ";
      });
    });
    bar.schedule = schedule;
  } catch (error) {
    bar.schedule = "none";
  }
  try {
    bar.pictureUrl = await page.$$eval("img", (elements) => elements[14].src);
  } catch (error) {
    bar.pictureUrl = "none";
  }
  bar.rating = await page.$$eval(
    ".option-bold.pl-1",
    (elements) => elements[0].innerText
  );
  bars.push(bar);
  console.log(bar);
  await page.goto(
    `https://dox.datlinq.com/en/list-management/2250/outlets?limit=25&page=1`
  );
  await page.waitForTimeout("3000");

  try {
    await page.$$eval(
      ".page-link",
      (elements, pageAt) => {
        Array.from(elements).forEach((element) => {
          if (element.innerText === pageAt) {
            element.click();
          }
        });
      },
      pageAt
    );
  } catch (error) {
    console.log("page button not found");
    await page.reload();
    await page.waitForNetworkIdle();
    await page.$$eval(
      ".page-link",
      (elements, pageAt) => {
        Array.from(elements).forEach((element) => {
          if (element.innerText === pageAt) {
            element.click();
          }
        });
      },
      pageAt
    );
  }
};

const scrapDatlinq = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForNavigation();
  await page.type("#email", input.email);
  await page.type("#password", input.password);
  await page.click(".w-100");
  await page.waitForNavigation();
  await page.$$eval(".dat-tab", (elements) => elements[3].click());
  await page.waitForNavigation();
  await page.waitForNavigation();
  await page.$$eval(".gallery-item--title", (elements) => elements[2].click());
  await page.waitForNavigation();
  // let string = await page.$$eval(
  //   ".text-muted.font-weight-bold.pl-2",
  //   (elements) => elements[0].innerText
  // );

  // await page.waitForTimeout("2000");
  // let newTable = string.split(" ");
  // barsQuantity = parseInt(newTable[5]);
  barsQuantity = 200

  for (let index = 0; index < 26; index++) {
    console.log("Bar I'm targeting = " + index);
    await clickBar(page, index);
    console.log("Bars Collected = " + bars.length);
    if (index === 24) {
      await page.waitForTimeout("1000");
      await page.$$eval(".page-link", (elements) => elements[11].click());
      index = -1;
    }
    if (bars.length === barsQuantity) {
      index = 25;
      await browser.close()
      return bars
    }
  }
};

module.exports = { scrapDatlinq };
