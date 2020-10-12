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
    review: {
      content: 'To send a review, the review must have both title and content!',
    },
    repo: {
      content: 'Please enter a solution repository',
      path: '#required-repo',
    },
    invalidRrepo: {
      content: 'The text should look like "username/repository-name"',
      path: '#required-repo',
    },
    rating: {
      content: 'Please rate this challenge',
      path: '#required-rating',
    },
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
      path: '#simple-tabpanel-0 > div > p > div > div:nth-child(1)',
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
      path: '#simple-tabpanel-0 > div > p > div > div:nth-child(2)',
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
      path: '#simple-tabpanel-1 > div > p > div:nth-child(1)',
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
      path: '#simple-tabpanel-1 > div > p > div:nth-child(2)',
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

const url = 'http://localhost:3000';

const projectName = 'Challenge page';
describe(`${projectName} - Test suite`, () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.server();
    cy.route(`${url}/api/v1/challenges/1`, {
      challenge: MOCK.jwtNodeJs,
      author: MOCK.author,
    });
    cy.route(`${url}/api/v1/challenges/1/submissions`, MOCK.submissions);
    cy.route(`${url}/api/v1/reviews/byChallenge/1`, MOCK.reviews);
    cy.route(`${url}/api/v1/images?id=1`, MOCK.blobImg);
    cy.route('POST', `${url}/api/v1/challenges/1/apply`, 'Success');

    cy.visit('http://localhost:3000/challenges/1');
  });

  it('The page includes all the mandatory data about the challenge', () => {
    cy.contains(MOCK.jwtNodeJs.name);
    cy.contains(MOCK.jwtNodeJs.description);
    cy.contains(MOCK.jwtNodeJs.createdAt);
    cy.contains(MOCK.jwtNodeJs.updatedAt);
    MOCK.jwtNodeJs.Labels.forEach((label) => {
      cy.contains(label.name);
    });
  });

  it('There is a submmit button, that opens a modal', () => {
    cy.get(PATH.openModal).click();

    cy.contains(MOCK.submitModal.header);
    cy.contains(MOCK.submitModal.rating);
    cy.contains(MOCK.submitModal.review.header);
    cy.contains(MOCK.submitModal.review.title);
    cy.contains(MOCK.submitModal.review.message);
  });

  it('Form validation, cannot send without required inputs', () => {
    cy.get(PATH.openModal).click();
    cy.get(PATH.submitAnswer).click();

    cy.get(MOCK.error.repo.path).should('contain', MOCK.error.repo.content);
    cy.get(MOCK.error.rating.path).should('contain', MOCK.error.rating.content);

    cy.get(PATH.repoInput)
      .type(MOCK.answer.badSolutionRepo)
      .should('have.value', MOCK.answer.badSolutionRepo);

    cy.get(MOCK.error.invalidRrepo.path).should(
      'contain',
      MOCK.error.invalidRrepo.content
    );
  });

  it('Sends valid answer form', () => {
    cy.visit('http://localhost:3000/challenges/1');

    cy.get(PATH.openModal).click();

    cy.get(PATH.repoInput)
      .type(MOCK.answer.solutionRepo)
      .should('have.value', MOCK.answer.solutionRepo);
    cy.get(PATH.rate).click();
    cy.get(PATH.title)
      .type(MOCK.answer.title)
      .should('have.value', MOCK.answer.title);
    cy.get(PATH.message)
      .type(MOCK.answer.message)
      .should('have.value', MOCK.answer.message);

    cy.get(PATH.submitAnswer).click();
  });

  it('Submissions has date, name and status', async () => {
    cy.visit('http://localhost:3000/challenges/1');

    MOCK.submissions.forEach((submission) => {
      cy.get(submission.path).should('contain', submission.solutionRepository);
      cy.get(submission.path).should('contain', submission.state);
      cy.get(submission.path).should(
        'contain',
        submission.updatedAt.split('T').join(' ').split('.')[0]
      );
    });
  });

  it('Reviews has title, content, date and the name of the user who posted the review', async () => {
    MOCK.reviews.forEach((review) => {
      cy.get(review.path).should('contain', review.title);
      cy.get(review.path).should('contain', review.content);
      cy.get(review.path).should('contain', review.User.userName);
    });
  });
});
