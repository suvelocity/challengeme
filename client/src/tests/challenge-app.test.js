const puppeteer = require('puppeteer');

let browser;
let page;

const projectName = 'Challenge - Page Client';
describe(`${projectName} - test suite`, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

    it(`can display the ${digit} digit on the screen by clicking the ${digit} button`, async () => {
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
      await page.click(`#digit_${digit}`);
      const result = await page.$('.result');
      const resultsValue = await (
        await result.getProperty('innerText')
      ).jsonValue();
      expect(resultsValue).toBe(digit.toString());
    });
});
