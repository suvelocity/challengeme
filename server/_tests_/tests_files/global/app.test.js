const request = require('supertest');
const app = require('../../../app');
const { User } = require('../../../models');

describe('Testing app routes', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true, force: true });
  });

  // // On CI only
  // test('Can user get client from app', async (done) => {
  //     const unknown = await request(app)
  //         .get('/')

  //     expect(unknown.status).toBe(404);
  //     done();
  // });

  // test('Can user get client from app', async (done) => {
  //     const appHtml = await request(app)
  //         .get('/')

  //     expect(appHtml.status).toBe(200);
  //     expect(appHtml.text).toMatch(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/);
  //     done();
  // });

  test('get 404 for unknown', async (done) => {
    const unknown = await request(app)
      .get('/api/v1/blabla');

    expect(unknown.status).toBe(404);
    done();
  });
});
