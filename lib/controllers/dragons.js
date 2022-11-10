const { Router } = require('express');
const Dragon = require('../models/Dragon.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const dragonSingle = await Dragon.getById(id);
      res.json(dragonSingle);
    } catch (e) {
      next(e);
    }  
  })

  .post('/', async (req, res, next) => {
    try {
      const addDragon = await Dragon.insert(req.body);
      res.json(addDragon);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res) => {
    const dragons = await Dragon.getAllDragons();
    res.json(dragons);
  });
