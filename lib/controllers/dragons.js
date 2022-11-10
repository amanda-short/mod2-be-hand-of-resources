const { Router } = require('express');
const Dragon = require('../models/Dragon.js');

module.exports = Router()

  .get('/', async (req, res) => {
    const dragons = await Dragon.getAllDragons();
    res.json(dragons);
  });
