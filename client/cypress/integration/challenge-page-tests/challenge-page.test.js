const MOCK = {
  submitModal: {
    header: 'Submit Your Solution',
    rating: 'Rate this challenge',
    review: {
      header: 'Please leave your review here',
      title: 'Title',
      message: 'Message',
    },
  },
  error: {
    review: 'To send a review, the review must have both title and content!',
    repo: 'Please enter a solution repository',
    invalidRrepo: 'The text should look like "username/repository-name"',
    rating: 'Please rate this challenge',
  },
  jwtNodeJs: {
    id: 1,
    name: 'JWT - Node.js',
    description:
      'A great chance to Practice your JWT skills with that amaizng challenge',
    type: 'static',
    repositoryName: 'suvelocity/Authentication-Challenge',
    boilerPate: 'Authentication-Challenge-TEMPLATE',
    createdAt: '2020-10-01 20:00:00',
    updatedAt: '2020-10-01 20:00:00',
    cover: 'https://storage.googleapis.com/challenges-cover/jwt.png',
    userId: 1,
    Labels: [
      {
        labelsToChallenges: {
          createdAt: '2020-10-01T20:00:00.000Z',
          updatedAt: '2020-10-01T20:00:00.000Z',
          challengeId: 1,
          labelId: 3,
        },
        name: 'Cyber-Security',
      },
    ],
  },
  submissions: [
    {
      challengeId: 1,
      createdAt: '2020-10-01T20:00:00.000Z',
      deletedAt: null,
      id: 1,
      solutionRepository: 'Zilbers/solution',
      state: 'SUCCESS',
      updatedAt: '2020-10-01T20:00:00.000Z',
      userId: 1,
    },
    {
      challengeId: 1,
      createdAt: '2020-10-01T20:00:00.000Z',
      deletedAt: null,
      id: 2,
      solutionRepository: 'Tzach/solution',
      state: 'Fail',
      updatedAt: '2020-10-01T20:00:00.000Z',
      userId: 2,
    },
  ],
  reviews: [
    {
      ChallengeId: 1,
      User: { userName: 'OriSass' },
      challengeId: 1,
      content: 'had a really great time with that challenge',
      createdAt: '2020-10-01T20:00:00.000Z',
      deletedAt: null,
      id: 1,
      rating: 3,
      title: 'great challenge',
      updatedAt: '2020-10-01T20:00:00.000Z',
      userId: 1,
    },
    {
      ChallengeId: 1,
      User: { userName: 'DrorMaman' },
      challengeId: 1,
      content: 'had a really hard time',
      createdAt: '2020-10-01T20:00:00.000Z',
      deletedAt: null,
      id: 1,
      rating: 5,
      title: 'well made challenge',
      updatedAt: '2020-10-01T20:00:00.000Z',
      userId: 2,
    },
  ],
  author: {
    birthDate: '2020-10-01T20:00:00.000Z',
    city: 'Tel-Aviv',
    country: 'Israel',
    createdAt: '2020-10-01T20:00:00.000Z',
    deletedAt: null,
    email: 'omritheman@gmail.com',
    firstName: 'omri',
    githubAccount: 'Zilbers',
    id: 1,
    lastName: 'zilber',
    password: '122345',
    phoneNumber: 541234567,
    reasonOfRegistration: 'creating',
    securityAnswer: 'cool',
    securityQuestion: 'sup man????',
    updatedAt: '2020-10-01T20:00:00.000Z',
    userName: 'OmriZilber',
  },
  answer: {
    solutionRepo: 'Zilbers/solution',
    badSolutionRepo: 'Not a valid name',
    title: 'Good time',
    message: 'Had fun solving this challenge',
  },
  blobImg: 'data:BLOB',
};

const PATH = {
  openModal:
    '#root > div > div.challenge-wrapper > div.challenge-right-wrapper > div.challenge-submit-btn > button',
  submitAnswer:
    'body > div:nth-child(7) > div.makeStyles-paper-7 > form > button > span.MuiButton-label',
  repoInput: '#repoInput',
  title: '#commentTitleInput',
  message: '#reviewContentInput',
  rate:
    'body > div:nth-child(7) > div.makeStyles-paper-7 > form > div:nth-child(3) > span > label:nth-child(9)',
};

const beforeAll = () => {
  cy.server();
  cy.route(`${url}/api/v1/challenges/1`, {
    challenge: MOCK.jwtNodeJs,
    author: MOCK.author,
  });
  cy.route(`${url}/api/v1/challenges/1/submissions`, MOCK.submissions);
  cy.route(`${url}/api/v1/reviews/byChallenge/1`, MOCK.reviews);
  cy.route(`${url}/api/v1/images?id=1`, MOCK.blobImg);
  cy.route('POST', `${url}/api/v1/challenges/1/apply`, 'Success');
};

const url = 'http://localhost:3000';

const projectName = 'Challenge - Page Client';
describe(`${projectName} - test suite`, () => {
  it('The page includes all the mandatory data about the challenge', () => {
    beforeAll();

    cy.visit('http://localhost:3000/challenges/1');

    cy.contains(MOCK.jwtNodeJs.name);
    cy.contains(MOCK.jwtNodeJs.description);
    cy.contains(MOCK.jwtNodeJs.createdAt);
    cy.contains(MOCK.jwtNodeJs.updatedAt);
    MOCK.jwtNodeJs.Labels.forEach((label) => {
      cy.contains(label.name);
    });
  });

  it('There is a submmit button, that opens a modal', () => {
    beforeAll();

    cy.visit('http://localhost:3000/challenges/1');

    cy.get(PATH.openModal).click();

    cy.contains(MOCK.submitModal.header);
    cy.contains(MOCK.submitModal.rating);
    cy.contains(MOCK.submitModal.review.header);
    cy.contains(MOCK.submitModal.review.title);
    cy.contains(MOCK.submitModal.review.message);
  });

  it('Form validation, cannot send without required inputs', () => {
    beforeAll();

    cy.visit('http://localhost:3000/challenges/1');

    cy.get(PATH.openModal).click();
    cy.get(PATH.submitAnswer).click();

    cy.contains(MOCK.error.repo);
    cy.contains(MOCK.error.rating);

    cy.get(PATH.repoInput)
      .type(MOCK.answer.badSolutionRepo)
      .should('have.value', MOCK.answer.badSolutionRepo);
    cy.contains(MOCK.error.invalidRrepo);
  });

  it('Sends valid answer form', () => {
    beforeAll();

    cy.visit('http://localhost:3000/challenges/1');

    cy.get(PATH.openModal).click();

    cy.get(PATH.repoInput)
      .type(MOCK.answer.solutionRepo)
      .should('have.value', MOCK.answer.solutionRepo);
    cy.get(PATH.title)
      .type(MOCK.answer.title)
      .should('have.value', MOCK.answer.title);
    cy.get(PATH.message)
      .type(MOCK.answer.message)
      .should('have.value', MOCK.answer.message);
    cy.get(PATH.rate).click();

    cy.get(PATH.submitAnswer).click();
  });

  it('Submissions has date, name and status', async () => {
    beforeAll();

    cy.visit('http://localhost:3000/challenges/1');

    MOCK.reviews.forEach((review) => {
      cy.contains(review.title);
      cy.contains(review.content);
      cy.contains(review.User.userName);
    });
  });

  it('Reviews has title, content, date and user who posted the review', async () => {
    beforeAll();
    cy.visit('http://localhost:3000/challenges/1');

    MOCK.reviews.forEach((review) => {
      cy.contains(review.title);
      cy.contains(review.content);
      cy.contains(review.User.userName);
    });
  });
});
