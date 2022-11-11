const { Router } = require('express');
const Movie = require('../models/Movie.js');

module.exports = Router()
.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const movieSingle = await Movie.getById(id);
      res.json(movieSingle);
    } catch (e) {
      next(e);
    }  
  })

  .post('/', async (req, res, next) => {
    try {
      const addMovie = await Movie.insert(req.body);
      res.json(addMovie);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res) => {
    const movies = await Movie.getAllMovies();
    res.json(movies);
  });
