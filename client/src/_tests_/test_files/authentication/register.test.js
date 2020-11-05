const puppeteer = require("puppeteer");
const nock = require("nock");
const useNock = require("nock-puppeteer");

let page, browser;

describe('Client Tests', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10
        })
        page = await browser.newPage();
        useNock(page, ["http://localhost:3000/"]);
    })
    afterAll(() => {
        browser.close();
    })
    test('input validation', async () => {
        await page.goto("http://localhost:3000/register");
        await page.waitForSelector("#firstName", { visible: true });
        const firstNameInput = await page.$('#firstName');
        const lastNameInput = await page.$('#lastName');
        const userNameInput = await page.$('#username');
        const emailInput = await page.$('#email');
        await firstNameInput.type("Test1")
        await lastNameInput.type("Test1")
        await userNameInput.type("Test")
        let button = await page.$("#nextStep");
        button.click();
        await timeout(1000);
        let linkTexts = await page.$$eval(".errors",
            elements => elements.map(item => item.textContent))
        expect(linkTexts[0]).toBe('First name must contain only letters.')
        expect(linkTexts[1]).toBe('Last name must contain only letters.')
        expect(linkTexts[2]).toBe('Username must contain only letters and numbers and be longer then 6 characters.')
        expect(linkTexts[3]).toBe('Email required.')
        await emailInput.type("Test")
        button.click();
        await timeout(1000);
        linkTexts = await page.$$eval(".errors",
            elements => elements.map(item => item.textContent))
        expect(linkTexts[3]).toBe('Email invalid.')
        await firstNameInput.click({ clickCount: 3 })
        await firstNameInput.type("Test")
        await lastNameInput.click({ clickCount: 3 })
        await lastNameInput.type("Test")
        await userNameInput.type("Test")
        await emailInput.type("@gmail.com")
        button.click();
        await timeout(1000);
        const countryInput = await page.$('#country');
        const cityInput = await page.$('#city');
        const dateInput = await page.$('#date');
        const phoneInput = await page.$('#phone');
        await countryInput.type('1');
        await cityInput.type('1');
        await phoneInput.type('032-2323');
        button = await page.$("#nextStep");
        button.click();
        await timeout(1000);
        linkTexts = await page.$$eval(".errors",
            elements => elements.map(item => item.textContent))
        expect(linkTexts[0]).toBe('Country must contain only English letters')
        expect(linkTexts[1]).toBe('City must contain only English letters')
        expect(linkTexts[2]).toBe('Birth date required')
        expect(linkTexts[3]).toBe('Only numbers allowed in phone number.')
        await dateInput.type('30122030');
        button.click();
        await timeout(1000);
        linkTexts = await page.$$eval(".errors",
            elements => elements.map(item => item.textContent))
        expect(linkTexts[2]).toBe('Birth date must be in the past.')
        button = await page.$("#nextStep");
        button.click();
        await timeout(1000);
        const signUpInput = await page.$('#signUp');
        const linkInput = await page.$('#link');
        const dateInput = await page.$('#date');
        const phoneInput = await page.$('#phone');
    }, 30000)
})

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}