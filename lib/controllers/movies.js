const { Router } = require('express');
const Movie = require('../models/Movie.js');

module.exports = Router()

  .get('/', async (req, res) => {
    const movies = await Movie.getAllMovies();
    res.json(movies);
  });
