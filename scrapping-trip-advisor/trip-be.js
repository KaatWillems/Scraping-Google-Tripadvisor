const puppeteer = require('puppeteer')
const fs = require('fs')


process.setMaxListeners(Infinity);


//594 results (bars of Belgium on tripadvisor)
//const baseurl = `https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-Belgium.html`

// const baseurlList = 
// [
// 	'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-Belgium.html',
// 	'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa30-Belgium.html'
// ]

const baseurlList = 
[
'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-Belgium.html',
'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa30-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa60-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa90-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa120-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa150-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa180-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa210-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa240-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa270-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa300-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa330-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa360-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa390-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa420-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa450-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa480-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa510-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa540-Belgium.html', 'https://www.tripadvisor.com/Attractions-g188634-Activities-c20-t99-oa570-Belgium.html']

const scrapUrls = async (url) => { 
	const browser = await puppeteer.launch({headless: true})
	const page = await browser.newPage()

	await page.goto(url)


	const barURL = await page.evaluate(() => 
	

	Array.from(document.querySelectorAll('.fVbwn.cdAAV.cagLQ.eZTON a:not(.iPqaD._F.G-.ddFHE.eKwUx.btBEK.fUpii)')).map((barUrl) => 
	barUrl.href
)


)

	// const barName = await page.evaluate(() => document.querySelectorAll('.bUshh.o.csemS'))
	// console.log(barURL)

	await browser.close()

	scrapContent(barURL)
}

// const scrap = async (ref) => {
	

const createjson = async (databar) => {

	console.log(databar[databar.length-1]);

	fs.writeFile('./bars.json', JSON.stringify(databar, null, 3), err => err ? console.log(err): null); 

}

const scrapContent = async (urls) => {
	let barData = []
	

	
	// url = urls[0]
	const browser = await puppeteer.launch({headless: true})
	const page = await browser.newPage()

	for (let i = 0; i < urls.length; i++) {
		bar = {}
		
		await page.goto(urls[i])
		await page.waitForTimeout(20000)

		//bar.name = await page.evaluate(() => document.querySelector('.WlYyy.cPsXC.GeSzT').innerText.trim())
		// bar.address = await page.evaluate(() => document.querySelector('.dIDBU.MJ').innerText)  			
		// bar.siteUrl = await page.evaluate(() => document.querySelector('a.bfQwA._G.B-._S._T.c.G_.P0.ddFHE.cnvzr.bTBvn').href)
		// bar.schedule = await page.evaluate(() => document.querySelector('span.cOXcJ').innerText)  
		// 		//bar.schedule = await page.evaluate(() => document.querySelector('div.WlYyy.diXIH.dDKKM').innerText)
		// 		//bar.schedule = await page.evaluate(() => document.querySelector('.bfQwA._G.B-._S._T.c.G_.P0.ddFHE.cnvzr').href)
		// bar.pictureUrl = await page.evaluate(() => document.querySelector('.eMVst._R.w._Z.GA').style.backgroundImage) 	
		// bar.ratings = await page.evaluate(() => document.querySelector('.WlYyy.cPsXC.fksET.cMKSg').innerText) 

		

		//====FIX ISSUE OF UNDEFINDED OR NULL 
		// bar.name = await page.evaluate(() => document.querySelector('.WlYyy.cPsXC.GeSzT').innerText.trim())
		 const barNameDiv  = await page.evaluate(() => {
		 let a = document.querySelector('.WlYyy.cPsXC.GeSzT')
		 return a ? a.innerText.trim() : "no name found"
		 })

		 bar.name = barNameDiv 


		

		 const barAddressDiv = await page.evaluate(() => {
			let b = document.querySelector('.dIDBU.MJ')
			return b ? b.innerText : "no address found"
		})
		bar.address = barAddressDiv

		
		const barSiteDiv = await page.evaluate(() => {
			let c = document.querySelector('a.bfQwA._G.B-._S._T.c.G_.P0.ddFHE.cnvzr.bTBvn')
			return c ? c.href : "no site found"
		})
		bar.siteUrl = barSiteDiv


	    const barScheduleDiv = await page.evaluate(() => {
            let el = document.querySelector('.fqXry.u .cOXcJ')
            return el ? el.innerText : "no schedule found"
        })
		bar.schedule = barScheduleDiv
    
        

		const barPic = await page.evaluate(() => {
			let d = document.querySelector('.eMVst._R.w._Z.GA')
			return d ? d.style.backgroundImage : "no pic found"
		})
		bar.pictureUrl = barPic


		const barRating  = await page.evaluate(() => {
			let e = document.querySelector('.WlYyy.cPsXC.fksET.cMKSg')
			return e ? e.innerText : "no rating found"
		})
		bar.ratings = barRating

		
			// bar.pictureUrl = await page.evaluate(() => document.querySelector('.eMVst._R.w._Z.GA').style.backgroundImage) 	
		// bar.ratings = await page.evaluate(() => document.querySelector('.WlYyy.cPsXC.fksET.cMKSg').innerText) 
	
	// PUSH TO ARRAY 
	barData.push(bar)

	
		

		
	}
	

	await browser.close()
	//console.log(barData)

	
	await createjson(barData)
}



//looping over all pages: 
for (const i of baseurlList) {
    //console.log(i);
    scrapUrls(i)

}

//scrapUrls(baseurl)