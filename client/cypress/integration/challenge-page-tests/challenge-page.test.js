const MOCK = {
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
      solutionRepository: 'sadasdasdsad',
      state: 'Fail',
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
  blobImg: 'data:BLOB',
};

const url = 'http://localhost:3000';

const projectName = 'Challenge - Page Client';
describe(`${projectName} - test suite`, () => {
  it('The page includes all the mandatory data about the challenge', () => {
    cy.server();
    cy.route(`${url}/api/v1/challenges/1`, {
      challenge: MOCK.jwtNodeJs,
      author: MOCK.author,
    });
    cy.route(`${url}/api/v1/challenges/1/submissions`, 
      MOCK.submissions,
    );
    cy.route(`${url}/api/v1/images?id=1`, MOCK.blobImg);

    cy.visit('http://localhost:3000/challenges/1');

    cy.contains('JWT - Node.js');
  });
});
