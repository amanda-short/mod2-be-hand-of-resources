const { Router } = require('express');
const Song = require('../models/Song.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const songSingle = await Song.getById(id);
      res.json(songSingle);
    } catch (e) {
      next(e);
    }  
  })

  .post('/', async (req, res, next) => {
    try {
      const addSong = await Song.insert(req.body);
      res.json(addSong);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const update = await Song.updateById(req.params.id, req.body);
      res.json(update);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const remove = await Song.delete(req.params.id);
      res.json(remove);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res) => {
    const songs = await Song.getAllSongs();
    res.json(songs); 
  });


