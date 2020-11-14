const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../../../app');
const {
  Challenge, Label, LabelChallenge, Submission, User,
} = require('../../../models');
const labelsMocks = require('../../mocks/labels');
const challengesMock = require('../../mocks/challenges');
const mockUser = require('../../mocks/users');

function generateToken(currentUser) {
  const infoForCookie = {
    userId: currentUser.id,
    userName: currentUser.userName,
  };
  return jwt.sign(infoForCookie, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '900s',
  });
}

describe('testing labels endpoints', () => {
  beforeEach(async () => {
    await Challenge.destroy({ truncate: true, force: true });
    await Label.destroy({ truncate: true, force: true });
    await LabelChallenge.destroy({ truncate: true, force: true });
    await Submission.destroy({ truncate: true, force: true });
    await User.destroy({ truncate: true, force: true });
  });

  test('Can get all labels', async (done) => {
    await Label.bulkCreate(labelsMocks);
    const response = await request(app)
      .get('/api/v1/labels')
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);
    expect(response.body.length).toBe(14);
    expect(response.status).toBe(200);
    done();
  });

  test('Can add labels to challenge', async (done) => {
    await Label.bulkCreate(labelsMocks);

    mockUser[2].password = await bcrypt.hashSync(mockUser[2].password, 10);
    await User.create(mockUser[2]);

    const postNewChallenge = await request(app)
      .post('/api/v1/challenges')
      .send(challengesMock[0])
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(postNewChallenge.status).toBe(201);

    const changeStateChallenge = await request(app)
      .patch(`/api/v1/challenges/state-update/${challengesMock[0].id}`)
      .send({ state: 'approved' })
      .set('authorization', `bearer ${generateToken(mockUser[2])}`);

    expect(changeStateChallenge.status).toBe(200);

    const challengesBeforeAddLabels = await request(app)
      .get(`/api/v1/challenges?${challengesMock[0].id}`)
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(challengesBeforeAddLabels.status).toBe(200);
    expect(challengesBeforeAddLabels.body[0].Labels.length).toBe(0);

    const addLabels = await request(app)
      .post(`/api/v1/labels/${challengesMock[0].id}`)
      .send({ labels: [{ value: labelsMocks[0].id }, { value: labelsMocks[1].id }] })
      .set('authorization', `bearer ${generateToken(mockUser[2])}`);

    expect(addLabels.status).toBe(200);

    const challengesWithLables = await request(app)
      .get(`/api/v1/challenges?${challengesMock[0].id}`)
      .set('authorization', `bearer ${generateToken(mockUser[0])}`);

    expect(challengesWithLables.status).toBe(200);
    expect(challengesWithLables.body[0].Labels.length).toBe(2);
    done();
  });
});
