const { Router } = require('express');
const City = require('../models/City.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const citySingle = await City.getById(id);
      res.json(citySingle);
    } catch (e) {
      next(e);
    }  
  })

  .get('/', async (req, res) => {
    const cities = await City.getAllCities();
    res.json(cities);
  });
