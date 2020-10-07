const puppeteer = require("puppeteer");
const nock = require("nock");
const useNock = require("nock-puppeteer");


describe('Client Tests', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100
        })
        page = await browser.newPage();
        useNock(page, ["http://localhost:3000/"]);
    })
    afterAll(() => {
        browser.close();
    })

    test('login request sent to server', async () => {
        await page.goto("http://localhost:3000/login");
        const login = await nock("http://localhost:3000", {
            allowUnmocked: true,
        })
            .post("/loginEndPoint")
            .reply(200);

        await page.waitForSelector("#username-field", { visible: true });
        await page.type("#username-field", "Test");
        await page.type("#password-field", "Test");
        const button = await page.$("#login-button");
        button.click();
        await timeout(2000);
        expect(login.isDone()).toBe(true);
    }, 30000)

    test('move to sign up page', async () => {
        await page.goto("http://localhost:3000/login");
        await page.waitForSelector("#signUp", { visible: true });
        const button = await page.$("#signUp");
        button.click();
        await timeout(2000);
        expect(page._target._targetInfo.url).toBe('http://localhost:3000/register');
    }, 30000)
})

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}