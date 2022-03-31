const puppeteer = require("puppeteer");

let bars = [],
  quantity,
  counter = 0;

const selectBar = async (page) => {
  let bar = {};
  try {
    bar.barname = await page.$$eval(
      ".x3AX1-LfntMc-header-title-title",
      (elements) => elements[0].innerText
    );
  } catch (error) {
    console.log("no name found");
    bar.barname = "";
  }
  try {
    bar.address = await page.$$eval(
      ".AeaXub",
      (elements) => elements[0].innerText
    );
  } catch (error) {
    console.log("no address found");
    bar.address = "";
  }
  try {
    await page.$$eval(".LJKBpe-open-R86cEd-LgbsSe-qwU8Me", (elements) =>
      elements[0].click()
    );
    await page.waitForTimeout("1000");
    try {
      let newstring = await page.$$eval(
        ".Nbhszb-haAclf",
        (elements) =>
          elements[0].parentElement.parentElement.children[1].children[0]
            .children[0].innerText
      );
      let newarray = newstring.split("\n");
      let newstring2 = "";
      newarray.forEach((element) => {
        newstring2 = newstring2 + element;
      });
      let newarray2 = newstring2.split("\t");
      let finalstring = "";
      newarray2.forEach((element) => {
        finalstring = finalstring + element + " ";
      });
      bar.schedule = finalstring;
    } catch (error) {
      console.log("no schedule found");
      bar.schedule = "";
    }
  } catch (error) {
    console.log("schedule click error");
    bar.schedule = "";
  }
  try {
    bar.pictureUrl = await page.$$eval("img", (elements) => elements[8].src);
  } catch (error) {
    console.log("no img found");
    bar.pictureUrl = "";
  }

  try {
    bar.rating = await page.$$eval(
      ".aMPvhf-fI6EEc-KVuj8d",
      (elements) => elements[0].innerText
    );
  } catch (error) {
    console.log("no rating found");
    bar.rating = "";
  }
  bars.push(bar);
  await page.close();
};

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 300;
      var timer = setInterval(() => {
        const element = document.querySelectorAll(".section-scrollbox")[1];
        var scrollHeight = element.scrollHeight;
        element.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

const newPage = async (i, browser, page) => {
  const page1 = await browser.newPage();
  let newUrl = await page.$$eval(
    ".V0h1Ob-haAclf",
    (elements, i) => elements[i].children[0].href,
    i
  );
  await page1.goto(newUrl);
  try {
    await page1.waitForNavigation();
  } catch (error) {
    await page1.reload();
    await page1.waitForNavigation();
  }
  await selectBar(page1);
};

const clickBars = async (browser, page) => {
  for (let i = 0; i < 20; i++) {
    await newPage(i, browser, page);
    await page.waitForTimeout("1000");
    if (i === 19) {
      try {
        await page.$$eval(".hV1iCc", (elements) => elements[1].click());
        await page.waitForTimeout("2000");
        console.log('bars collected = ' + bars.length)
        i = -1
      } catch (error) {
          console.log('final bars = ' + bars.length)
      }
    }
  }
};

const selectingGoogle = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.google.be/maps/search/bar+belgium/@50.8429293,4.3485584,14z/data=!3m1!4b1%27"
  );
  await page.$$eval(".VfPpkd-vQzf8d", (elements) => elements[3].click());
  await page.waitForNavigation();
  await autoScroll(page);
  await autoScroll(page);
  await autoScroll(page);
  await page.waitForTimeout("2000");clickBars(browser, page);
  //   if (counter === 20) {
  //       console.log('yes')
  //     await page.$$eval(".hV1iCc", (elements) => elements[1].click());
  //     await page.waitForTimeout("2000");
  //     counter = 0;
  //     clickBars(browser, page);
  //   } else {
  //     clickBars(browser, page);
  //   }

  //   for (let i = 18; i < quantity; i++) {
  //     console.log(i);
  //     console.log(quantity);
  //     await selectBar(page, i);
  //     if (i === 19) {
  //       await autoScroll(page);
  //       await autoScroll(page);
  //       await autoScroll(page);
  //       try {
  //         await page.$$eval(".hV1iCc", (elements) => elements[1].click());
  //         await page.waitForTimeout('3000')
  //         i = -1;
  //       } catch (error) {
  //         i = 19;
  //       }
  //     }
  //   }
};

selectingGoogle();
