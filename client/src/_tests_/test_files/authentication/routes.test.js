const puppeteer = require('puppeteer');


jest.setTimeout(15000);
describe("All the routes are working together", () => {
let page;
let browser;
	beforeEach(async () => {
		//open a chromium browser
		browser = await puppeteer.launch({slowMo: 45, headless: false});
		//open a new page within that browser
		page = await browser.newPage();
		const screenSize = {
			width: 1280,
			height: 768,
		  };
		await page.setViewport(screenSize);
		await page.goto("http://localhost:3000/statistics", { waitUntil: "networkidle0" });
	});
	afterAll(async () => {
		//close the chromium after each test
		await browser.close();
	});

	test("Insight component can be reached by click on the insight icon, and display the charts", async () => {
		// click on the insight icon in the navbar and render to the insight page
		await page.waitForSelector("#Insights");
		await page.click("#Insights");
		await page.waitForSelector("#SubmissionPerDayChart");
		let result = await page.$('#SubmissionPerDayChart');
		let SubmissionPerDayChart = await (await result.getProperty('innerText')).jsonValue();
		console.log('asdasdsada', SubmissionPerDayChart);
		expect(SubmissionPerDayChart).toBe('submissions per day')	
  })
});

