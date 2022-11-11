const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('movies routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /movies should return a list of movies', async () => {
    const resp = await request(app).get('/movies');
    expect(resp.body.length).toEqual(5);
    const titanic = resp.body.find((movie) => movie.id === '1');
    expect(titanic).toHaveProperty('title', 'Titanic');
    expect(titanic).toHaveProperty('release', 1997);
    expect(titanic).toHaveProperty('studio', 'Paramount Pictures');
  });

  it('GET /movies/:id should return a single movie', async () => {
    const resp = await request(app).get('/movies/1');
    expect(resp.body).toEqual({
      id: '1',
      title: 'Titanic',
      release: 1997,
      studio: 'Paramount Pictures',
    });  
  });

  it('POST /movies should create a new movie', async () => {
    const resp = await request(app).post('/movies').send({
      title: 'Titanic',
      release: 1997,
      studio: 'Paramount Pictures',
    });
    expect(resp.body.title).toBe('Titanic');
    expect(resp.body.release).toBe(1997);
    expect(resp.body.studio).toBe('Paramount Pictures');
  });  

  it('PUT /movies/:id should update movie', async () => {
    const resp = await request(app)
      .put('/movies/2')
      .send({ title: '9 to 5' });
    expect(resp.status).toEqual(200);
    expect(resp.body.title).toEqual('9 to 5');
  });

  afterAll(() => {
    pool.end();
  });
});
