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
  answer: {
    repo: 'zilbers/Challenge-Calculator',
    rating: '5',
    title: 'A very hard challenge',
    content: 'Took me a while',
  },
  badAnswer: {
    repo: 'Not A Valid Repo Name!',
    title: 'A very hard challenge',
    content: 'Took me a while',
  },
  errorMessage: {
    review: 'To send a review, the review must have both title and content!',
    repo: 'This is not a valid repo!',
    rating: 'To send an answer, you must rate the challenge!',
  },
  submission: {
    status: 'success',
    name: 'Tamer',
    submittedAt: '08/10/2020',
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
    await page.goto('http://localhost:3000/challenges/1', {
      waitUntil: 'networkidle0',
    });
  });

  it('The page includes all the mandatory data about the challenge', async (done) => {
    await page.waitForSelector('.challenge-name');
    const nameValue = await page.$eval(
      '.challenge-name',
      (name) => name.innerText
    );
    expect(nameValue).toBe(mockData.ReactTvShows.name);
    let imgSrc = await page.$eval('.challenge-img', (image) => image.src);
    expect(imgSrc).toBe(mockData.ReactTvShows.cover);

    let rating = await page.$eval(
      '.challenge-rating',
      (rating) => rating.innerText
    );
    // Need to check how its presented in the HTML
    expect(rating).toBe(mockData.ReactTvShows.rating);

    let description = await page.$eval(
      '#challenge-description',
      (description) => description.innerText
    );
    expect(description).toBe(mockData.ReactTvShows.description);

    let createdAt = await page.$eval(
      '.challenge-created-at',
      (createdAt) => createdAt.innerText
    );
    expect(createdAt).toBe(`Created at: ${mockData.ReactTvShows.createdAt} `);

    let updatedAt = await page.$eval(
      '.challenge-updated-at',
      (updatedAt) => updatedAt.innerText
    );
    expect(updatedAt).toBe(`Updated at: ${mockData.ReactTvShows.updatedAt}`);

    done();
  });

  it('There is a submmit button, that opens a modal', async () => {
    await page.waitForSelector('.submit-btn');
    await page.click('.submit-btn');
    await page.waitForSelector('#repoInput');
    await page.type('#repoInput', mockData.answer.repo);
    await page.select('#rating', mockData.answer.rating);
    await page.type('#commentTitleInput', mockData.answer.title);
    await page.type('#reviewContentInput', mockData.answer.content);
    await page.click('.submit-btn'); // Add id to last submit button
    const response = await page.waitForResponse((response) =>
      response.url().startsWith('http://localhost:3000/challenges/1')
    );
    expect(response.ok()).toBe(true);
  });

  it('Form validation, cannot send without required inputs', async () => {
    await page.waitForSelector('.submit-btn');
    await page.click('.submit-btn');
    await page.waitForSelector('#repoInput');

    await page.type('#repoInput', mockData.answer.repo);
    await page.click('#submit-answer'); // Add id to last submit button

    const errorMessageRating = await page.$eval(
      '.form-error',
      (error) => error.innerText
    );
    expect(errorMessageRating).toBe(mockData.errorMessage.rating);

    await page.select('#rating', mockData.answer.rating);
    await page.type('#repoInput', mockData.badAnswer.repo);
    await page.click('#submit-answer'); // Add id to last submit button

    const errorMessageRepo = await page.$eval(
      '.form-error',
      (error) => error.innerText
    );
    expect(errorMessageRepo).toBe(mockData.errorMessage.repo);

    await page.type('#repoInput', mockData.answer.repo);
    await page.type('#commentTitleInput', mockData.badAnswer.title);
    await page.click('#submit-answer'); // Add id to last submit button

    const errorMessageContent = await page.$eval(
      '.form-error',
      (error) => error.innerText
    );
    expect(errorMessageContent).toBe(mockData.errorMessage.review);

    await page.type('#reviewContentInput', mockData.badAnswer.content);
    await page.click('#submit-answer'); // Add id to last submit button
  });

  it('Submissions has date, name and status', async () => {
    await page.waitForSelector('.ChallengeTable'); //need to add id
    await page.waitForSelector('.submissionTab'); //need to add id / className
    await page.click('.submissionTab'); //need to add id / className

    let status = await page.$eval(
      '#status', //need to add id for submission status
      (status) => status.innerText
    );
    expect(status).toBe(mockData.submission.status);

    let name = await page.$eval(
      '#name', //need to add id for submission name
      (name) => name.innerText
    );
    expect(name).toBe(mockData.submission.name);

    let submittedAt = await page.$eval(
      '#submittedAt', //need to add id for submission submittedAt
      (submittedAt) => submittedAt.innerText
    );
    expect(submittedAt).toBe(mockData.submission.submittedAt);
    done();
  });


it('After sending a rating, the rating updates', async () => {
  await page.waitForSelector('.challenge-rating'); //need to add number of ratings

  let initialRaters = await page.$eval(
    '#raters', //need to add id for number of ratings
    (initialRaters) => initialRaters.innerText
  );
  await page.waitForSelector('.submit-btn');
  await page.click('.submit-btn');
  await page.waitForSelector('#repoInput');
  await page.type('#repoInput', mockData.answer.repo);
  await page.select('#rating', mockData.answer.rating);
  await page.click('.submit-btn'); // Add id to last submit button
  let updatedRaters = await page.$eval(
    '#raters', //need to add id for number of ratings
    (updatedRaters) => updatedRaters.innerText
  );

  expect(updatedRaters).toBe(initialRaters + 1);
  done();
});

it('Pressing tag should search all challenges with the same tag', async () => {
  await page.waitForSelector('.challenge-labels');
  await page.click('.challenge-label');
  let label;
  page.on('response', response => {
    if (response.url().endsWith("/labels")) //need to add the right URL
     label=true
     
  });
  expect(label).toBe(true);
  done();
});




});
