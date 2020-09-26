/**
 * @jest-environment node
 */
const puppeteer = require('puppeteer');

const path = 'file://' + __dirname + '/app/index.html'
let page;
let browser;

const secondTaskText = 'second task input';
jest.setTimeout(10000);
const projectName = 'Todo App';
describe(projectName, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto(path, { waitUntil: 'networkidle0' })
  });
  afterAll(async () => {
    await browser.close();
  });
  test('The todo list should be empty first', async () => {
    const elements = await page.$$('.todoText');
    expect(elements.length).toBe(0);
  });
})
