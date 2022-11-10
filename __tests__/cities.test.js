const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cities routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /cities should return a list of cities', async () => {
    const resp = await request(app).get('/cities');
    expect(resp.body.length).toEqual(5);
    const nyc = resp.body.find((city) => city.id === '1');
    expect(nyc).toHaveProperty('name', 'NYC');
    expect(nyc).toHaveProperty('state', 'New York');
    expect(nyc).toHaveProperty('population', '8.4 million');
  });

  it('GET /cities/:id should return a single city', async () => {
    const resp = await request(app).get('/cities/1');
    expect(resp.body).toEqual({
      id: '1',
      name: 'NYC',
      state: 'New York',
      population: '8.4 million',
    });  
  });

  it('POST /cities should create a new city', async () => {
    const resp = await request(app).post('/cities').send({
      name: 'NYC',
      state: 'New York',
      population: '8.4 million', 
    });
    expect(resp.body.name).toBe('NYC');
    expect(resp.body.state).toBe('New York');
    expect(resp.body.population).toBe('8.4 million');
  });  

  it('PUT /cities/:id should update city', async () => {
    const resp = await request(app)
      .put('/cities/2')
      .send({ name: 'St Louis' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('St Louis');
  });

  afterAll(() => {
    pool.end();
  });
});
