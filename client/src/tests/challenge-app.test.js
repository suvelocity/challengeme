const puppeteer = require('puppeteer');
const nock = require('nock');
const useNock = require('nock-puppeteer');

let browser;
let page;

const mockData = {
  ReactTvShows: {
    cover: 'https://storage.googleapis.com/challenges-cover/tvv_f.png',
    createdAt: '2020-10-04T12:00:00.000Z',
    deletedAt: null,
    description: 'in this challenge we will build some shit',
    githubLink: 'https://github.com/suvelocity/TV-shows-boilerplate',
    id: 1,
    name: 'React - Tv shows',
    repositoryName: 'suvelocity/TV-shows-challenge',
    type: 'client',
    updatedAt: '2020-10-04T12:00:00.000Z',
    createdBy: 'user231',
    label: ['React', 'JS', 'Promise'],
    rating: 3.7,
    isSaved: true,
  },
  ReactCalculator: {
    cover: 'https://storage.googleapis.com/challenges-cover/tvv_f.png',
    createdAt: '2020-10-04T12:00:00.000Z',
    deletedAt: null,
    description: 'in this challenge we will build some shit',
    githubLink: 'https://github.com/suvelocity/TV-shows-boilerplate',
    id: 2,
    name: 'React - Tv shows',
    repositoryName: 'suvelocity/TV-shows-challenge',
    type: 'client',
    updatedAt: '2020-10-04T12:00:00.000Z',
    createdBy: 'user231',
    label: ['React', 'JS', 'Promise'],
    rating: 3.7,
    isSaved: true,
  },
};

const projectName = 'Challenge - Page Client';
jest.setTimeout(30000);
describe(`${projectName} - test suite`, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    useNock(page, ['http://localhost:3000/api']);
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await nock('http://localhost:3000/', { allowUnmocked: true })
      .get('/api/v1/challenges/1')
      .query(() => true)
      .reply(200, mockData.ReactTvShows);

    await nock('http://localhost:3000/', { allowUnmocked: true })
      .get('/api/v1/challenges/2')
      .query(() => true)
      .reply(200, mockData.ReactCalculator);
  });

  it(`The page includes all the mandatory data about the challenge`, async (done) => {
    await page.goto('http://localhost:3000/challenges/1', {
      waitUntil: 'networkidle0',
    });
    await page.waitForSelector('.challenge-name')
    const nameValue = await page.$eval('.challenge-name', (name) => name.innerText);
    expect(nameValue).toBe(mockData.ReactTvShows.name);
    let imgSrc = await page.$eval('.challenge-img', (image) => image.src);
    expect(imgSrc).toBe(mockData.ReactTvShows.cover);
    let rating = await page.$eval('.challenge-rating', (rating) => rating.innerText); // Need to check how its presented in the HTML
    expect(rating).toBe(mockData.ReactTvShows.rating);
    let rating = await page.$eval('.challenge-rating', (rating) => rating.innerText); // Need to check how its presented in the HTML
    expect(rating).toBe(mockData.ReactTvShows.rating);
    let description = await page.$eval('.challenge-description', (description) => description.innerText); // Need to check how its presented in the HTML
    expect(description).toBe(mockData.ReactTvShows.description);
    let description = await page.$eval('.challenge-created-at', (createdAt) => createdAt.innerText); // Need to check how its presented in the HTML
    expect(description).toBe(`Created at: ${mockData.ReactTvShows.createdAt}`);
    done();
  });
});
