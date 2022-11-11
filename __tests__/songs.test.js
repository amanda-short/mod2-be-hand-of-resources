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

  it('GET /songs/:id should return a single song', async () => {
    const resp = await request(app).get('/songs/1');
    expect(resp.body).toEqual({
      id: '1',
      name: 'Creep',
      artist: 'Radiohead',
      release: 1992,
    });  
  });

  it('POST /songs should create a new song', async () => {
    const resp = await request(app).post('/songs').send({
      name: 'Creep',
      artist: 'Radiohead',
      release: 1992, 
    });
    expect(resp.body.name).toBe('Creep');
    expect(resp.body.artist).toBe('Radiohead');
    expect(resp.body.release).toBe(1992);
  }); 

  it('PUT /songs/:id should update song', async () => {
    const resp = await request(app)
      .put('/songs/2')
      .send({ name: 'Imagine' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Imagine');
  });

  afterAll(() => {
    pool.end();
  });
});
