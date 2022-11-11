const { Router } = require('express');
const Song = require('../models/Song.js');

module.exports = Router()
  .get('/', async (req, res) => {
    const songs = await Song.getAllSongs();
    res.json(songs); 
  });


