const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('countries routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /countries should return a list of countries', async () => {
    const resp = await request(app).get('/countries');
    expect(resp.body.length).toEqual(5);
    const italy = resp.body.find((country) => country.id === '1');
    expect(italy).toHaveProperty('name', 'Italy');
    expect(italy).toHaveProperty('language', 'Italian');
    expect(italy).toHaveProperty('population', '59 million');
  });

  it('GET /countries/:id should return a single country', async () => {
    const resp = await request(app).get('/countries/1');
    expect(resp.body).toEqual({
      id: '1',
      name: 'Italy',
      language: 'Italian',
      population: '59 million',
    });  
  });

  afterAll(() => {
    pool.end();
  });
});
