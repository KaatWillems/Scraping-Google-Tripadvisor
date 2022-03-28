
const puppeteer = require('puppeteer')

let hnp = true

// parse

async function parsePlaces(page) {
    let places = [];

	const elements = await page.$$('.gm2-subtitle-alt-1 span')
    // const adress = await page.$$('span[jstcache="79"][jsinstance="*1"]')


    if (elements && elements.length) {
        for (const el of elements) 	{
            const name = await el.evaluate(span => span.textContent);
            
            places.push({ name })
       }
   }
   return places;

}

// stop the loop

async function hasNextPage(page) {
    // const element = await page.$('button[aria-label=" Next page "]');
    // console.log("tessttttt last page")
    await page.waitForTimeout(3000)
    const element = await page.evaluate(() =>  {
       el =  document.querySelectorAll('button[aria-label="Page suivante"]')[2]
       if(el){
        eldis = el.getAttribute('disabled')
        return eldis
       }else{
           return false
       } 
       
    });
    // if (!element) {
    //     throw new Error('Next page element is not found');
    // }
    console.log(element)
    // const disabled = element.getAttribute('disabled')
    if (element != null) {
        console.log('The next page button is disabled');
        hnp = false
    }
} 

  



//scroll function

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 300;
            var timer = setInterval(() => {
				const element = document.querySelectorAll('.section-scrollbox')[1];
				var scrollHeight = element.scrollHeight;
				element.scrollBy(0, distance);
				totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

// page suiavnt

async function goToNextPage(page) {
    await page.$$eval('.hV1iCc-icon', (elements) => elements[1].click())
    // await page.$$(('button[aria-label="Page suivante"]')[2]).click;
    // await page.$$('button[aria-label="Page suivante"]')[2].click()
    // await page.evaluate(() => {document.querySelectorAll('button[aria-label="Page suivante"]')[2].click(); });
    await page.waitForNavigation()
}


async function Scraping() {
    console.log('scrapping...');

	const browser = await puppeteer.launch({headless: false})
	const page = await browser.newPage();
	await page.goto('https://www.google.be/maps/search/bar+belgium/@50.8429293,4.3485584,14z/data=!3m1!4b1');
	await page.$$eval('.VfPpkd-vQzf8d', (elements) => elements[3].click())
	await page.waitForNavigation()
    let places = [];
        do {
            
            await autoScroll(page) 
            await autoScroll(page) 
            await autoScroll(page) 
            
            places = places.concat(await parsePlaces(page)); 
            
            console.log('Parsed' + places.length + 'places')

            await goToNextPage(page)
            await page.waitForTimeout('300')
            hasNextPage(page)

        } while (hnp);
        
        console.log(places);


 



} 

Scraping()