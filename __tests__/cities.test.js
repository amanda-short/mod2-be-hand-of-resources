const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cities routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/cities should return a list of cities', async () => {
    const res = await request(app).get('/cities');
    expect(res.body.length).toEqual(5);
    const nyc = res.body.find((city) => city.id === '1');
    expect(nyc).toHaveProperty('name', 'NYC');
    expect(nyc).toHaveProperty('state', 'New York');
    expect(nyc).toHaveProperty('population', '8.4 million');
  });

  afterAll(() => {
    pool.end();
  });
});
