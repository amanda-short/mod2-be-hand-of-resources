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

  it('POST /dragons should create a new dragon', async () => {
    const resp = await request(app).post('/dragons').send({
      name: 'Hungarian Horntail',
      origin: 'Hungary',
      color: 'Black', 
    });
    expect(resp.body.name).toBe('Hungarian Horntail');
    expect(resp.body.origin).toBe('Hungary');
    expect(resp.body.color).toBe('Black');
  }); 

  it('PUT /dragons/:id should update dragon', async () => {
    const resp = await request(app)
      .put('/dragons/2')
      .send({ name: 'Swedish Short Snout' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Swedish Short Snout');
  });

  it('DELETE /dragons/:id should delete a dragon', async () => {
    const resp = await request(app).delete('/dragons/2');
    expect(resp.status).toEqual(200);
    const { body } = await request(app).get('/dragons/2');
    expect(body).toEqual(null);
  });

  afterAll(() => {
    pool.end();
  });
});
