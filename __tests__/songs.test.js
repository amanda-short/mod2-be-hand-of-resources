const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('songs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /songs should return a list of songs', async () => {
    const resp = await request(app).get('/songs');
    expect(resp.body.length).toEqual(5);
    const creep = resp.body.find((song) => song.id === '1');
    expect(creep).toHaveProperty('name', 'Creep');
    expect(creep).toHaveProperty('artist', 'Radiohead');
    expect(creep).toHaveProperty('release', 1992);
  });

  afterAll(() => {
    pool.end();
  });
});
