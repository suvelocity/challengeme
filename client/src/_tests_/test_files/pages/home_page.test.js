const puppeteer = require('puppeteer');
const nock = require('nock');
const useNock = require('nock-puppeteer');



const cookies = [{
    'name': 'isAdmin',
    'value': 'admin'
  },{
    'name': 'userName',
    'value': 'suvelocity'
  },{
    'name': 'accessToken',
    'value': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoic3V2ZWxvY2l0eSIsImlhdCI6MTYwNDU3MzI5MSwiZXhwIjoxNjA0NTc0MTkxfQ.dhzCg4d2WTaCKlwV4vtN2PDvlipZQ_LGpMPYjSkjrOM'
  },{
    'name': 'refreshToken',
    'value': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoic3V2ZWxvY2l0eSIsImlhdCI6MTYwNDU3MzI5MSwiZXhwIjoxNjA0NjU5NjkxfQ.C-88r1p3hTDcvfVSSiK9E0YTnpxviZg4eGEHWeB6an0'
  },{
    'name': 'name',
    'value': 'cyber4S'
  }];

jest.setTimeout(15000);
describe("All the routes are working together", () => {
let page;
let browser;
	beforeEach(async () => {
		//open a chromium browser
		browser = await puppeteer.launch({slowMo: 45, headless: false});
		//open a new page within that browser
        page = await browser.newPage();
        await page.goto("http://localhost:3000")
        await page.setCookie(...cookies);
		const screenSize = {
			width: 1280,
			height: 768,
		  };
		await page.setViewport(screenSize);
	});
	afterAll(async () => {
		//close the chromium after each test
		await browser.close();
	});

	test("Insight component can be reached by click on the insight icon, and display the charts", async () => {
        await page.goto("http://localhost:3000")
        await page.waitForSelector('.header-link-title')
        let pageTitle = await page.$('.header-link-title');
        let pageTitleValue = await (await pageTitle.getProperty('innerText')).jsonValue();
        expect(pageTitleValue).toBe('ChallengeMe') 
     })
});

// const cookies = require('../../mocks/cookies')
// const homePageMock = require('../../mocks/home_page')
// const puppeteer = require('puppeteer');
// const nock = require('nock');
// const useNock = require('nock-puppeteer');


// jest.setTimeout(15000);
// describe("All the routes are working together", () => {
// let page;
// let browser;
// 	beforeEach(async () => {
// 		//open a chromium browser
// 		browser = await puppeteer.launch({slowMo: 45, headless: false});
// 		//open a new page within that browser
//         page = await browser.newPage();
//         await page.goto("http://localhost:3000")
//         await page.setCookie(...cookies);
// 		const screenSize = {
// 			width: 1280,
// 			height: 768,
// 		  };
//         await page.setViewport(screenSize);
// 	});
// 	// afterAll(async () => {
// 	// 	//close the chromium after each test
// 	// 	await browser.close();
// 	// });

// 	test("Insight component can be reached by click on the insight icon, and display the charts", async () => {
//         const getAllChallenges = await nock('http://localhost:3000/api', { allowUnmocked: true }, )
//         .get('/api/v1/challenges')
//         // .query(() => true)
//         .reply(200, homePageMock);
//         await page.goto("http://localhost:3000")
//         await page.waitForSelector('.header-link-title')
//         let pageTitle = await page.$('.header-link-title');
//         let pageTitleValue = await (await pageTitle.getProperty('innerText')).jsonValue();
//         expect(pageTitleValue).toBe('ChallengeMe')
//         const elements = await page.$$('.challenge-card');
//         expect(elements.length).toBe(homePageMock.length);
//         expect(getAllChallenges.isDone()).toBe(true) 
//      })
// });

