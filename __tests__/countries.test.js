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

  it('POST /countries should create a new country', async () => {
    const resp = await request(app).post('/countries').send({
      id: '1',
      name: 'Italy',
      language: 'Italian',
      population: '59 million', 
    });
    expect(resp.body.name).toBe('Italy');
    expect(resp.body.language).toBe('Italian');
    expect(resp.body.population).toBe('59 million');
  }); 

  it('PUT /countries/:id should update country', async () => {
    const resp = await request(app)
      .put('/countries/2')
      .send({ name: 'Belgium' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Belgium');
  });

  afterAll(() => {
    pool.end();
  });
});
