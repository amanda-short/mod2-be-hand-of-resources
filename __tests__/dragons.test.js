const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dragons routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /dragons should return a list of dragons', async () => {
    const resp = await request(app).get('/dragons');
    expect(resp.body.length).toEqual(5);
    const hungarianHorntail = resp.body.find((dragon) => dragon.id === '1');
    expect(hungarianHorntail).toHaveProperty('name', 'Hungarian Horntail');
    expect(hungarianHorntail).toHaveProperty('origin', 'Hungary');
    expect(hungarianHorntail).toHaveProperty('color', 'Black');
  });

  it('GET /dragons/:id should return a single dragon', async () => {
    const resp = await request(app).get('/dragons/1');
    expect(resp.body).toEqual({
      id: '1',
      name: 'Hungarian Horntail',
      origin: 'Hungary',
      color: 'Black',
    });  
  });

  afterAll(() => {
    pool.end();
  });
});
